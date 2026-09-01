import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { frML, en, bm } from '@/i18n/strings';

export type Locale = 'fr-ML' | 'en' | 'bm';

const FALLBACK: Locale = 'fr-ML';

const dictionaries: Record<Locale, Record<string, string>> = {
  'fr-ML': frML,
  en,
  bm,
};

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return FALLBACK;
  const stored = window.localStorage.getItem('mc.locale') as Locale | null;
  if (stored && dictionaries[stored]) return stored;
  return FALLBACK;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem('mc.locale', next);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const t = useCallback(
    (key: string) => {
      return dictionaries[locale][key] ?? dictionaries[FALLBACK][key] ?? dictionaries.en[key] ?? key;
    },
    [locale],
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- provider + hook co-location is the established pattern for state providers in this codebase
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}

// eslint-disable-next-line react-refresh/only-export-components -- provider + hook co-location is the established pattern for state providers in this codebase
export function useT() {
  return useLocale().t;
}
