import { useNavigate } from 'react-router-dom';
import { CheckCircle2, MessageSquare, ListOrdered, Truck } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { Section } from '@/components/primitives/Section';
import { useCheckout } from '@/state/CheckoutProvider';
import { TRANSPORT_LABELS, TRANSPORT_TIMING } from '@/domain/transport';
import styles from './OrderConfirmationPage.module.css';

const PAYMENT_PLAN_LABELS: Record<string, string> = {
  delivery_60: 'Paiement à la livraison (60% réglé à la commande)',
  upfront_100: 'Paiement unique (100% réglé à la commande)',
};

export default function OrderConfirmationPage() {
  const navigate = useNavigate();
  const { transportMode, paymentPlan } = useCheckout();

  const deliveryBody = transportMode
    ? `${TRANSPORT_LABELS[transportMode]} - ${TRANSPORT_TIMING[transportMode]}, coordination douane et transport local par M&C Connect.`
    : 'Coordination douane + transport local par M&C Connect.';

  const nextSteps = [
    {
      icon: <ListOrdered size={18} strokeWidth={1.5} aria-hidden="true" />,
      title: 'Suivi en temps réel',
      body: 'Statut mis à jour à chaque étape (sourcing, QC, fret, douane, livraison).',
    },
    {
      icon: <MessageSquare size={18} strokeWidth={1.5} aria-hidden="true" />,
      title: 'Un seul interlocuteur M&C',
      body: 'Toutes les communications centralisées dans Messages.',
    },
    {
      icon: <Truck size={18} strokeWidth={1.5} aria-hidden="true" />,
      title: 'Livraison Bamako',
      body: deliveryBody,
    },
  ];

  return (
    <div className={styles.container}>
      <Section variant="flat" spacing="md" ariaLabel="Confirmation">
        <div className={styles.head}>
          <CheckCircle2
            size={56}
            strokeWidth={1.5}
            className={styles.icon}
            aria-hidden="true"
          />
          <h1 className={styles.title}>Commande enregistrée</h1>
          {/* Master Spec 4.2/INV-2: after the customer pays outside the app the order
              is PAYMENT_VERIFYING, never "confirmed"; nothing is bought before that. */}
          <p className={styles.body}>
            Paiement en cours de vérification, réponse sous 2 h. M&amp;C Connect n&apos;achète vos
            articles qu&apos;après confirmation de votre paiement. Suivez l&apos;avancement depuis
            l&apos;onglet Commandes.
          </p>
          {paymentPlan && (
            <p className={styles.body}>{PAYMENT_PLAN_LABELS[paymentPlan]}</p>
          )}
        </div>
      </Section>

      <Section variant="card" spacing="md" ariaLabel="Prochaines étapes">
        <h2 className={styles.h2}>Prochaines étapes</h2>
        <ul className={styles.steps}>
          {nextSteps.map((step, i) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.stepNum}>{i + 1}</span>
              <span className={styles.stepIcon}>{step.icon}</span>
              <div>
                <strong>{step.title}</strong>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <div className={styles.actions}>
        <Button variant="primary" size="large" block onClick={() => navigate('/orders')}>
          Voir mes commandes
        </Button>
        <Button variant="tertiary" size="large" block onClick={() => navigate('/messages')}>
          Aller à mes messages
        </Button>
      </div>
    </div>
  );
}
