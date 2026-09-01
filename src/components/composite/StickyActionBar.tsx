import type { ReactNode } from 'react';
import styles from './StickyActionBar.module.css';

interface Props {
  children: ReactNode;
}

export function StickyActionBar({ children }: Props) {
  return (
    <div className={styles.bar}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
