import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { Chip } from '@/components/primitives/Chip';
import { Input } from '@/components/primitives/Input';
import { Switch } from '@/components/primitives/Switch';
import { Divider } from '@/components/primitives/Divider';
import { categories } from '@/state/catalog';
import styles from './FiltersPage.module.css';

type Sort = 'relevance' | 'price-asc' | 'price-desc' | 'moq-asc';

interface FiltersState {
  sort: Sort;
  cats: string[];
  priceMin: string;
  priceMax: string;
  moqMin: string;
  moqMax: string;
  verifiedOnly: boolean;
  delivery: '' | '14' | '30' | '60';
  origin: boolean;
}

const DEFAULTS: FiltersState = {
  sort: 'relevance',
  cats: [],
  priceMin: '',
  priceMax: '',
  moqMin: '',
  moqMax: '',
  verifiedOnly: false,
  delivery: '',
  origin: false,
};

const SORT_OPTIONS: { value: Sort; label: string }[] = [
  { value: 'relevance', label: 'Pertinence' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'moq-asc', label: 'MOQ croissant' },
];

const DELIVERY_OPTIONS: { value: FiltersState['delivery']; label: string }[] = [
  { value: '14', label: '< 14 j' },
  { value: '30', label: '< 30 j' },
  { value: '60', label: '< 60 j' },
];

function readInitial(search: URLSearchParams): FiltersState {
  return {
    sort: (search.get('sort') as Sort) || DEFAULTS.sort,
    cats: search.get('cat') ? search.get('cat')!.split(',') : [],
    priceMin: search.get('priceMin') ?? '',
    priceMax: search.get('priceMax') ?? '',
    moqMin: search.get('moqMin') ?? '',
    moqMax: search.get('moqMax') ?? '',
    verifiedOnly: search.get('verified') === '1',
    delivery: (search.get('delivery') as FiltersState['delivery']) || '',
    origin: search.get('origin') === 'cn',
  };
}

