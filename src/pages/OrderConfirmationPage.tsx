import { useNavigate } from 'react-router-dom';
import { CheckCircle2, MessageSquare, ListOrdered, Truck } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { Section } from '@/components/primitives/Section';
import styles from './OrderConfirmationPage.module.css';

const NEXT_STEPS = [
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
    title: 'Livraison Bamako 30–45 j',
    body: 'Coordination douane + transport local par M&C Connect.',
  },
];

export default function OrderConfirmationPage() {
  const navigate = useNavigate();
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
          <h1 className={styles.title}>Commande confirmée</h1>
          <p className={styles.body}>
            M&amp;C Connect a confirmé votre commande <strong>CMD-2024-0142</strong>. Vous pouvez
            suivre son avancement depuis l&apos;onglet Commandes.
          </p>
        </div>
      </Section>

      <Section variant="card" spacing="md" ariaLabel="Prochaines étapes">
        <h2 className={styles.h2}>Prochaines étapes</h2>
        <ul className={styles.steps}>
          {NEXT_STEPS.map((step, i) => (
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