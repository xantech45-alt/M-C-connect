import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle2, Circle, Clock, Truck, ShieldCheck, MapPin } from 'lucide-react';
import { Chip } from '@/components/primitives/Chip';
import { Divider } from '@/components/primitives/Divider';
import { Section } from '@/components/primitives/Section';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import { Button } from '@/components/primitives/Button';
import { getOrderById, STAGE_LABELS, type OrderStage } from '@/state/orders';
import styles from './OrderTrackingPage.module.css';

const STAGES: OrderStage[] = [
  'awaiting_payment',
  'sourcing',
  'production',
  'qc',
  'shipping',
  'customs',
  'delivery',
  'delivered',
];

const STAGE_ICON: Record<OrderStage, React.ReactNode> = {
  awaiting_payment: <Clock size={18} strokeWidth={1.5} aria-hidden="true" />,
  sourcing: <MapPin size={18} strokeWidth={1.5} aria-hidden="true" />,
  production: <Clock size={18} strokeWidth={1.5} aria-hidden="true" />,
  qc: <ShieldCheck size={18} strokeWidth={1.5} aria-hidden="true" />,
  shipping: <Truck size={18} strokeWidth={1.5} aria-hidden="true" />,
  customs: <ShieldCheck size={18} strokeWidth={1.5} aria-hidden="true" />,
  delivery: <Truck size={18} strokeWidth={1.5} aria-hidden="true" />,
  delivered: <CheckCircle2 size={18} strokeWidth={1.5} aria-hidden="true" />,
  cancelled: <Circle size={18} strokeWidth={1.5} aria-hidden="true" />,
};

export default function OrderTrackingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const order = id ? getOrderById(id) : undefined;

  if (!order) return <div className={styles.container}>Commande introuvable.</div>;

  const currentIdx = STAGES.indexOf(order.currentStage);

  return (
    <div className={styles.container}>
      <Section variant="card" spacing="md" ariaLabel="En-tête commande">
        <p className={styles.id}>Commande {order.id}</p>
        <h1 className={styles.title}>{order.productTitle}</h1>
        <div className={styles.chips}>
          <Chip tone="info">ETA {order.eta}</Chip>
          <Chip tone="neutral">
            {order.quantity} unités · {order.totalXof.toLocaleString('fr-FR')} XOF
          </Chip>
        </div>
      </Section>

      <Section variant="flat" spacing="md" ariaLabel="Avancement">
        <SectionHeader title="Avancement" />
        <ol className={styles.stages}>
          {STAGES.map((s, idx) => {
            const reached = idx <= currentIdx;
            const isCurrent = idx === currentIdx;
            return (
              <li
                key={s}
                className={`${styles.stage} ${reached ? styles.reached : ''} ${
                  isCurrent ? styles.current : ''
                }`}
              >
                <span className={styles.bullet} aria-hidden="true">
                  {reached ? (
                    <CheckCircle2 size={20} strokeWidth={1.8} />
                  ) : (
                    <Circle size={20} strokeWidth={1.5} />
                  )}
                </span>
                <span className={styles.stageIcon} aria-hidden="true">
                  {STAGE_ICON[s]}
                </span>
                <div className={styles.stageBody}>
                  <span className={styles.stageLabel}>{STAGE_LABELS[s]}</span>
                  {isCurrent && <span className={styles.currentTag}>En cours</span>}
                </div>
              </li>
            );
          })}
        </ol>
      </Section>

      <Section variant="card" spacing="md" ariaLabel="Historique">
        <SectionHeader title="Historique" />
        <ul className={styles.timeline}>
          {order.events.map((e, idx) => (
            <li key={idx} className={styles.event}>
              <time className={styles.date}>{e.date}</time>
              <span className={styles.eventDesc}>{e.description}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section variant="card" spacing="md" ariaLabel="Actions">
        <p className={styles.note}>
          M&amp;C Connect suit votre commande de bout en bout. Pour toute question, ouvrez une
          conversation depuis l&apos;onglet Messages.
        </p>
        <Divider spacing="sm" />
        <div className={styles.actions}>
          {order.currentStage === 'qc' && (
            <Button variant="primary" size="large" block onClick={() => navigate(`/orders/${order.id}/qc`)}>
              Voir le contrôle qualité
            </Button>
          )}
          <Button variant="tertiary" size="large" block onClick={() => navigate('/messages')}>
            Contacter M&amp;C
          </Button>
        </div>
      </Section>
    </div>
  );
}