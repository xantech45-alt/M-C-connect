import { MapPin, ChevronDown } from 'lucide-react';
import styles from './DeliveryContext.module.css';

interface Props {
  destination: string;
  onPress?: () => void;
  /** When true, the chip is rendered in compact (header) form. */
  compact?: boolean;
}

/**
 * Communicates fulfillment context for the active session. M&C computes landed
 * cost per destination - surfacing it up front matches Amazon's "deliver to"
 * header pattern, adapted for managed import.
 */
export function DeliveryContext({ destination, onPress, compact = false }: Props) {
  return (
    <button
      type="button"
      className={`${styles.root} ${compact ? styles.compact : ''}`}
      onClick={onPress}
    >
      <span className={styles.icon}>
        <MapPin size={compact ? 14 : 16} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <span className={styles.text}>
        <span className={styles.label}>{compact ? 'Livraison' : 'Destination de livraison'}</span>
        <span className={styles.destination}>{destination}</span>
      </span>
      <ChevronDown size={14} strokeWidth={1.5} aria-hidden="true" />
      <span className="sr-only">, modifier</span>
    </button>
  );
}
