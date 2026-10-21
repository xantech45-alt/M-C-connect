import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/composite/ProductCard';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import { Section } from '@/components/primitives/Section';
import { Chip } from '@/components/primitives/Chip';
import { Image } from '@/components/primitives/Image';
import { TrustBadge } from '@/components/composite/TrustBadge';
import { IconRender } from '@/components/primitives/IconRender';
import { HeroCarousel, type HeroSlide } from '@/components/composite/HeroCarousel';
import { asset } from '@/assets/registry';
import { useFavorites } from '@/state/FavoritesProvider';
import {
  categories,
  featuredIds,
  trendingIds,
  flashSaleIds,
  getProductById,
  products,
} from '@/state/catalog';
import { orders, STAGE_LABELS } from '@/state/orders';
import { formatDateFr } from '@/domain/format';
import styles from './HomePage.module.css';

/** Suivi rapide: first in-flight order from the same fixtures /orders shows. */
const activeOrder = orders.find((o) => o.currentStage !== 'delivered' && o.currentStage !== 'cancelled') ?? orders[0];

const HERO_SLIDES: HeroSlide[] = [
  {
    image: asset('hero-marche-paiement-mobile'),
    title: 'Paiement mobile sécurisé',
    subtitle: 'Wave, Orange Money ou virement - encaissés par M&C Connect',
    cta: 'Découvrir',
    to: '/categories',
  },
  {
    image: asset('hero-marche-tissus-wax'),
    title: 'Textile & Mode sourcés en direct',
    subtitle: 'Tissus, prêt-à-porter et accessoires vérifiés par M&C',
    cta: 'Voir les produits',
    to: '/search/results?cat=textile',
  },
  {
    image: asset('hero-marche-local-produits'),
    title: 'Sourcing de terrain, partout au Mali',
    subtitle: 'M&C Connect audite chaque fournisseur avant expédition',
    cta: 'En savoir plus',
    to: '/about',
  },
  {
    image: asset('hero-marche-fruits-legumes'),
    title: 'Proche de vous, connecté au monde',
    subtitle: "De l'Afrique à la Chine, une seule plateforme de confiance",
    cta: 'Voir les produits',
    to: '/products',
  },
];

const FLASH_SALE_DURATION_MS = 1000 * (60 * 60 * 2 + 60 * 45 + 18);

/** Cap each grid section at this many items before showing "Voir plus". */
const MAX_ITEMS = 4;

/** Curated Home shortcut set - exactly two rows of four. The full list lives on /categories. */
const HOME_CATEGORY_COUNT = 8;
const HOME_CATEGORIES = categories.slice(0, HOME_CATEGORY_COUNT);

