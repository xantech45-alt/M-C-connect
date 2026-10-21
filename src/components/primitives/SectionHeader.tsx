import type { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

interface Props {
  title: ReactNode;
  seeAllLabel?: string;
  onSeeAll?: () => void;
  trailing?: ReactNode;
  /** Drop the vertical padding - for dense stacks that own their own spacing. */
  compact?: boolean;
}

export function SectionHeader({ title, seeAllLabel, onSeeAll, trailing, compact }: Props) {
  return (
    <header className={compact ? `${styles.header} ${styles.compact}` : styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.actions}>
        {trailing}
        {seeAllLabel && onSeeAll && (
          <button type="button" className={styles.seeAll} onClick={onSeeAll}>
            {seeAllLabel}
          </button>
        )}
      </div>
    </header>
  );
}
