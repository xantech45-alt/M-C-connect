import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Wallet, Truck, CreditCard, Smartphone, Landmark, Plane, Ship, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { Section } from '@/components/primitives/Section';
import { StickyActionBar } from '@/components/composite/StickyActionBar';
import { useCart } from '@/state/CartProvider';
import { getProductById } from '@/state/catalog';
import { getTransportOptions, TRANSPORT_LABELS, TRANSPORT_TIMING, AIR_RATE_XOF_PER_KG } from '@/domain/transport';
import type { TransportMode } from '@/domain/transport';
import { useCheckout, type PaymentPlan, type PaymentMethod } from '@/state/CheckoutProvider';
import styles from './PaymentPage.module.css';

const PAYMENT_PLANS: { id: PaymentPlan; label: string; sub: string; icon: typeof Truck }[] = [
  {
    id: 'delivery_60',
    label: 'Paiement à la livraison (60% lors de la commande)',
    sub: '60% à la commande, solde à la livraison',
    icon: Truck,
  },
  {
    id: 'upfront_100',
    label: 'Paiement unique (100% lors de la commande)',
    sub: 'Montant total réglé à la commande',
    icon: CreditCard,
  },
];

const TRANSPORT_ICONS: Record<TransportMode, typeof Plane> = { air: Plane, sea: Ship };

const PAYMENT_METHODS: { id: PaymentMethod; label: string; sub: string; icon: typeof Smartphone }[] = [
  { id: 'wave', label: 'Wave', sub: 'Mobile money instantané', icon: Smartphone },
  { id: 'orange_money', label: 'Orange Money', sub: 'Mobile money', icon: Smartphone },
  { id: 'bank', label: 'Banque', sub: 'Virement bancaire', icon: Landmark },
];

