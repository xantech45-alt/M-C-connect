import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ArrowDownUp } from 'lucide-react';
import { ProductCard } from '@/components/composite/ProductCard';
import { ChipFilterGroup } from '@/components/composite/ChipFilterGroup';
import { EmptyState } from '@/components/primitives/EmptyState';
import { useFavorites } from '@/state/FavoritesProvider';
import { categories, products } from '@/state/catalog';
import styles from './AllProductsPage.module.css';

type Sort = 'relevance' | 'price-asc' | 'price-desc' | 'moq-asc';

export default function AllProductsPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { isFavorite, toggle } = useFavorites();
  const [cat, setCat] = useState<string>(() => params.get('cat')?.split(',')[0] ?? 'all');
  const [sort, setSort] = useState<Sort>((params.get('sort') as Sort) || 'relevance');
  const verifiedOnly = params.get('verified') === '1';
  const priceMin = params.get('priceMin');
  const priceMax = params.get('priceMax');
  const moqMin = params.get('moqMin');
  const moqMax = params.get('moqMax');

  const results = useMemo(() => {
    let list = products.slice();
    if (cat !== 'all') list = list.filter((p) => p.categoryId === cat);
    if (verifiedOnly) list = list.filter((p) => p.verified);
    if (priceMin) list = list.filter((p) => p.priceMinXof >= Number(priceMin));
    if (priceMax) list = list.filter((p) => p.priceMinXof <= Number(priceMax));
    if (moqMin) list = list.filter((p) => p.moq >= Number(moqMin));
    if (moqMax) list = list.filter((p) => p.moq <= Number(moqMax));
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.priceMinXof - b.priceMinXof);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.priceMinXof - a.priceMinXof);
    if (sort === 'moq-asc') list = [...list].sort((a, b) => a.moq - b.moq);
    return list;
  }, [cat, sort, verifiedOnly, priceMin, priceMax, moqMin, moqMax]);

  return (
    <div className={styles.container}>
      <header className={styles.head}>
        <div>
          <h1 className={styles.title}>Tous les produits</h1>
          <p className={styles.count}>
            {results.length} produit{results.length > 1 ? 's' : ''}
          </p>
        </div>
        <button
          type="button"
          className={styles.iconBtn}
          aria-label="Ouvrir les filtres"
          onClick={() => navigate('/filters', { state: { returnTo: '/products', search: params.toString() } })}
        >
          <SlidersHorizontal size={18} strokeWidth={1.5} />
        </button>
      </header>

      <div className={styles.catRow}>
        <ChipFilterGroup
          ariaLabel="Catégorie"
          value={cat}
          onChange={setCat}
          options={[{ value: 'all', label: 'Tous' }, ...categories.map((c) => ({ value: c.id, label: c.name }))]}
        />
      </div>

      <div className={styles.toolGroup}>
        <span className={styles.toolLabel}>
          <ArrowDownUp size={14} strokeWidth={1.5} aria-hidden="true" />
          Trier
        </span>
        <ChipFilterGroup
          ariaLabel="Tri"
          value={sort}
          onChange={setSort}
          options={[
            { value: 'relevance', label: 'Pertinence' },
            { value: 'price-asc', label: 'Prix ↑' },
            { value: 'price-desc', label: 'Prix ↓' },
            { value: 'moq-asc', label: 'MOQ ↑' },
          ]}
        />
      </div>

      {results.length === 0 ? (
        <EmptyState title="Aucun produit dans cette catégorie" body="Changez de filtre pour voir d'autres produits." />
      ) : (
        <>
          {/* Cards use h3 titles; this keeps the outline h1 > h2 > h3 (axe heading-order). */}
          <h2 className="sr-only">Liste des produits</h2>
          <div className={styles.grid}>
            {results.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                favorite={isFavorite(p.id)}
                onToggleFavorite={(prod) => toggle(prod.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
