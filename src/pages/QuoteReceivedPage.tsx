import { useNavigate } from 'react-router-dom';
import { CheckCircle2, MessageSquare, Clock, Truck } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { Section } from '@/components/primitives/Section';
import styles from './QuoteReceivedPage.module.css';

const NEXT_STEPS = [
  {
    icon: <Clock size={18} strokeWidth={1.5} aria-hidden="true" />,
    title: 'M&C analyse votre besoin',
    body: 'Recherche fournisseur, vérification qualité, estimation délai.',
  },
  {
    icon: <MessageSquare size={18} strokeWidth={1.5} aria-hidden="true" />,
    title: 'Devis sous 24 h ouvrées',
    body: 'Reçu dans Messages, avec options de paiement et délai ferme.',
  },
  {
    icon: <Truck size={18} strokeWidth={1.5} aria-hidden="true" />,
    title: 'Production + expédition',
    body: 'Sur validation de la pro forma - fret et douane coordonnés par M&C.',
  },
];

export default function QuoteReceivedPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <Section variant="flat" spacing="md" ariaLabel="Confirmation">
        <div className={styles.head}>
          <CheckCircle2 size={56} strokeWidth={1.5} className={styles.icon} aria-hidden="true" />
          <h1 className={styles.title}>Demande reçue</h1>
          <p className={styles.body}>
            M&amp;C Connect prépare votre devis. Vous recevrez une notification et un récapitulatif
            dans vos messages.
          </p>
        </div>
      </Section>

      <Section variant="card" spacing="md" ariaLabel="Prochaines étapes">
        <h2 className={styles.h2}>Prochaines étapes</h2>
        <ol className={styles.steps}>
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
        </ol>
      </Section>

      <Section variant="card" spacing="sm" ariaLabel="Récapitulatif">
        <p className={styles.next}>
          <strong>Numéro de demande :</strong> RFQ-2024-0083
        </p>
        <p className={styles.next}>
          Paiement uniquement après validation de la facture pro forma. Aucun frais caché.
        </p>
      </Section>

      <div className={styles.actions}>
        <Button block variant="primary" size="large" onClick={() => navigate('/messages')}>
          Aller à mes messages
        </Button>
        <Button block variant="tertiary" size="large" onClick={() => navigate('/orders')}>
          Voir mes commandes
        </Button>
      </div>
    </div>
  );
}