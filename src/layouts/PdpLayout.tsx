import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from '@/components/composite/BottomNav';
import { CommerceHeader } from '@/components/composite/CommerceHeader';
import { LeftRailNav } from '@/components/composite/LeftRailNav';
import { SiteFooter } from '@/components/composite/SiteFooter';
import { DESKTOP_QUERY, RAIL_QUERY, useMediaQuery } from '@/hooks/useMediaQuery';
import styles from './PdpLayout.module.css';

/**
 * Layout for the product detail page. Below 1024px there is no top commerce
 * header (the PDP renders its own slim back/title row) and a tab nav
 * persists - BottomNav below 900px, LeftRailNav 900-1023px. On desktop the
 * PDP gets the same shell as every other page (header + section nav +
 * footer) so the catalog never feels like a separate app.
 */
export function PdpLayout() {
  const { pathname } = useLocation();
  const isRail = useMediaQuery(RAIL_QUERY);
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const mode = isDesktop ? styles.desktopMode : isRail ? styles.railMode : '';
  return (
    <div className={`${styles.root} ${mode}`}>
      {isDesktop && <CommerceHeader />}
      <div className={styles.outlet}>
        <Outlet />
      </div>
      {isDesktop ? (
        <SiteFooter />
      ) : isRail ? (
        <LeftRailNav currentPath={pathname} />
      ) : (
        <BottomNav currentPath={pathname} />
      )}
    </div>
  );
}
