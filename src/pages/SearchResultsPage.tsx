import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ArrowDownUp } from 'lucide-react';
import { Image } from '@/components/primitives/Image';
import { ChipFilterGroup } from '@/components/composite/ChipFilterGroup';
import { EmptyState } from '@/components/primitives/EmptyState';
import { Button } from '@/components/primitives/Button';
import { categories, products, getProductById } from '@/state/catalog';
import styles from './SearchResultsPage.module.css';

type Sort = 'relevance' | 'price-asc' | 'price-desc' | 'moq-asc';

export default function SearchResultsPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const q = params.get('q') ?? '';
  const cat = params.get('cat');
  const priceMin = params.get('priceMin');
  const priceMax = params.get('priceMax');
  const moqMin = params.get('moqMin');
  const moqMax = params.get('moqMax');
  const verifiedOnly = params.get('verified') === '1';
  const [sort, setSort] = useState<Sort>((params.get('sort') as Sort) || 'relevance');
  const [activeCat, setActiveCat] = useState<string>(() => cat?.split(',')[0] ?? 'all');

  const results = useMemo(() => {
    let list = products.slice();
    if (activeCat !== 'all') list = list.filter((p) => p.categoryId === activeCat);
    if (q) {
      const needle = q.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(needle));
    }
    if (verifiedOnly) list = list.filter((p) => p.verified);
    if (priceMin) list = list.filter((p) => p.priceMinXof >= Number(priceMin));
    if (priceMax) list = list.filter((p) => p.priceMinXof <= Number(priceMax));
    if (moqMin) list = list.filter((p) => p.moq >= Number(moqMin));
    if (moqMax) list = list.filter((p) => p.moq <= Number(moqMax));
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.priceMinXof - b.priceMinXof);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.priceMinXof - a.priceMinXof);
    if (sort === 'moq-asc') list = [...list].sort((a, b) => a.moq - b.moq);
    return list;
  }, [q, activeCat, sort, verifiedOnly, priceMin, priceMax, moqMin, moqMax]);

  return (
    <div className={styles.container}>
      <header className={styles.head}>
        <div>
          <h1 className={styles.title}>
            {q
              ? `${results.length} résultats pour « ${q} »`
              : activeCat !== 'all'
                ? `${results.length} résultats dans ${categories.find((c) => c.id === activeCat)?.name ?? ''}`
                : `${results.length} résultats`}
          </h1>
        </div>
        <button
          type="button"
          className={styles.iconBtn}
          aria-label="Ouvrir les filtres"
          onClick={() => navigate('/filters', { state: { returnTo: '/search/results', search: params.toString() } })}
        >
          <SlidersHorizontal size={18} strokeWidth={1.5} />
        </button>
      </header>

      <div className={styles.catRow}>
        <ChipFilterGroup
          ariaLabel="Catégorie"
          value={activeCat}
          onChange={setActiveCat}
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
        <EmptyState
          title="Aucun produit ne correspond à votre recherche"
          body="Affinez vos filtres, ou demandez à M&C Connect de sourcer ce produit pour vous auprès d'un fabricant vérifié."
          action={
            <div className={styles.noResultsActions}>
              <Button variant="primary" onClick={() => navigate('/rfq/new')}>
                Demander un sourcing M&amp;C
              </Button>
              <Link to="/categories" className={styles.browseAll}>
                Parcourir les catégories
              </Link>
            </div>
          }
        />
      ) : (
        <ul className={styles.list}>
          {results.map((raw) => {
            const p = getProductById(raw.id) ?? raw;
            const discountPct = p.originalPriceXof
              ? Math.round((1 - p.priceMinXof / p.originalPriceXof) * 100)
              : null;
            return (
              <li key={p.id} className={styles.row}>
                <Link to={`/product/${p.id}`} className={styles.rowLink}>
                  <div className={styles.thumbWrap}>
                    <Image src={p.imageUrl} alt="" width={80} height={80} ratio="1/1" loading="lazy" />
                  </div>
                  <div className={styles.rowBody}>
                    <h2 className={styles.rowTitle}>{p.title}</h2>
                    {p.shortSpecs[0] && <p className={styles.rowSubtitle}>{p.shortSpecs[0]}</p>}
                    <div className={styles.priceRow}>
                      <strong className={styles.price}>{p.priceMinXof.toLocaleString('fr-FR')} FCFA</strong>
                      {p.originalPriceXof && (
                        <span className={styles.original}>{p.originalPriceXof.toLocaleString('fr-FR')} FCFA</span>
                      )}
                      {discountPct !== null && <span className={styles.discountBadge}>-{discountPct}%</span>}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
