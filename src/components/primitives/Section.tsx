import type { ReactNode } from 'react';
import styles from './Section.module.css';

interface Props {
  children: ReactNode;
  /** Visual frame variant - flat for in-page rhythm, card for grouped surfaces. */
  variant?: 'flat' | 'card' | 'surface';
  /** Spacing top/bottom - small for tight lists, large between major regions. */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  /** Accessible label forwarded to the sectioning element. */
  ariaLabel?: string;
  ariaLabelledBy?: string;
  /** Render a less-prominent surface (homepage rails). */
  muted?: boolean;
  /** Override the rendered element (default: section). */
  as?: 'section' | 'div' | 'aside';
}

/**
 * Section primitive. Owns the vertical rhythm between major regions of the
 * commerce experience. Defaults to a flat section with `--section-gap`
 * vertical breathing room; switch to `card` to lift a grouped block off the
 * page background.
 */
export function Section({
  children,
  variant = 'flat',
  spacing = 'md',
  ariaLabel,
  ariaLabelledBy,
  muted,
  as: Tag = 'section',
}: Props) {
  const cls = [
    styles.root,
    styles[variant],
    styles[`spacing-${spacing}`],
    muted ? styles.muted : '',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <Tag
      className={cls}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </Tag>
  );
}