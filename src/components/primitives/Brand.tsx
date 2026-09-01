import styles from './Brand.module.css';

interface Props {
  variant?: 'full' | 'mark';
}

/**
 * M&C Connect brand mark. Compact variant is used in the header; full variant
 * on marketing surfaces. Uses the M&C red accent and stays strictly monochrome.
 */
export function Brand({ variant = 'mark' }: Props) {
  return (
    <span className={`${styles.root} ${styles[variant]}`} role="img" aria-label="M&amp;C Connect">
      <span className={styles.mark}>
        <span className={styles.amp}>&amp;</span>
      </span>
      {variant === 'full' && <span className={styles.text}>M&amp;C Connect</span>}
    </span>
  );
}
