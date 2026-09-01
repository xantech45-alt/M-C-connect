import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export interface CartLine {
  productId: string;
  variantId?: string;
  quantity: number;
  unitPriceXof: number;
  moq: number;
}

interface CartContextValue {
  lines: CartLine[];
  add: (line: CartLine) => void;
  update: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  subtotalXof: number;
}

const STORAGE_KEY = 'mc.cart';
const CartContext = createContext<CartContextValue | undefined>(undefined);

function load(): CartLine[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(load);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable */
    }
  }, [lines]);

  const add = useCallback((line: CartLine) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === line.productId && l.variantId === line.variantId);
      if (existing) {
        return prev.map((l) =>
          l === existing ? { ...l, quantity: Math.max(l.quantity + line.quantity, l.moq) } : l,
        );
      }
      return [...prev, line];
    });
  }, []);

  const update = useCallback((productId: string, quantity: number) => {
    setLines((prev) =>
      prev.map((l) =>
        l.productId === productId
          ? { ...l, quantity: Math.max(quantity, l.moq) }
          : l,
      ),
    );
  }, []);

  const remove = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const subtotalXof = useMemo(
    () => lines.reduce((sum, l) => sum + l.unitPriceXof * l.quantity, 0),
    [lines],
  );

  const value = useMemo<CartContextValue>(
    () => ({ lines, add, update, remove, clear, subtotalXof }),
    [lines, add, update, remove, clear, subtotalXof],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- provider + hook co-location is the established pattern for state providers in this codebase
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
