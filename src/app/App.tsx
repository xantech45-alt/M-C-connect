import { useEffect } from 'react';
import { LocaleProvider } from '@/state/LocaleProvider';
import { AuthProvider } from '@/state/AuthProvider';
import { OfflineProvider } from '@/state/OfflineProvider';
import { CartProvider } from '@/state/CartProvider';
import { FavoritesProvider } from '@/state/FavoritesProvider';
import { AddressesProvider } from '@/state/AddressesProvider';
import { ToastProvider } from '@/components/ui/Toast';
import { AppRouter } from './AppRouter';

export function App() {
  useEffect(() => {
    if (import.meta.env.DEV) {
      void import('@axe-core/react').then(async ({ default: axe }) => {
        const ReactDOM = await import('react-dom');
        // axe-core signature varies across versions; cast to satisfy TS without runtime impact.
        (axe as unknown as (dom: typeof ReactDOM, timeout: number) => void)(
          ReactDOM,
          1000,
        );
      });
    }
  }, []);

  return (
    <LocaleProvider>
      <OfflineProvider>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <AddressesProvider>
                <ToastProvider>
                  <AppRouter />
                </ToastProvider>
              </AddressesProvider>
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </OfflineProvider>
    </LocaleProvider>
  );
}
