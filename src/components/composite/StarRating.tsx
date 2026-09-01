import { Star } from 'lucide-react';
import styles from './StarRating.module.css';

interface Props {
  rating: number;
  reviewCount?: number;
  size?: number;
  showValue?: boolean;
}

export function StarRating({ rating, reviewCount, size = 14, showValue = true }: Props) {
  const rounded = Math.round(rating);
  const label = `${rating.toFixed(1)} sur 5 étoiles${reviewCount !== undefined ? ` (${reviewCount} avis)` : ''}`;

  return (
    <span className={styles.root} role="img" aria-label={label}>
      <span className={styles.stars} aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            strokeWidth={1.5}
            fill={i < rounded ? 'currentColor' : 'none'}
            className={i < rounded ? styles.filled : styles.empty}
          />
        ))}
      </span>
      {showValue && <span className={styles.value}>{rating.toFixed(1)}</span>}
      {reviewCount !== undefined && <span className={styles.count}>({reviewCount})</span>}
    </span>
  );
}
