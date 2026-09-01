import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ChevronRight, Package } from 'lucide-react';
import { EmptyState } from '@/components/primitives/EmptyState';
import { Chip } from '@/components/primitives/Chip';
import { ChipFilterGroup } from '@/components/composite/ChipFilterGroup';
import { Section } from '@/components/primitives/Section';
import { orders, STAGE_LABELS } from '@/state/orders';
import styles from './OrdersPage.module.css';

type Tab = 'all' | 'in_progress' | 'delivered';

const TONE: Record<string, 'success' | 'info' | 'warning' | 'danger' | 'neutral'> = {
  delivered: 'success',
  shipping: 'info',
  customs: 'info',
  delivery: 'info',
  qc: 'warning',
  production: 'warning',
  sourcing: 'warning',
  awaiting_payment: 'danger',
  cancelled: 'danger',
};

const IN_PROGRESS = new Set([
  'sourcing',
  'production',
  'qc',
  'shipping',
  'customs',
  'delivery',
]);

export default function OrdersPage() {
  const [tab, setTab] = useState<Tab>('all');

  const filtered = orders.filter((o) => {
    if (tab === 'in_progress') return IN_PROGRESS.has(o.currentStage);
    if (tab === 'delivered') return o.currentStage === 'delivered';
    return true;
  });

  if (orders.length === 0) {
    return (
      <div className={styles.container}>
        <EmptyState
          title="Aucune commande"
          body="Vos commandes apparaîtront ici dès que vous passerez à l'achat."
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Section variant="flat" spacing="sm" ariaLabel="Filtres">
        <ChipFilterGroup
          ariaLabel="Statut"
          value={tab}
          onChange={setTab}
          options={[
            { value: 'all', label: `Toutes (${orders.length})` },
            { value: 'in_progress', label: 'En cours' },
            { value: 'delivered', label: 'Livrées' },
          ]}
        />
      </Section>

      <Section variant="flat" spacing="md" ariaLabel="Liste des commandes">
        {filtered.length === 0 ? (
          <EmptyState
            title="Aucune commande dans cette catégorie"
            body="Changez de filtre pour voir d'autres commandes."
          />
        ) : (
          <ul className={styles.list}>
            {filtered.map((o) => (
              <li key={o.id}>
                <Link to={`/orders/${o.id}`} className={styles.item}>
                  <div className={styles.thumb} aria-hidden="true">
                    <Package size={24} strokeWidth={1.5} />
                  </div>
                  <div className={styles.body}>
                    <div className={styles.head}>
                      <span className={styles.id}>{o.id}</span>
                      <Chip tone={TONE[o.currentStage]} size="sm">
                        {STAGE_LABELS[o.currentStage]}
                      </Chip>
                    </div>
                    <h2 className={styles.name}>{o.productTitle}</h2>
                    <div className={styles.meta}>
                      <span>Qté {o.quantity}</span>
                      <span aria-hidden="true">•</span>
                      <span>{o.totalXof.toLocaleString('fr-FR')} XOF</span>
                      <span aria-hidden="true">•</span>
                      <span>ETA {o.eta}</span>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    strokeWidth={1.5}
                    className={styles.chevron}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </div>
  );
}