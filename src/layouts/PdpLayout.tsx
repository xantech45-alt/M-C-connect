import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from '@/components/composite/BottomNav';
import styles from './PdpLayout.module.css';

/**
 * Layout for the product detail page: no top commerce header (so the
 * PDP can render its own slim back/title row), but BottomNav persists
 * and is fixed to the viewport.
 */
export function PdpLayout() {
  const { pathname } = useLocation();
  return (
    <div className={styles.root}>
      <div className={styles.outlet}>
        <Outlet />
      </div>
      <BottomNav currentPath={pathname} />
    </div>
  );
}
