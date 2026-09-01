import type { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

interface Props {
  title: ReactNode;
  seeAllLabel?: string;
  onSeeAll?: () => void;
  trailing?: ReactNode;
}

export function SectionHeader({ title, seeAllLabel, onSeeAll, trailing }: Props) {
  return (
    <header className={styles.header}>
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
