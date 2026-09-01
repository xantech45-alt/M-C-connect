import { Outlet, useLocation } from 'react-router-dom';
import { CommerceHeader } from '@/components/composite/CommerceHeader';
import { BottomNav } from '@/components/composite/BottomNav';
import { LeftRailNav } from '@/components/composite/LeftRailNav';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import styles from './TabsLayout.module.css';

/**
 * TabsLayout renders the global commerce header and bottom navigation with a
 * route outlet. Used by /home, /orders, /categories, /search, /messages,
 * /profile, /dashboard.
 *
 * At >=900px (tablet landscape) the fixed bottom tab bar is swapped for a
 * fixed left rail (same Set-B tabs) so the thumb-zone bar doesn't waste the
 * extra horizontal space.
 */
export function TabsLayout() {
  const { pathname } = useLocation();
  const isRail = useMediaQuery('(min-width: 900px)');
  return (
    <div className={`${styles.root} ${isRail ? styles.railMode : ''}`}>
      {/* /search renders its own full search bar (suggestions, recents,
          camera) - the header's would just duplicate it. */}
      <CommerceHeader hideSearch={pathname === '/search'} />
      <div className={styles.outlet}>
        <Outlet />
      </div>
      {isRail ? <LeftRailNav currentPath={pathname} /> : <BottomNav currentPath={pathname} />}
    </div>
  );
}