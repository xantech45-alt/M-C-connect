import { Outlet, useLocation } from 'react-router-dom';
import { OfflineBanner } from '@/components/composite/OfflineBanner';

/**
 * RootLayout wraps every route. It hosts:
 * - Skip link for keyboard users.
 * - Persistent offline banner.
 * - Outlet for child routes (which pick their own layout).
 */
export function RootLayout() {
  const { pathname } = useLocation();

  return (
    <>
      <a className="skip-link" href="#main">
        Aller au contenu
      </a>
      <OfflineBanner />
      <main id="main" key={pathname}>
        <Outlet />
      </main>
    </>
  );
}