export default function FiltersPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { returnTo?: string; search?: string } | null;
  const returnTo = state?.returnTo ?? '/search/results';
  const [filters, setFilters] = useState<FiltersState>(() =>
    readInitial(new URLSearchParams(state?.search ?? '')),
  );

  const toggleCat = (id: string) => {
    setFilters((f) => ({
      ...f,
      cats: f.cats.includes(id) ? f.cats.filter((c) => c !== id) : [...f.cats, id],
    }));
  };

  const onClose = () => navigate(-1);
  const onReset = () => setFilters(DEFAULTS);

  const onApply = () => {
    const params = new URLSearchParams(state?.search ?? '');
    params.set('sort', filters.sort);
    if (filters.cats.length > 0) params.set('cat', filters.cats.join(','));
    else params.delete('cat');
    if (filters.priceMin) params.set('priceMin', filters.priceMin);
    else params.delete('priceMin');
    if (filters.priceMax) params.set('priceMax', filters.priceMax);
    else params.delete('priceMax');
    if (filters.moqMin) params.set('moqMin', filters.moqMin);
    else params.delete('moqMin');
    if (filters.moqMax) params.set('moqMax', filters.moqMax);
    else params.delete('moqMax');
    if (filters.verifiedOnly) params.set('verified', '1');
    else params.delete('verified');
    if (filters.delivery) params.set('delivery', filters.delivery);
    else params.delete('delivery');
    if (filters.origin) params.set('origin', 'cn');
    else params.delete('origin');
    navigate(`${returnTo}?${params.toString()}`);
  };

  return (
    <div className={styles.container} role="dialog" aria-modal="true" aria-label="Filtres">
      <div className={styles.handle} aria-hidden="true" />
      <header className={styles.header}>
        <h1 className={styles.title}>Filtres</h1>
        <div className={styles.headerActions}>
          <button type="button" className={styles.clearLink} onClick={onReset}>
            Effacer
          </button>
          <button type="button" className={styles.closeBtn} aria-label="Fermer" onClick={onClose}>
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <div className={styles.body}>
        <section className={styles.section} aria-labelledby="filters-sort">
          <h2 id="filters-sort" className={styles.sectionTitle}>Trier par</h2>
          <div className={styles.chipRow} role="radiogroup" aria-label="Tri">
            {SORT_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                role="radio"
                aria-checked={filters.sort === o.value}
                onClick={() => setFilters((f) => ({ ...f, sort: o.value }))}
              >
                <Chip tone={filters.sort === o.value ? 'danger' : 'neutral'}>{o.label}</Chip>
              </button>
            ))}
          </div>
        </section>

        <Divider spacing="sm" />

        <section className={styles.section} aria-labelledby="filters-cat">
          <h2 id="filters-cat" className={styles.sectionTitle}>Catégorie</h2>
          <div className={styles.chipRow} role="group" aria-label="Catégories">
            {categories.map((c) => (
              <button key={c.id} type="button" aria-pressed={filters.cats.includes(c.id)} onClick={() => toggleCat(c.id)}>
                <Chip tone={filters.cats.includes(c.id) ? 'danger' : 'neutral'}>{c.name}</Chip>
              </button>
            ))}
          </div>
        </section>

        <Divider spacing="sm" />

        <section className={styles.section} aria-labelledby="filters-price">
          <h2 id="filters-price" className={styles.sectionTitle}>Prix (XOF)</h2>
          <div className={styles.rangeRow}>
            <Input
              label="Min"
              id="filters-price-min"
              type="number"
              inputMode="numeric"
              value={filters.priceMin}
              onChange={(e) => setFilters((f) => ({ ...f, priceMin: e.target.value }))}
            />
            <Input
              label="Max"
              id="filters-price-max"
              type="number"
              inputMode="numeric"
              value={filters.priceMax}
              onChange={(e) => setFilters((f) => ({ ...f, priceMax: e.target.value }))}
            />
          </div>
        </section>

        <Divider spacing="sm" />

        <section className={styles.section} aria-labelledby="filters-moq">
          <h2 id="filters-moq" className={styles.sectionTitle}>MOQ</h2>
          <div className={styles.rangeRow}>
            <Input
              label="Min"
              id="filters-moq-min"
              type="number"
              inputMode="numeric"
              value={filters.moqMin}
              onChange={(e) => setFilters((f) => ({ ...f, moqMin: e.target.value }))}
            />
            <Input
              label="Max"
              id="filters-moq-max"
              type="number"
              inputMode="numeric"
              value={filters.moqMax}
              onChange={(e) => setFilters((f) => ({ ...f, moqMax: e.target.value }))}
            />
          </div>
        </section>

        <Divider spacing="sm" />

        <section className={styles.section} aria-labelledby="filters-verified">
          <div className={styles.toggleRow}>
            <span id="filters-verified" className={styles.sectionTitle}>
              <ShieldCheck size={16} strokeWidth={1.5} aria-hidden="true" />
              Vérifié M&amp;C uniquement
            </span>
            <Switch
              checked={filters.verifiedOnly}
              onChange={(v) => setFilters((f) => ({ ...f, verifiedOnly: v }))}
              aria-label="Afficher uniquement les produits vérifiés M&C"
            />
          </div>
        </section>

        <Divider spacing="sm" />

        <section className={styles.section} aria-labelledby="filters-delivery">
          <h2 id="filters-delivery" className={styles.sectionTitle}>Livraison estimée</h2>
          <div className={styles.chipRow} role="radiogroup" aria-label="Livraison estimée">
            {DELIVERY_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                role="radio"
                aria-checked={filters.delivery === o.value}
                onClick={() => setFilters((f) => ({ ...f, delivery: f.delivery === o.value ? '' : o.value }))}
              >
                <Chip tone={filters.delivery === o.value ? 'danger' : 'neutral'}>{o.label}</Chip>
              </button>
            ))}
          </div>
        </section>

        <Divider spacing="sm" />

        <section className={styles.section} aria-labelledby="filters-origin">
          <h2 id="filters-origin" className={styles.sectionTitle}>Pays d&apos;origine</h2>
          <div className={styles.chipRow} role="group" aria-label="Pays d'origine">
            <button type="button" aria-pressed={filters.origin} onClick={() => setFilters((f) => ({ ...f, origin: !f.origin }))}>
              <Chip tone={filters.origin ? 'danger' : 'neutral'}>Chine</Chip>
            </button>
          </div>
        </section>
      </div>

      <div className={styles.footer}>
        <Button variant="primary" size="large" block onClick={onApply}>
          Appliquer
        </Button>
      </div>
    </div>
  );
}
