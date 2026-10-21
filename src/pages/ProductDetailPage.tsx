import { useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Package,
  Truck,
  Plane,
  Ship,
  ChevronLeft,
  ChevronDown,
  Layers,
  FileText,
  Heart,
  Box,
  ZoomIn,
  Tag,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { IconButton } from '@/components/primitives/IconButton';
import { Chip } from '@/components/primitives/Chip';
import { Card } from '@/components/primitives/Card';
import { Divider } from '@/components/primitives/Divider';
import { Image } from '@/components/primitives/Image';
import { Section } from '@/components/primitives/Section';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import { QuantityStepper } from '@/components/composite/QuantityStepper';
import { StickyActionBar } from '@/components/composite/StickyActionBar';
import { CartButton } from '@/components/composite/CartButton';
import { ProductCard } from '@/components/composite/ProductCard';
import { categories, getProductById, products } from '@/state/catalog';
import { useCart } from '@/state/CartProvider';
import { useFavorites } from '@/state/FavoritesProvider';
import { useToast } from '@/components/ui/Toast';
import { getProductCustomerTotal, formatXof } from '@/domain/pricing';
import { describeTransportAvailability } from '@/domain/transport';
import styles from './ProductDetailPage.module.css';

const TIER_ROWS = [
  { qty: '1 – 9', price: 165000 },
  { qty: '10 – 49', price: 156750 },
  { qty: '50 – 199', price: 148500 },
  { qty: '200+', price: 132000 },
];

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = useMemo(() => (id ? getProductById(id) : undefined), [id]);
  const { add } = useCart();
  const { isFavorite, toggle } = useFavorites();
  const toast = useToast();
  const [qty, setQty] = useState(product?.moq ?? 1);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [descExpanded, setDescExpanded] = useState(false);
  const galleryImages = product
    ? [product.imageUrl, ...(product.gallery ?? [])].filter((src): src is string => Boolean(src))
    : [];
  const galleryCount = galleryImages.length || 1;

  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.bareHeader}>
          <button
            type="button"
            aria-label="Retour"
            className={styles.backBtn}
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
        </div>
        <p>Produit introuvable.</p>
        <Link to="/home">Retour</Link>
      </div>
    );
  }

  const categoryName = categories.find((c) => c.id === product.categoryId)?.name;
  const description = `${product.title} - ${product.shortSpecs.join(', ')}. Sourcing vérifié et contrôle qualité M&C Connect avant expédition.`;
  const customerTotal = getProductCustomerTotal(product, qty);
  const transportLabel = describeTransportAvailability(product.transportModes);

  const onAdd = () => {
    add({
      productId: product.id,
      quantity: qty,
      unitPriceXof: product.priceMinXof,
      moq: product.moq,
    });
    toast('success', `Ajouté au panier (${qty} unité${qty > 1 ? 's' : ''})`);
  };

  const onBuyNow = () => {
    add({
      productId: product.id,
      quantity: qty,
      unitPriceXof: product.priceMinXof,
      moq: product.moq,
    });
    navigate('/checkout/review');
  };

  const onNotAvailable = () => toast('info', 'Bientôt disponible');

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className={styles.container}>
      <div className={styles.bareHeader}>
        <button
          type="button"
          aria-label="Retour"
          className={styles.backBtn}
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </button>
        {/* Not a heading: the real <h1> is the product title in the body below -
            this app-bar row is navigational chrome, not document content. */}
        <p className={styles.bareTitle} aria-hidden="true">
          {product.title}
        </p>
        <div className={styles.headerActions}>
          <IconButton
            icon={<Heart size={20} strokeWidth={1.5} fill={isFavorite(product.id) ? 'currentColor' : 'none'} />}
            aria-label={isFavorite(product.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            aria-pressed={isFavorite(product.id)}
            onClick={() => toggle(product.id)}
            className={isFavorite(product.id) ? styles.favoriteActive : undefined}
          />
          <CartButton />
        </div>
      </div>

      {/* Tablet (>=768px): gallery and details sit side by side instead of
          stacking, with the gallery pinned while details scroll. */}
      <div className={styles.splitRow}>
      {/* Gallery - left vertical thumbnail rail */}
      <Section variant="flat" spacing="none" ariaLabel="Galerie produit">
        <div className={styles.galleryWrap}>
          {galleryImages.length > 1 && (
            <div className={styles.galleryThumbs}>
              {galleryImages.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={`${styles.thumb} ${i === galleryIndex ? styles.thumbActive : ''}`}
                  aria-label={`Voir image ${i + 1}`}
                  aria-current={i === galleryIndex}
                  onClick={() => setGalleryIndex(i)}
                >
                  <Image src={src} alt="" width={56} height={56} ratio="1/1" loading="lazy" />
                </button>
              ))}
            </div>
          )}
          <div className={styles.galleryMain}>
            <Image
              src={galleryImages[galleryIndex]}
              alt={galleryImages.length > 0 ? product.title : ''}
              width={640}
              height={640}
              ratio="1/1"
              loading="eager"
              fetchPriority="high"
              fallbackIcon={<Package size={120} strokeWidth={1.5} aria-hidden="true" />}
            />
            <div className={styles.galleryFloatBtns}>
              <button type="button" className={styles.floatBtn} onClick={onNotAvailable} aria-label="Voir en 3D">
                <Box size={16} strokeWidth={1.5} aria-hidden="true" />
                3D
              </button>
              <button type="button" className={styles.floatBtnRound} onClick={onNotAvailable} aria-label="Zoomer l'image">
                <ZoomIn size={18} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>
            {galleryImages.length > 1 && (
              <div className={styles.galleryDots} role="tablist" aria-label="Images du produit">
                {galleryImages.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === galleryIndex}
                    aria-label={`Image ${i + 1} sur ${galleryCount}`}
                    className={`${styles.galleryDot} ${i === galleryIndex ? styles.galleryDotActive : ''}`}
                    onClick={() => setGalleryIndex(i)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section variant="flat" spacing="md" ariaLabel="Détails">
        <div className={styles.head}>
          <div className={styles.chips}>
            {product.verified && (
              <Chip tone="success" icon={<ShieldCheck size={14} strokeWidth={1.5} />}>
                Vérifié M&amp;C
              </Chip>
            )}
            <Chip tone="info">MOQ {product.moq}</Chip>
            {product.hsCode && <Chip tone="neutral">HS {product.hsCode}</Chip>}
          </div>
          <h1 className={styles.title}>{product.title}</h1>
          {/* No star rating: ratings were a hash of the product id (IDI-021), i.e. fabricated.
              Verified reviews arrive with real delivered orders (Master Spec MS-CAT-10, Phase 4). */}
          <div className={styles.priceStockRow}>
            <div className={styles.priceBlock}>
              <strong className={styles.price}>
                {product.priceMinXof.toLocaleString('fr-FR')} <span>FCFA</span>
              </strong>
              <span className={styles.priceLabel}>Prix TTC</span>
            </div>
            <div className={styles.stockBlock}>
              <span className={styles.inStock}>
                <ShieldCheck size={14} strokeWidth={1.8} aria-hidden="true" />
                En stock
              </span>
              <span className={styles.deliveryNote}>
                <Truck size={14} strokeWidth={1.5} aria-hidden="true" />
                Livraison suivie par M&amp;C
              </span>
            </div>
          </div>
        </div>

        <Divider spacing="sm" />

        <div className={styles.trustCells}>
          <div className={styles.trustCell}>
            <Package size={18} strokeWidth={1.5} aria-hidden="true" />
            <span className={styles.trustCellLabel}>MOQ</span>
            <span className={styles.trustCellValue}>{product.moq} unités</span>
          </div>
          <div className={styles.trustCell}>
            <ShieldCheck size={18} strokeWidth={1.5} aria-hidden="true" />
            <span className={styles.trustCellLabel}>Qualité garantie</span>
            <span className={styles.trustCellValue}>Contrôlée M&amp;C</span>
          </div>
          <div className={styles.trustCell}>
            {product.transportModes.includes('sea') ? (
              <Ship size={18} strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Plane size={18} strokeWidth={1.5} aria-hidden="true" />
            )}
            <span className={styles.trustCellLabel}>Transport</span>
            <span className={styles.trustCellValue}>{transportLabel}</span>
          </div>
        </div>

        <Divider spacing="sm" />

        <div className={styles.qtyRow}>
          <span className={styles.qtyLabel}>Quantité</span>
          <QuantityStepper value={qty} min={product.moq} max={9999} onChange={setQty} />
        </div>

        <Divider spacing="sm" />

        {/* Customer-facing total only - no freight/duty/VAT/service breakdown (getProductCustomerTotal). */}
        <div className={styles.totalCostBlock}>
          <span className={styles.totalCostText}>
            <span className={styles.totalCostLabel}>Coût total estimé</span>
            <span className={styles.totalCostHint}>Pour {qty} unité{qty > 1 ? 's' : ''} - fret, douane et livraison inclus</span>
          </span>
          <strong className={styles.totalCostValue}>{formatXof(customerTotal.totalXof)}</strong>
        </div>
      </Section>
      </div>

      <Section variant="flat" spacing="md" ariaLabel="Tarification par palier">
        <SectionHeader
          title="Tarification par palier"
          trailing={<Chip tone="info">−20% au plus gros</Chip>}
        />
        <Card>
          <table className={styles.tierTable}>
            <thead>
              <tr>
                <th scope="col">Quantité</th>
                <th scope="col" className={styles.tierRight}>Prix unitaire</th>
              </tr>
            </thead>
            <tbody>
              {TIER_ROWS.map((row) => (
                <tr key={row.qty}>
                  <td>{row.qty} unités</td>
                  <td className={styles.tierRight}>
                    {row.price.toLocaleString('fr-FR')} FCFA
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Section>

      <Section variant="flat" spacing="md" ariaLabel="Description">
        <SectionHeader title="Description" />
        <p className={`${styles.description} ${descExpanded ? styles.descriptionExpanded : ''}`}>
          {description}
        </p>
        <button type="button" className={styles.voirPlus} onClick={() => setDescExpanded((v) => !v)}>
          {descExpanded ? 'Voir moins' : 'Voir plus'}
          <ChevronDown size={14} strokeWidth={1.5} className={descExpanded ? styles.voirPlusIconOpen : ''} aria-hidden="true" />
        </button>
      </Section>

      <Section variant="flat" spacing="md" ariaLabel="Caractéristiques">
        <SectionHeader title="Caractéristiques" />
        <Card>
          <dl className={styles.specTable}>
            <div className={styles.specRow}>
              <dt><Package size={16} strokeWidth={1.5} aria-hidden="true" /> MOQ</dt>
              <dd>{product.moq} unités</dd>
            </div>
            {categoryName && (
              <div className={styles.specRow}>
                <dt><Tag size={16} strokeWidth={1.5} aria-hidden="true" /> Catégorie</dt>
                <dd>{categoryName}</dd>
              </div>
            )}
            {product.hsCode && (
              <div className={styles.specRow}>
                <dt><FileText size={16} strokeWidth={1.5} aria-hidden="true" /> Code HS</dt>
                <dd>{product.hsCode}</dd>
              </div>
            )}
            <div className={styles.specRow}>
              <dt><ShieldCheck size={16} strokeWidth={1.5} aria-hidden="true" /> Vérification</dt>
              <dd>{product.verified ? 'Vérifié M&C' : 'En cours'}</dd>
            </div>
            <div className={styles.specRow}>
              <dt>
                {product.transportModes.includes('sea') ? (
                  <Ship size={16} strokeWidth={1.5} aria-hidden="true" />
                ) : (
                  <Plane size={16} strokeWidth={1.5} aria-hidden="true" />
                )}
                Transport disponible
              </dt>
              <dd>{transportLabel}</dd>
            </div>
          </dl>
        </Card>
      </Section>

      <Section variant="card" spacing="md" ariaLabel="Sourcing M&C Connect">
        <div className={styles.mcHead}>
          <span className={styles.mcIcon}>
            <Layers size={20} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <div>
            <h2 className={styles.mcTitle}>Sourcing M&amp;C Connect</h2>
            <p className={styles.mcSub}>
              Vous ne traitez jamais directement avec le fournisseur.
            </p>
          </div>
        </div>
        <ul className={styles.mcList}>
          <li>
            <ShieldCheck size={14} strokeWidth={1.8} aria-hidden="true" />
            M&amp;C Verification - fournisseur audité sur site
          </li>
          <li>
            <ShieldCheck size={14} strokeWidth={1.8} aria-hidden="true" />
            M&amp;C Quality Control - inspection avant expédition
          </li>
          <li>
            <Truck size={14} strokeWidth={1.8} aria-hidden="true" />
            M&amp;C Logistics - fret aérien ou maritime, douane, livraison
          </li>
          <li>
            <FileText size={14} strokeWidth={1.8} aria-hidden="true" />
            M&amp;C Support - un seul interlocuteur, en français
          </li>
        </ul>
      </Section>

      <Section variant="flat" spacing="md" ariaLabel="Produits similaires">
        <SectionHeader title="Produits similaires" />
        <div className={styles.related}>
          {related.map((p) => (
            <ProductCard key={p.id} product={p} favorite={isFavorite(p.id)} onToggleFavorite={(prod) => toggle(prod.id)} />
          ))}
        </div>
      </Section>

      <StickyActionBar>
        <IconButton icon={<Tag size={18} strokeWidth={1.5} />} aria-label="Demander un devis" onClick={() => navigate('/rfq/new')} />
        <IconButton icon={<MessageCircle size={18} strokeWidth={1.5} />} aria-label="Discuter avec M&C" onClick={() => navigate('/messages')} />
        <Button variant="secondary" size="large" onClick={onAdd} className={styles.stickyGrow}>
          Ajouter au panier
        </Button>
        <Button variant="primary" size="large" onClick={onBuyNow} className={styles.stickyGrow}>
          Acheter maintenant
        </Button>
      </StickyActionBar>
    </div>
  );
}
