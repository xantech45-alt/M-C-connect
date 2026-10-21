import { Outlet, useLocation } from 'react-router-dom';
import { CommerceHeader } from '@/components/composite/CommerceHeader';
import { BottomNav } from '@/components/composite/BottomNav';
import { LeftRailNav } from '@/components/composite/LeftRailNav';
import { SiteFooter } from '@/components/composite/SiteFooter';
import { DESKTOP_QUERY, RAIL_QUERY, useMediaQuery } from '@/hooks/useMediaQuery';
import styles from './TabsLayout.module.css';

/**
 * TabsLayout renders the global commerce header, the primary navigation and
 * a route outlet. Used by /home, /orders, /categories, /search, /messages,
 * /profile, /dashboard and the nested account/checkout routes.
 *
 * Navigation per width:
 * - <900px: fixed bottom tab bar (thumb zone, mobile customer journey).
 * - 900-1023px: fixed left rail (same five tabs).
 * - >=1024px: desktop shell - section nav inside the header, content
 *   centered at --content-max, site footer. No rail, no bottom bar.
 */
export function TabsLayout() {
  const { pathname } = useLocation();
  const isRail = useMediaQuery(RAIL_QUERY);
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const mode = isDesktop ? styles.desktopMode : isRail ? styles.railMode : '';
  return (
    <div className={`${styles.root} ${mode}`}>
      {/* /search renders its own full search bar (suggestions, recents,
          camera) - the header's would just duplicate it. */}
      <CommerceHeader hideSearch={pathname === '/search'} />
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
