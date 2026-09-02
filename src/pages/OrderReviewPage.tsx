import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, MapPin, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/primitives/Input';
import { Divider } from '@/components/primitives/Divider';
import { Button } from '@/components/primitives/Button';
import { Section } from '@/components/primitives/Section';
import { StickyActionBar } from '@/components/composite/StickyActionBar';
import { useCart } from '@/state/CartProvider';
import { getProductById } from '@/state/catalog';
import { getCartCustomerTotal, formatXof } from '@/domain/pricing';
import { getCommonTransportModes } from '@/domain/transport';
import styles from './OrderReviewPage.module.css';

export default function OrderReviewPage() {
  const { lines } = useCart();
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState({
    address: '',
    contact: '',
    phone: '',
    notes: '',
  });

  const total = getCartCustomerTotal(lines);
  const commonTransportModes = useMemo(
    () => getCommonTransportModes(lines.map((l) => getProductById(l.productId)?.transportModes ?? [])),
    [lines],
  );
  const hasIncompatibleTransport = lines.length > 1 && commonTransportModes.length === 0;

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
                      {line.quantity} × {formatXof(line.unitPriceXof)}
                    </span>
                  </div>
                </div>
                <span className={styles.lineRight}>
                  {formatXof(line.unitPriceXof * line.quantity)}
                </span>
              </li>
            );
          })}
        </ul>
      </Section>

      {hasIncompatibleTransport && (
        <Section variant="card" spacing="md" ariaLabel="Transport incompatible">
          <div className={styles.warning}>
            <AlertTriangle size={20} strokeWidth={1.5} aria-hidden="true" />
            <p>
              Ces produits n&apos;ont aucun mode de transport en commun. Séparez-les en deux
              commandes distinctes pour pouvoir procéder au paiement.
            </p>
          </div>
        </Section>
      )}

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
        <Divider spacing="sm" />
        <div className={styles.total}>
          <span>Total à payer</span>
          <strong>{formatXof(total.totalXof)}</strong>
        </div>
      </Section>

      <StickyActionBar>
        <Button variant="primary" size="large" block onClick={onProceed} disabled={hasIncompatibleTransport}>
          Procéder au paiement
        </Button>
      </StickyActionBar>
    </div>
  );
}
