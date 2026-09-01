import styles from './Divider.module.css';

interface Props {
  /** Vertical padding above/below the divider. */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  /** Render with no extra padding (use inside list items). */
  inset?: boolean;
}

/**
 * Hairline divider for separating content groups. Uses `--border-soft` so it
 * never feels as heavy as a true stroke.
 */
export function Divider({ spacing = 'sm', inset = false }: Props) {
  const cls = [styles.root, styles[`spacing-${spacing}`], inset ? styles.inset : '']
    .filter(Boolean)
    .join(' ');
  return <hr role="separator" className={cls} />;
}