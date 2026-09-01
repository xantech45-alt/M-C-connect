import type { ReactNode } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import styles from './StickyActionBar.module.css';

interface Props {
  children: ReactNode;
}

export function StickyActionBar({ children }: Props) {
  // >=900px: LeftRailNav replaces the fixed bottom tab bar, so this bar
  // sits directly at the viewport bottom instead of reserving space above it.
  const isRail = useMediaQuery('(min-width: 900px)');
  return (
    <div className={`${styles.bar} ${isRail ? styles.railMode : ''}`}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
