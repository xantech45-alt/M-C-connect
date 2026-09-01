import { Heart } from 'lucide-react';
import { EmptyState } from '@/components/primitives/EmptyState';
import { ProductCard } from '@/components/composite/ProductCard';
import { useFavorites } from '@/state/FavoritesProvider';
import { getProductById } from '@/state/catalog';
import styles from './FavoritesPage.module.css';

export default function FavoritesPage() {
  const { ids, remove } = useFavorites();
  const products = ids.map(getProductById).filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (products.length === 0) {
    return (
      <div className={styles.container}>
        <EmptyState
          icon={<Heart size={56} strokeWidth={1.5} />}
          title="Aucun favori pour le moment"
          body="Appuyez sur le cœur d'un produit pour le retrouver ici."
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <p className={styles.count}>{products.length} produit{products.length > 1 ? 's' : ''}</p>
      <div className={styles.grid}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} favorite onToggleFavorite={(prod) => remove(prod.id)} />
        ))}
      </div>
    </div>
  );
}
