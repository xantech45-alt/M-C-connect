import type { ReactNode } from 'react';
import styles from './Chip.module.css';

export type ChipTone = 'success' | 'warning' | 'info' | 'danger' | 'neutral';
export type ChipSize = 'sm' | 'md';

interface Props {
  tone?: ChipTone;
  icon?: ReactNode;
  size?: ChipSize;
  children: ReactNode;
}

export function Chip({ tone = 'neutral', icon, size = 'md', children }: Props) {
  return (
    <span className={`${styles.chip} ${styles[tone]} ${styles[size]}`}>
      {icon}
      {children}
    </span>
  );
}
