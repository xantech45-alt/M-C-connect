import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, MapPin } from 'lucide-react';
import { Input } from '@/components/primitives/Input';
import { Divider } from '@/components/primitives/Divider';
import { Button } from '@/components/primitives/Button';
import { Section } from '@/components/primitives/Section';
import { StickyActionBar } from '@/components/composite/StickyActionBar';
import { useCart } from '@/state/CartProvider';
import { getProductById } from '@/state/catalog';
import styles from './OrderReviewPage.module.css';

const fmt = (n: number) => `${n.toLocaleString('fr-FR')} XOF`;

export default function OrderReviewPage() {
  const { lines, subtotalXof } = useCart();
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState({
    address: '',
    contact: '',
    phone: '',
    notes: '',
  });

  const freight = Math.round(subtotalXof * 0.12);
  const duty = Math.round(subtotalXof * 0.05);
  const vat = Math.round((subtotalXof + freight + duty) * 0.18);
  const service = Math.round((subtotalXof + freight + duty + vat) * 0.04);
  const total = subtotalXof + freight + duty + vat + service;

  if (lines.length === 0) {
    return (
      <div className={styles.container}>
        <p>Votre panier est vide.</p>
        <Button onClick={() => navigate('/home')}>Retour à l&apos;accueil</Button>
      </div>
    );
  }

  const onProceed = () => navigate('/checkout/payment');

  return (
    <div className={styles.container}>
      <Section variant="card" spacing="md" ariaLabel="Articles">
        <h2 className={styles.h2}>Articles ({lines.length})</h2>
        <ul className={styles.lines}>
          {lines.map((line) => {
            const p = getProductById(line.productId);
            return (
              <li key={line.productId} className={styles.lineRow}>
                <div className={styles.lineLeft}>
                  <span className={styles.thumb} aria-hidden="true">
                    <Package size={20} strokeWidth={1.5} />
                  </span>
                  <div>
                    <span className={styles.lineTitle}>{p?.title ?? line.productId}</span>
                    <span className={styles.lineMeta}>
                      {line.quantity} × {fmt(line.unitPriceXof)}
                    </span>
                  </div>
                </div>
                <span className={styles.lineRight}>
                  {fmt(line.unitPriceXof * line.quantity)}
                </span>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section variant="card" spacing="md" ariaLabel="Adresse de livraison">
        <h2 className={styles.h2}>
          <MapPin size={18} strokeWidth={1.5} aria-hidden="true" />
          Livraison Bamako
        </h2>
        <div className={styles.row2}>
          <Input
            label="Adresse"
            value={delivery.address}
            onChange={(e) => setDelivery((d) => ({ ...d, address: e.target.value }))}
            required
          />
          <Input
            label="Téléphone"
            type="tel"
            inputMode="tel"
            value={delivery.phone}
            onChange={(e) => setDelivery((d) => ({ ...d, phone: e.target.value }))}
            required
          />
        </div>
        <Input
          label="Contact"
          value={delivery.contact}
          onChange={(e) => setDelivery((d) => ({ ...d, contact: e.target.value }))}
          required
        />
        <Input
          label="Notes de livraison"
          value={delivery.notes}
          onChange={(e) => setDelivery((d) => ({ ...d, notes: e.target.value }))}
          placeholder="Étage, code accès, instructions douane…"
        />
      </Section>

      <Section variant="card" spacing="md" ariaLabel="Total">
        <h2 className={styles.h2}>Total rendu Bamako</h2>
        <dl className={styles.totals}>
          <dt>Marchandises</dt>
          <dd>{fmt(subtotalXof)}</dd>
          <dt>Transport maritime</dt>
          <dd>{fmt(freight)}</dd>
          <dt>Droits de douane (5 %)</dt>
          <dd>{fmt(duty)}</dd>
          <dt>TVA (18 %)</dt>
          <dd>{fmt(vat)}</dd>
          <dt>Service M&amp;C Connect</dt>
          <dd>{fmt(service)}</dd>
        </dl>
        <Divider spacing="sm" />
        <div className={styles.total}>
          <span>Total à payer</span>
          <strong>{fmt(total)}</strong>
        </div>
      </Section>

      <StickyActionBar>
        <Button variant="primary" size="large" block onClick={onProceed}>
          Procéder au paiement
        </Button>
      </StickyActionBar>
    </div>
  );
}