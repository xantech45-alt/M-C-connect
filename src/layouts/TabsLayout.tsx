import { Outlet, useLocation } from 'react-router-dom';
import { CommerceHeader } from '@/components/composite/CommerceHeader';
import { BottomNav } from '@/components/composite/BottomNav';
import styles from './TabsLayout.module.css';

/**
 * TabsLayout renders the global commerce header and bottom navigation with a
 * route outlet. Used by /home, /orders, /categories, /search, /messages,
 * /profile, /dashboard.
 */
export function TabsLayout() {
  const { pathname } = useLocation();
  return (
    <div className={styles.root}>
      <CommerceHeader />
      <div className={styles.outlet}>
        <Outlet />
      </div>
      <BottomNav currentPath={pathname} />
    </div>
  );
}