import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from '@/components/composite/BottomNav';
import { LeftRailNav } from '@/components/composite/LeftRailNav';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import styles from './PdpLayout.module.css';

/**
 * Layout for the product detail page: no top commerce header (so the
 * PDP can render its own slim back/title row), but a tab nav persists -
 * BottomNav below 900px, LeftRailNav (fixed left rail) at/above it.
 */
export function PdpLayout() {
  const { pathname } = useLocation();
  const isRail = useMediaQuery('(min-width: 900px)');
  return (
    <div className={`${styles.root} ${isRail ? styles.railMode : ''}`}>
      <div className={styles.outlet}>
        <Outlet />
      </div>
      {isRail ? <LeftRailNav currentPath={pathname} /> : <BottomNav currentPath={pathname} />}
    </div>
  );
}
