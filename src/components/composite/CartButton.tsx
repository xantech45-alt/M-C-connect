import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/state/CartProvider';
import styles from './CartButton.module.css';

interface Props {
  /** Render label visible alongside the icon (for header bar). */
  withLabel?: boolean;
}

/**
 * Header cart affordance. Badge count mirrors CartProvider; the badge is hidden
 * when the cart is empty so it does not advertise a fake count.
 */
export function CartButton({ withLabel = false }: Props) {
  const navigate = useNavigate();
  const { lines } = useCart();
  const count = lines.reduce((sum, l) => sum + l.quantity, 0);

  return (
    <button
      type="button"
      className={`${styles.root} ${withLabel ? styles.withLabel : ''}`}
      onClick={() => navigate('/cart')}
      aria-label={
        count > 0
          ? `Panier, ${count} article${count > 1 ? 's' : ''}`
          : 'Panier (vide)'
      }
    >
      <ShoppingCart size={22} strokeWidth={1.5} aria-hidden="true" />
      {count > 0 && <span className={styles.badge}>{count}</span>}
      {withLabel && <span className={styles.label}>Panier</span>}
    </button>
  );
}
