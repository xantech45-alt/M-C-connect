import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import styles from './Toast.module.css';

export type ToastTone = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  tone: ToastTone;
  message: string;
  durationMs?: number;
}

interface ToastContextValue {
  toast: (tone: ToastTone, message: string, durationMs?: number) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const counterRef = useRef(0);

  const toast = useCallback((tone: ToastTone, message: string, durationMs = 3000) => {
    const id = `t-${++counterRef.current}`;
    setItems((prev) => [...prev, { id, tone, message, durationMs }]);
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo<ToastContextValue>(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div role="region" aria-live="polite" aria-label="Notifications" className={styles.region}>
        {items.map((t) => (
          <ToastView key={t.id} item={t} onDone={() => remove(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastView({ item, onDone }: { item: ToastItem; onDone: () => void }) {
  useEffect(() => {
    const id = window.setTimeout(onDone, item.durationMs ?? 3000);
    return () => window.clearTimeout(id);
  }, [item.durationMs, onDone]);

  return (
    <div role="status" className={`${styles.toast} ${styles[item.tone]}`}>
      {item.message}
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- provider + hook co-location is the established pattern for state providers in this codebase
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx.toast;
}
