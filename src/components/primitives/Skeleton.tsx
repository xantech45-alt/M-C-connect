import type { CSSProperties } from 'react';
import styles from './Skeleton.module.css';

interface Props {
  width?: number | string;
  height?: number | string;
  /** Make the skeleton a circle (avatars, badges). */
  circle?: boolean;
  /** Accessibility - a string label announces intent to AT. */
  label?: string;
  style?: CSSProperties;
}

/**
 * Skeleton placeholder with a subtle shimmer. Use while real content is
 * loading; mirror the dimensions of the eventual element to avoid layout shift.
 */
export function Skeleton({ width, height = 16, circle = false, label = 'Chargement', style }: Props) {
  return (
    <span
      role="status"
      aria-label={label}
      className={`${styles.root} ${circle ? styles.circle : ''}`}
      style={{ width, height, ...style }}
    />
  );
}