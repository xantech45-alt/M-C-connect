import { useState } from 'react';
import { Ticket } from 'lucide-react';
import { Card } from '@/components/primitives/Card';
import { Chip } from '@/components/primitives/Chip';
import { EmptyState } from '@/components/primitives/EmptyState';
import { Section } from '@/components/primitives/Section';
import { ChipFilterGroup } from '@/components/composite/ChipFilterGroup';
import { coupons, type CouponStatus } from '@/state/coupons';
import styles from './CouponsPage.module.css';

const TABS: { value: CouponStatus; label: string }[] = [
  { value: 'active', label: 'Actifs' },
  { value: 'used', label: 'Utilisés' },
  { value: 'expired', label: 'Expirés' },
];

const TONE: Record<CouponStatus, 'success' | 'neutral' | 'danger'> = {
  active: 'success',
  used: 'neutral',
  expired: 'danger',
};

export default function CouponsPage() {
  const [tab, setTab] = useState<CouponStatus>('active');
  const filtered = coupons.filter((c) => c.status === tab);

  return (
    <div className={styles.container}>
      <Section variant="flat" spacing="sm" ariaLabel="Filtres">
        <ChipFilterGroup ariaLabel="Statut du coupon" value={tab} onChange={setTab} options={TABS} />
      </Section>

      <Section variant="flat" spacing="md" ariaLabel="Liste des coupons">
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Ticket size={56} strokeWidth={1.5} />}
            title="Aucun coupon dans cette catégorie"
            body="Revenez plus tard pour de nouvelles offres M&C Connect."
          />
        ) : (
          <div className={styles.list}>
            {filtered.map((c) => (
              <Card key={c.id} className={styles.card}>
                <div className={styles.head}>
                  <span className={styles.discount}>{c.discountLabel}</span>
                  <Chip tone={TONE[c.status]} size="sm">
                    {TABS.find((t) => t.value === c.status)?.label}
                  </Chip>
                </div>
                <p className={styles.title}>{c.title}</p>
                <div className={styles.footer}>
                  <span className={styles.code}>{c.code}</span>
                  <span className={styles.expiry}>
                    {c.status === 'active' ? "Valable jusqu'au" : c.status === 'used' ? 'Utilisé le' : 'Expiré le'}{' '}
                    {new Date(c.expiresAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                {c.minOrderXof && (
                  <p className={styles.minOrder}>Dès {c.minOrderXof.toLocaleString('fr-FR')} XOF d&apos;achat</p>
                )}
              </Card>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
