import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './IconButton.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  icon: ReactNode;
}

export function IconButton({ icon, className, ...rest }: Props) {
  return (
    <button type="button" className={`${styles.iconBtn} ${className ?? ''}`} {...rest}>
      {icon}
    </button>
  );
}
