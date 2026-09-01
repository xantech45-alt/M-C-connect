import { Link } from 'react-router-dom';
import { Undo2 } from 'lucide-react';
import { Card } from '@/components/primitives/Card';
import { Chip } from '@/components/primitives/Chip';
import { EmptyState } from '@/components/primitives/EmptyState';
import { Section } from '@/components/primitives/Section';
import { returns, RETURN_STATUS_LABELS, type ReturnStatus } from '@/state/returns';
import styles from './ReturnsPage.module.css';

const TONE: Record<ReturnStatus, 'warning' | 'info' | 'success' | 'danger'> = {
  requested: 'warning',
  approved: 'info',
  refunded: 'success',
  rejected: 'danger',
};

export default function ReturnsPage() {
  if (returns.length === 0) {
    return (
      <div className={styles.container}>
        <EmptyState
          icon={<Undo2 size={56} strokeWidth={1.5} />}
          title="Aucun retour en cours"
          body="Vos demandes de retour et de remboursement apparaîtront ici."
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Section variant="flat" spacing="md" ariaLabel="Retours et remboursements">
        <div className={styles.list}>
          {returns.map((r) => (
            <Card key={r.id} className={styles.card}>
              <div className={styles.head}>
                <span className={styles.orderId}>{r.orderId}</span>
                <Chip tone={TONE[r.status]} size="sm">
                  {RETURN_STATUS_LABELS[r.status]}
                </Chip>
              </div>
              <p className={styles.product}>{r.productTitle}</p>
              <p className={styles.reason}>Motif : {r.reason}</p>
              <div className={styles.footer}>
                <span className={styles.date}>Demandé le {new Date(r.requestedAt).toLocaleDateString('fr-FR')}</span>
                <Link to={`/orders/${r.orderId}`} className={styles.link}>
                  Voir la commande
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