export default function PaymentPage() {
  const navigate = useNavigate();
  const { lines } = useCart();
  const {
    paymentPlan,
    transportMode,
    paymentMethod,
    setPaymentPlan,
    setTransportMode,
    setPaymentMethod,
    clearTransport,
    isComplete,
  } = useCheckout();

  const transportOptions = useMemo(
    () => getTransportOptions(
      lines.map((l) => {
        const product = getProductById(l.productId);
        return { title: product?.title ?? l.productId, transportModes: product?.transportModes ?? [] };
      }),
    ),
    [lines],
  );
  const availableTransportModes = useMemo(
    () => transportOptions.filter((o) => o.available).map((o) => o.mode),
    [transportOptions],
  );
  const hasNoCommonTransport = lines.length > 0 && availableTransportModes.length === 0;

  // If the cart changed and the previously-selected transport mode is no
  // longer valid for it, clear it (and the payment method that depended on
  // it) rather than silently switching to a different mode the user never chose.
  useEffect(() => {
    if (transportMode && !availableTransportModes.includes(transportMode)) {
      clearTransport();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-check when the valid set changes
  }, [availableTransportModes]);

  const onConfirm = () => navigate('/checkout/confirmation');

  return (
    <div className={styles.container}>
      <Section variant="flat" spacing="md" ariaLabel="Introduction">
        <h1 className={styles.title}>
          <Wallet size={22} strokeWidth={1.5} aria-hidden="true" />
          Mode de paiement
        </h1>
        <p className={styles.body}>
          Tous les paiements sont encaissés par M&amp;C Connect Mali. Aucun virement direct vers
          la Chine.
        </p>
      </Section>

      {/* Step 1 - Payment plan */}
      <Section variant="flat" spacing="md" ariaLabel="Formule de paiement">
        <h2 className={styles.h2}>1. Formule de paiement</h2>
        <div role="radiogroup" aria-label="Formule de paiement" className={styles.list}>
          {PAYMENT_PLANS.map((plan) => {
            const Icon = plan.icon;
            const active = paymentPlan === plan.id;
            return (
              <label key={plan.id} className={`${styles.option} ${active ? styles.optionActive : ''}`}>
                <input
                  type="radio"
                  name="payment-plan"
                  value={plan.id}
                  checked={active}
                  onChange={() => setPaymentPlan(plan.id)}
                  className={styles.radio}
                />
                <span className={styles.optionIcon}>
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className={styles.optionText}>
                  <strong>{plan.label}</strong>
                  <span className={styles.optionSub}>{plan.sub}</span>
                </span>
                {active && <CheckCircle2 size={20} strokeWidth={1.8} className={styles.check} aria-hidden="true" />}
              </label>
            );
          })}
        </div>
      </Section>

      {/* Step 2 - Transport mode (revealed once a plan is chosen). Both modes
          are always shown; one the cart can't ship by is disabled with a reason. */}
      {paymentPlan && (
        <Section variant="flat" spacing="md" ariaLabel="Mode de transport">
          <h2 className={styles.h2}>2. Mode de transport</h2>
          <div role="radiogroup" aria-label="Mode de transport" className={styles.list}>
            {transportOptions.map(({ mode, available, reason }) => {
              const Icon = TRANSPORT_ICONS[mode];
              const active = transportMode === mode;
              const costLine = mode === 'air'
                ? `Coût : 1 kg = ${AIR_RATE_XOF_PER_KG.toLocaleString('fr-FR')} FCFA`
                : 'Coût inclus dans le total affiché';
              const reasonId = `transport-${mode}-reason`;
              return (
                <label
                  key={mode}
                  className={`${styles.option} ${active ? styles.optionActive : ''} ${available ? '' : styles.optionDisabled}`}
                >
                  <input
                    type="radio"
                    name="transport-mode"
                    value={mode}
                    checked={active}
                    disabled={!available}
                    aria-describedby={available ? undefined : reasonId}
                    onChange={() => setTransportMode(mode)}
                    className={styles.radio}
                  />
                  <span className={styles.optionIcon}>
                    <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className={styles.optionText}>
                    <strong>{TRANSPORT_LABELS[mode]}</strong>
                    <span className={styles.optionSub}>Délai : {TRANSPORT_TIMING[mode]}</span>
                    <span className={styles.optionSub}>{costLine}</span>
                    {!available && (
                      <span id={reasonId} className={styles.optionReason}>{reason}</span>
                    )}
                  </span>
                  {active && <CheckCircle2 size={20} strokeWidth={1.8} className={styles.check} aria-hidden="true" />}
                </label>
              );
            })}
          </div>
          {hasNoCommonTransport && (
            <div className={styles.warning} role="alert">
              <AlertTriangle size={20} strokeWidth={1.5} aria-hidden="true" />
              <p>
                Les produits de votre panier n&apos;ont aucun mode de transport en commun.
                Retournez au panier et séparez-les en deux commandes distinctes.
              </p>
            </div>
          )}
        </Section>
      )}

      {/* Step 3 - Payment method (revealed once a transport mode is chosen) */}
      {paymentPlan && transportMode && (
        <Section variant="flat" spacing="md" ariaLabel="Moyen de paiement">
          <h2 className={styles.h2}>3. Moyen de paiement</h2>
          <div role="radiogroup" aria-label="Moyen de paiement" className={styles.list}>
            {PAYMENT_METHODS.map((m) => {
              const Icon = m.icon;
              const active = paymentMethod === m.id;
              return (
                <label key={m.id} className={`${styles.option} ${active ? styles.optionActive : ''}`}>
                  <input
                    type="radio"
                    name="payment-method"
                    value={m.id}
                    checked={active}
                    onChange={() => setPaymentMethod(m.id)}
                    className={styles.radio}
                  />
                  <span className={styles.optionIcon}>
                    <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className={styles.optionText}>
                    <strong>{m.label}</strong>
                    <span className={styles.optionSub}>{m.sub}</span>
                  </span>
                  {active && <CheckCircle2 size={20} strokeWidth={1.8} className={styles.check} aria-hidden="true" />}
                </label>
              );
            })}
          </div>
        </Section>
      )}

      <Section variant="card" spacing="md" ariaLabel="Avant le paiement">
        <h2 className={styles.h2}>
          <ShieldCheck size={18} strokeWidth={1.5} aria-hidden="true" />
          Avant le paiement
        </h2>
        <ul className={styles.noteList}>
          <li>Une facture pro forma vous sera envoyée pour validation avant encaissement.</li>
          <li>M&amp;C Connect encaisse et reverse au fournisseur après contrôle qualité.</li>
          <li>Aucun frais caché - le détail est dans la pro forma.</li>
          <li>Vous pouvez annuler sans frais avant le paiement.</li>
        </ul>
      </Section>

      <StickyActionBar>
        <Button variant="primary" size="large" block onClick={onConfirm} disabled={!isComplete}>
          Confirmer et payer
        </Button>
      </StickyActionBar>
    </div>
  );
}
