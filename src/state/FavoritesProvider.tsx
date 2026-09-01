import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

const STORAGE_KEY = 'mc.favorites';

interface FavoritesContextValue {
  ids: string[];
  isFavorite: (productId: string) => boolean;
  toggle: (productId: string) => void;
  remove: (productId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

function load(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(load);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      /* storage unavailable */
    }
  }, [ids]);

  const isFavorite = useCallback((productId: string) => ids.includes(productId), [ids]);

  const toggle = useCallback((productId: string) => {
    setIds((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  }, []);

  const remove = useCallback((productId: string) => {
    setIds((prev) => prev.filter((id) => id !== productId));
  }, []);

  const value = useMemo<FavoritesContextValue>(
    () => ({ ids, isFavorite, toggle, remove }),
    [ids, isFavorite, toggle, remove],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- provider + hook co-location is the established pattern for state providers in this codebase
export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
