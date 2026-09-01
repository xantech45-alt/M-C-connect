import type { HTMLAttributes } from 'react';
import styles from './Card.module.css';

interface Props extends HTMLAttributes<HTMLDivElement> {
  elevation?: 'flat' | 'elevated';
}

export function Card({ elevation = 'flat', className, ...rest }: Props) {
  return (
    <div className={`${styles.card} ${styles[elevation]} ${className ?? ''}`} {...rest} />
  );
}
