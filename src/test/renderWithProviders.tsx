import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LocaleProvider } from '@/state/LocaleProvider';
import { OfflineProvider } from '@/state/OfflineProvider';
import { AuthProvider } from '@/state/AuthProvider';
import { CartProvider } from '@/state/CartProvider';
import { FavoritesProvider } from '@/state/FavoritesProvider';
import { AddressesProvider } from '@/state/AddressesProvider';
import { CheckoutProvider } from '@/state/CheckoutProvider';
import { ToastProvider } from '@/components/ui/Toast';

interface Options {
  route?: string;
  state?: unknown;
}

/** Wraps a page with the same provider stack as `App.tsx`, inside a MemoryRouter. */
export function renderWithProviders(ui: ReactElement, { route = '/', state }: Options = {}) {
  return render(
    <MemoryRouter
      initialEntries={[{ pathname: route, state }]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <LocaleProvider>
        <OfflineProvider>
          <AuthProvider>
            <CartProvider>
              <FavoritesProvider>
                <AddressesProvider>
                  <CheckoutProvider>
                    <ToastProvider>{ui}</ToastProvider>
                  </CheckoutProvider>
                </AddressesProvider>
              </FavoritesProvider>
            </CartProvider>
          </AuthProvider>
        </OfflineProvider>
      </LocaleProvider>
    </MemoryRouter>,
  );
}
