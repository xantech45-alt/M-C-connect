import { useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Package, Info, Calculator, Truck, FileCheck2 } from 'lucide-react';
import { Divider } from '@/components/primitives/Divider';
import { Button } from '@/components/primitives/Button';
import { QuantityStepper } from '@/components/composite/QuantityStepper';
import { Section } from '@/components/primitives/Section';
import { getProductById } from '@/state/catalog';
import styles from './LandedCostPage.module.css';

interface LandedCost {
  exw: number;
  freight: number;
  insurance: number;
  duty: number;
  vat: number;
  mcService: number;
  total: number;
}

function buildCost(unitPriceXof: number, qty: number): LandedCost {
  const safeQty = Math.max(qty, 1);
  const exw = unitPriceXof * safeQty;
  const freight = Math.round(exw * 0.12);
  const insurance = Math.round(exw * 0.01);
  const duty = Math.round(exw * 0.05);
  const vat = Math.round((exw + freight + insurance + duty) * 0.18);
  const mcService = Math.round((exw + freight + insurance + duty + vat) * 0.04);
  const total = exw + freight + insurance + duty + vat + mcService;
  return { exw, freight, insurance, duty, vat, mcService, total };
}

const fmt = (n: number) => `${n.toLocaleString('fr-FR')} XOF`;

interface RowProps {
  label: string;
  value: number;
  hint?: string;
}

function Row({ label, value, hint }: RowProps) {
  return (
    <>
      <dt>
        {label}
        {hint && (
          <span className={styles.hint} aria-hidden="true">
            <Info size={12} strokeWidth={1.5} />
          </span>
        )}
      </dt>
      <dd>{fmt(value)}</dd>
    </>
  );
}

export default function LandedCostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = useMemo(() => (id ? getProductById(id) : undefined), [id]);
  const [qty, setQty] = useState(product?.moq ?? 1);

  if (!product) return <div className={styles.container}>Produit introuvable.</div>;

  const c = buildCost(product.priceMinXof, qty);
  const perUnit = Math.round(c.total / Math.max(qty, 1));

  return (
    <div className={styles.container}>
      <Section variant="card" spacing="md" ariaLabel="Produit">
        <div className={styles.productRow}>
          <span className={styles.thumb} aria-hidden="true">
            <Package size={28} strokeWidth={1.5} />
          </span>
          <div className={styles.productText}>
            <h1 className={styles.title}>{product.title}</h1>
            <p className={styles.subtitle}>EXW {product.priceMinXof.toLocaleString('fr-FR')} XOF / unité</p>
          </div>
        </div>
      </Section>

      <Section variant="card" spacing="md" ariaLabel="Quantité">
        <div className={styles.qtyRow}>
          <span className={styles.qtyLabel}>Quantité</span>
          <QuantityStepper value={qty} min={1} max={9999} onChange={setQty} />
        </div>
        <p className={styles.qtyNote}>
          Le MOQ est de {product.moq} unités - prix ferme M&amp;C appliqué par palier.
        </p>
      </Section>

      <Section variant="card" spacing="md" ariaLabel="Détail des coûts">
        <h2 className={styles.h2}>
          <Calculator size={18} strokeWidth={1.5} aria-hidden="true" />
          Détail des coûts
        </h2>
        <dl className={styles.breakdown}>
          <Row label="Marchandise EXW" value={c.exw} hint="Prix d'achat sortie d'usine" />
          <Row label="Fret maritime" value={c.freight} hint="Port chinois → Port de Lomé" />
          <Row label="Assurance transport" value={c.insurance} />
          <Row label="Droits de douane (5 %)" value={c.duty} />
          <Row label="TVA (18 %)" value={c.vat} />
          <Row label="Service M&amp;C Connect" value={c.mcService} hint="Sourcing, QC, coordination" />
        </dl>
        <Divider spacing="sm" />
        <div className={styles.totalRow}>
          <span>Coût total rendu</span>
          <strong>{fmt(c.total)}</strong>
        </div>
        <p className={styles.perUnit}>soit <strong>{fmt(perUnit)}</strong> par unité</p>
      </Section>

      <Section variant="surface" spacing="md" ariaLabel="Processus">
        <div className={styles.processRow}>
          <span className={styles.processIcon}>
            <Truck size={20} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <div>
            <strong>Livraison Bamako en 30–45 jours</strong>
            <p className={styles.processNote}>
              Préparation 5 j · Fret maritime 22–28 j · Douane 5 j · Livraison locale 2 j
            </p>
          </div>
        </div>
        <div className={styles.processRow}>
          <span className={styles.processIcon}>
            <FileCheck2 size={20} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <div>
            <strong>Facture pro forma avant paiement</strong>
            <p className={styles.processNote}>
              Aucun paiement ne quitte votre compte avant validation de la pro forma.
            </p>
          </div>
        </div>
      </Section>

      <p className={styles.disclaimer}>
        Estimation fournie par M&amp;C Connect sur la base des volumes et taux pratiqués. Le
        décompte final figure sur la facture pro forma avant paiement.
      </p>

      <div className={styles.actions}>
        <Button variant="primary" size="large" block onClick={() => navigate('/rfq/new')}>
          Demander un devis ferme
        </Button>
        <Link to={`/product/${product.id}`} className={styles.secondary}>
          Retour au produit
        </Link>
      </div>
    </div>
  );
}