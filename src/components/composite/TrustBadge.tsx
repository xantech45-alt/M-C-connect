import type { ReactNode } from 'react';
import styles from './TrustBadge.module.css';

interface Props {
  icon?: ReactNode;
  label: string;
}

export function TrustBadge({ icon, label }: Props) {
  return (
    <span className={styles.badge}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </span>
  );
}
