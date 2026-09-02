import { useState } from 'react';
import { Truck, Sparkles, Bell, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/primitives/Card';
import { Section } from '@/components/primitives/Section';
import { ChipFilterGroup } from '@/components/composite/ChipFilterGroup';
import { EmptyState } from '@/components/primitives/EmptyState';
import { notifications, type NotificationCategory } from '@/state/notifications';
import styles from './NotificationsPage.module.css';

type Tab = 'all' | NotificationCategory;

const TABS: { value: Tab; label: string }[] = [
  { value: 'all', label: 'Toutes' },
  { value: 'order', label: 'Commandes' },
  { value: 'promo', label: 'Promotions' },
  { value: 'system', label: 'Système' },
];

const CATEGORY_META: Record<NotificationCategory, { icon: typeof Truck; className: string }> = {
  order: { icon: Truck, className: 'iconOrder' },
  promo: { icon: Sparkles, className: 'iconPromo' },
  system: { icon: Bell, className: 'iconSystem' },
};

function formatRelative(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = d.toDateString() === yesterday.toDateString();
  if (isToday) return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  if (isYesterday) return 'Hier';
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

export default function NotificationsPage() {
  const [tab, setTab] = useState<Tab>('all');
  const filtered = tab === 'all' ? notifications : notifications.filter((n) => n.category === tab);

  return (
    <div className={styles.container}>
      <Section variant="flat" spacing="sm" ariaLabel="Filtres">
        <ChipFilterGroup ariaLabel="Type de notification" value={tab} onChange={setTab} options={TABS} />
      </Section>

      <Section variant="flat" spacing="md" ariaLabel="Liste des notifications">
        {filtered.length === 0 ? (
          <EmptyState icon={<Bell size={56} strokeWidth={1.5} />} title="Aucune notification" body="Revenez plus tard." />
        ) : (
          <ul className={styles.list}>
            {filtered.map((n) => {
              const meta = CATEGORY_META[n.category];
              const Icon = meta.icon;
              return (
                <li key={n.id} className={`${styles.item} ${!n.read ? styles.unread : ''}`}>
                  <span className={`${styles.iconChip} ${styles[meta.className]}`}>
                    <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <div className={styles.body}>
                    <div className={styles.head}>
                      <h2 className={styles.title}>{n.title}</h2>
                      <span className={styles.time}>{formatRelative(n.sentAt)}</span>
                    </div>
                    <p className={styles.text}>{n.body}</p>
                  </div>
                  {!n.read && <span className={styles.dot} role="img" aria-label="Non lu" />}
                </li>
              );
            })}
          </ul>
        )}
      </Section>

      <Card className={styles.protectionCard}>
        <span className={styles.protectionIcon} aria-hidden="true">
          <ShieldCheck size={20} strokeWidth={1.5} />
        </span>
        <div>
          <h2 className={styles.protectionTitle}>Protection acheteur</h2>
          <p className={styles.protectionBody}>
            Chaque commande est couverte par M&amp;C Connect, du contrôle qualité avant expédition
            jusqu&apos;à la livraison à Bamako.
          </p>
        </div>
      </Card>
    </div>
  );
}
