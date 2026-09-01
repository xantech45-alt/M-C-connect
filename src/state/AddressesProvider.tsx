import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export interface Address {
  id: string;
  label: string;
  recipientName: string;
  phone: string;
  region: string;
  quartier: string;
  repere?: string;
  isDefault: boolean;
}

const STORAGE_KEY = 'mc.addresses';

const SEED_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    label: 'Domicile',
    recipientName: 'Aïcha Traoré',
    phone: '+223 70 12 34 56',
    region: 'District de Bamako',
    quartier: 'Hamdallaye ACI 2000',
    repere: 'Près de la pharmacie Kabala',
    isDefault: true,
  },
  {
    id: 'addr-2',
    label: 'Bureau',
    recipientName: 'Aïcha Traoré',
    phone: '+223 76 98 76 54',
    region: 'District de Bamako',
    quartier: 'Badalabougou Est',
    repere: "Immeuble face à l'école",
    isDefault: false,
  },
];

interface AddressesContextValue {
  addresses: Address[];
  getById: (id: string) => Address | undefined;
  addAddress: (input: Omit<Address, 'id' | 'isDefault'>) => Address;
  updateAddress: (id: string, input: Omit<Address, 'id' | 'isDefault'>) => void;
  removeAddress: (id: string) => void;
  setDefault: (id: string) => void;
}

const AddressesContext = createContext<AddressesContextValue | undefined>(undefined);

function load(): Address[] {
  if (typeof window === 'undefined') return SEED_ADDRESSES;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Address[]) : SEED_ADDRESSES;
  } catch {
    return SEED_ADDRESSES;
  }
}

export function AddressesProvider({ children }: { children: ReactNode }) {
  const [addresses, setAddresses] = useState<Address[]>(load);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
    } catch {
      /* storage unavailable */
    }
  }, [addresses]);

  const getById = useCallback((id: string) => addresses.find((a) => a.id === id), [addresses]);

  const addAddress = useCallback((input: Omit<Address, 'id' | 'isDefault'>) => {
    const created: Address = { ...input, id: `addr-${Date.now()}`, isDefault: false };
    setAddresses((prev) => (prev.length === 0 ? [{ ...created, isDefault: true }] : [...prev, created]));
    return created;
  }, []);

  const updateAddress = useCallback((id: string, input: Omit<Address, 'id' | 'isDefault'>) => {
    setAddresses((prev) => prev.map((a) => (a.id === id ? { ...a, ...input } : a)));
  }, []);

  const removeAddress = useCallback((id: string) => {
    setAddresses((prev) => {
      const next = prev.filter((a) => a.id !== id);
      if (next.length > 0 && !next.some((a) => a.isDefault)) {
        next[0] = { ...next[0], isDefault: true };
      }
      return next;
    });
  }, []);

  const setDefault = useCallback((id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  }, []);

  const value = useMemo<AddressesContextValue>(
    () => ({ addresses, getById, addAddress, updateAddress, removeAddress, setDefault }),
    [addresses, getById, addAddress, updateAddress, removeAddress, setDefault],
  );

  return <AddressesContext.Provider value={value}>{children}</AddressesContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- provider + hook co-location is the established pattern for state providers in this codebase
export function useAddresses(): AddressesContextValue {
  const ctx = useContext(AddressesContext);
  if (!ctx) throw new Error('useAddresses must be used within AddressesProvider');
  return ctx;
}
