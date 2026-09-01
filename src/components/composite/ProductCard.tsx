import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, ArrowDownToLine, ShoppingCart } from 'lucide-react';
import { Image } from '@/components/primitives/Image';
import styles from './ProductCard.module.css';

export interface ProductSummary {
  id: string;
  title: string;
  priceMinXof: number;
  currency?: 'XOF';
  imageUrl?: string;
  moq?: number;
  verified?: boolean;
  /** Optional tier hint e.g. "−12% par carton". */
  bulkHint?: string;
}

interface Props {
  product: ProductSummary;
  /** Adds an "Add to cart" affordance inline (used on cart/recommendation rails). */
  onAdd?: (product: ProductSummary) => void;
  /** Shows a heart toggle in the top-right corner (favorites grids, all-products grid). */
  favorite?: boolean;
  onToggleFavorite?: (product: ProductSummary) => void;
}

export function ProductCard({ product, onAdd, favorite, onToggleFavorite }: Props) {
  const formatted = product.priceMinXof.toLocaleString('fr-FR');
  return (
    <article className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.imageLink} aria-label={product.title}>
        <div className={styles.image}>
          <Image src={product.imageUrl} alt="" width={320} height={320} ratio="1/1" loading="lazy" />
          {product.verified && (
            <span className={styles.verifiedBadge} role="img" aria-label="Vérifié M&amp;C">
              <ShieldCheck size={12} strokeWidth={1.8} aria-hidden="true" />
            </span>
          )}
        </div>
      </Link>
      {onToggleFavorite && (
        <button
          type="button"
          className={`${styles.favoriteBtn} ${favorite ? styles.favoriteActive : ''}`}
          aria-label={favorite ? `Retirer ${product.title} des favoris` : `Ajouter ${product.title} aux favoris`}
          aria-pressed={Boolean(favorite)}
          onClick={() => onToggleFavorite(product)}
        >
          <Heart size={16} strokeWidth={1.8} fill={favorite ? 'currentColor' : 'none'} aria-hidden="true" />
        </button>
      )}
      <div className={styles.body}>
        <Link to={`/product/${product.id}`} className={styles.titleLink}>
          <h3 className={styles.title}>{product.title}</h3>
        </Link>
        <div className={styles.priceRow}>
          <span className={styles.priceLabel}>À partir de</span>
          <strong className={styles.price}>
            {formatted} <span className={styles.currency}>{product.currency ?? 'XOF'}</span>
          </strong>
        </div>
        {product.moq !== undefined && (
          <p className={styles.moq}>
            <span className={styles.moqLabel}>MOQ</span>
            <span className={styles.moqValue}>{product.moq}</span>
          </p>
        )}
        {product.bulkHint && (
          <p className={styles.bulk}>
            <ArrowDownToLine size={12} strokeWidth={1.8} aria-hidden="true" />
            {product.bulkHint}
          </p>
        )}
        {onAdd && (
          <button
            type="button"
            className={styles.addBtn}
            onClick={() => onAdd(product)}
            aria-label={`Ajouter ${product.title} au panier`}
          >
            <ShoppingCart size={14} strokeWidth={1.8} aria-hidden="true" />
            Ajouter
          </button>
        )}
      </div>
    </article>
  );
}