function useCountdown(durationMs: number) {
  const [endsAt] = useState(() => Date.now() + durationMs);
  const [remainingMs, setRemainingMs] = useState(durationMs);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRemainingMs(Math.max(0, endsAt - Date.now()));
    }, 1000);
    return () => window.clearInterval(id);
  }, [endsAt]);

  const totalSeconds = Math.floor(remainingMs / 1000);
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const s = String(totalSeconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export default function HomePage() {
  const { isFavorite, toggle } = useFavorites();
  const featured = featuredIds.map(getProductById).filter(Boolean);
  const trending = trendingIds.map(getProductById).filter(Boolean);
  const flashSale = flashSaleIds.map(getProductById).filter(Boolean);
  const recent = products.slice(0, MAX_ITEMS);
  const recommended = products.slice(2, 6);

  const countdown = useCountdown(FLASH_SALE_DURATION_MS);

  // "Voir plus" is shown when a curated slice has more than MAX_ITEMS entries.
  // The pattern is correct even when dormant - the link appears automatically
  // when curated lists grow. Don't delete as dead code.
  const featuredHasMore = featured.length > MAX_ITEMS;
  const recommendedHasMore = recommended.length > MAX_ITEMS;
  const recentHasMore = recent.length > MAX_ITEMS;
  const trendingHasMore = trending.length > MAX_ITEMS;

  const seeAllLink = (key: string) => (
    <Link key={key} to="/products" className={styles.seeAll}>
      Voir plus
      <ChevronRight size={16} strokeWidth={1.5} aria-hidden="true" />
    </Link>
  );

  return (
    <div className={styles.container}>
      {/* CommerceHeader (brand mark + search) is the visible page identity here;
          this heading exists only so the document has a level-one heading. */}
      <h1 className="sr-only">Accueil</h1>
      {/* Top commerce stack: hero -> compact active order -> two-row categories
          -> flash offers. These four share one tight local gap (--home-stack-gap)
          instead of the page-level section rhythm used further down. */}
      <div className={styles.topStack}>
        <Section variant="flat" spacing="none" ariaLabel="Promotions">
          <HeroCarousel slides={HERO_SLIDES} />
        </Section>

        {/* Active order card - surfaced when there's an in-flight order */}
        <Section variant="flat" spacing="none" ariaLabel="Commande en cours">
          <article className={styles.activeOrder}>
            <div className={styles.activeOrderLeft}>
              <span className={styles.activeOrderEyebrow}>
                <Truck size={12} strokeWidth={1.5} aria-hidden="true" />
                En cours
              </span>
              <h2 className={styles.activeOrderTitle}>
                {activeOrder.id} · {STAGE_LABELS[activeOrder.currentStage]} - arrivée estimée le{' '}
                {formatDateFr(activeOrder.eta, { day: 'numeric', month: 'short' })}
              </h2>
            </div>
            <Link to={`/orders/${activeOrder.id}`} className={styles.activeOrderCta}>
              Suivre
              <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </article>
        </Section>

        {/* Category shortcuts - two rows of four photo tiles */}
        <Section variant="flat" spacing="none" ariaLabel="Catégories">
          <SectionHeader
            compact
            title="Catégories"
            trailing={
              <Link to="/categories" className={styles.seeAll}>
                Voir tout
                <ChevronRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            }
          />
          <ul className={styles.catGrid} data-testid="home-category-grid">
            {HOME_CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link to={`/search/results?cat=${c.id}`} className={styles.catTile}>
                  <Image
                    src={c.imageUrl}
                    alt=""
                    width={96}
                    height={96}
                    ratio="1/1"
                    loading="lazy"
                    className={styles.catImage}
                    fallbackIcon={<IconRender name={c.iconName} size={30} strokeWidth={1.5} />}
                  />
                  <span className={styles.catLabel}>{c.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        {/* Flash sale - live countdown, horizontally scrollable discount cards */}
        <Section variant="flat" spacing="none" ariaLabel="Offres flash">
          <SectionHeader
            compact
            title="Offres flash"
            trailing={
              <Link to="/products" className={styles.seeAll}>
                Voir tout
                <ChevronRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            }
          />
          <p className={styles.flashCountdown}>
            Se termine dans <span className={styles.flashCountdownValue}>{countdown}</span>
          </p>
          <div className={styles.flashRow}>
            {flashSale.map((p) => {
              if (!p || !p.originalPriceXof) return null;
              const discountPct = Math.round((1 - p.priceMinXof / p.originalPriceXof) * 100);
              return (
                <Link key={p.id} to={`/product/${p.id}`} className={styles.flashCard}>
                  <div className={styles.flashImageWrap}>
                    <Image src={p.imageUrl} alt="" width={140} height={140} ratio="1/1" loading="lazy" />
                    <span className={styles.flashBadge}>-{discountPct}%</span>
                  </div>
                  <span className={styles.flashTitle}>{p.title}</span>
                  <span className={styles.flashPriceRow}>
                    <strong className={styles.flashPrice}>{p.priceMinXof.toLocaleString('fr-FR')} FCFA</strong>
                    <span className={styles.flashOriginal}>{p.originalPriceXof.toLocaleString('fr-FR')} FCFA</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </Section>
      </div>

      {/* Featured (À la une) */}
      <Section variant="flat" spacing="md" ariaLabel="À la une">
        <SectionHeader
          title="À la une"
          trailing={
            <>
              <Chip tone="info">Vérifiés M&amp;C</Chip>
              {featuredHasMore && seeAllLink('featured')}
            </>
          }
        />
        <div className={styles.grid}>
          {featured.slice(0, MAX_ITEMS).map((p) => p && (
            <ProductCard key={p.id} product={p} favorite={isFavorite(p.id)} onToggleFavorite={(prod) => toggle(prod.id)} />
          ))}
        </div>
      </Section>

      {/* Trust banner - replaces the bare MarketplaceTile with a value statement */}
      <Section variant="card" spacing="md" ariaLabel="Pourquoi M&C">
        <div className={styles.trustGrid}>
          <TrustBadge icon={<ShieldCheck size={20} strokeWidth={1.5} />} label="Vendu et géré par M&C" />
          <TrustBadge icon={<ShieldCheck size={20} strokeWidth={1.5} />} label="Contrôle qualité inclus" />
          <TrustBadge icon={<Truck size={20} strokeWidth={1.5} />} label="Livraison suivie jusqu'au Mali" />
          <TrustBadge icon={<Sparkles size={20} strokeWidth={1.5} />} label="Sourcing géré par M&C" />
        </div>
        <p className={styles.trustNote}>
          M&amp;C Connect gère la totalité de la chaîne - vous ne traitez jamais avec un fournisseur
          en direct.
        </p>
      </Section>

      {/* Recommendations */}
      <Section variant="flat" spacing="md" ariaLabel="Recommandations">
        <SectionHeader
          title="Recommandés pour vous"
          trailing={recommendedHasMore ? seeAllLink('recommended') : undefined}
        />
        <div className={styles.grid}>
          {recommended.slice(0, MAX_ITEMS).map((p) => (
            <ProductCard key={p.id} product={p} favorite={isFavorite(p.id)} onToggleFavorite={(prod) => toggle(prod.id)} />
          ))}
        </div>
      </Section>

      {/* Recently viewed */}
      <Section variant="flat" spacing="md" ariaLabel="Récemment consultés">
        <SectionHeader
          title="Récemment consultés"
          trailing={recentHasMore ? seeAllLink('recent') : undefined}
        />
        <div className={styles.grid}>
          {recent.slice(0, MAX_ITEMS).map((p) => (
            <ProductCard key={p.id} product={p} favorite={isFavorite(p.id)} onToggleFavorite={(prod) => toggle(prod.id)} />
          ))}
        </div>
      </Section>

      {/* Trending */}
      <Section variant="flat" spacing="md" ariaLabel="Tendances">
        <SectionHeader
          title="Tendances"
          trailing={trendingHasMore ? seeAllLink('trending') : undefined}
        />
        <div className={styles.grid}>
          {trending.slice(0, MAX_ITEMS).map((p) => p && (
            <ProductCard key={p.id} product={p} favorite={isFavorite(p.id)} onToggleFavorite={(prod) => toggle(prod.id)} />
          ))}
        </div>
      </Section>
    </div>
  );
}
