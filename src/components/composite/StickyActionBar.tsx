import type { ReactNode } from 'react';
import { NO_BOTTOM_NAV_QUERY, useMediaQuery } from '@/hooks/useMediaQuery';
import styles from './StickyActionBar.module.css';

interface Props {
  children: ReactNode;
}

export function StickyActionBar({ children }: Props) {
  // >=900px: rail or desktop shell replaces the fixed bottom tab bar, so this bar
  // sits directly at the viewport bottom instead of reserving space above it.
  const isRail = useMediaQuery(NO_BOTTOM_NAV_QUERY);
  return (
    <div className={`${styles.bar} ${isRail ? styles.railMode : ''}`}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
