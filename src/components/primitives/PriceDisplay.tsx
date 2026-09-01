import type { CSSProperties } from 'react';
import styles from './PriceDisplay.module.css';

interface Props {
  value: number;
  /** When true, prefixes "À partir de" label. */
  prefix?: 'from' | 'starts-at' | null;
  /** Display size. Default 'md'. */
  size?: 'sm' | 'md' | 'lg';
  /** Decimals are never shown for XOF (Mali currency, no minor units). */
  currency?: 'XOF';
  className?: string;
}

const PREFIX_TEXT = {
  from: 'À partir de',
  'starts-at': 'À partir de',
} as const;

/**
 * PriceDisplay always renders XOF with no decimals (Mali franc has no minor
 * units). Locale-aware thousand separator via `Intl.NumberFormat('fr-FR')`.
 */
export function PriceDisplay({
  value,
  prefix = null,
  size = 'md',
  currency = 'XOF',
  className,
}: Props) {
  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    maximumFractionDigits: 0,
  });
  const formatted = formatter.format(value);
  const style: CSSProperties = {};

  return (
    <span className={`${styles.price} ${styles[size]} ${className ?? ''}`} style={style}>
      {prefix && <span className={styles.prefix}>{PREFIX_TEXT[prefix]} </span>}
      <strong>{formatted}</strong>
      <span className={styles.currency}> {currency}</span>
    </span>
  );
}
