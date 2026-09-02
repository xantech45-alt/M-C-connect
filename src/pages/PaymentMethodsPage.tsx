import { useEffect, useState } from 'react';
import { Smartphone, Landmark } from 'lucide-react';
import { Card } from '@/components/primitives/Card';
import { Chip } from '@/components/primitives/Chip';
import { Section } from '@/components/primitives/Section';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import { useToast } from '@/components/ui/Toast';
import type { PaymentMethod } from '@/state/CheckoutProvider';
import styles from './PaymentMethodsPage.module.css';

const STORAGE_KEY = 'mc.paymentMethod';

const METHODS: { id: PaymentMethod; icon: typeof Smartphone; label: string; body: string }[] = [
  {
    id: 'wave',
    icon: Smartphone,
    label: 'Wave',
    body: 'Mobile money instantané.',
  },
  {
    id: 'orange_money',
    icon: Smartphone,
    label: 'Orange Money',
    body: 'Paiement via votre compte Orange Money.',
  },
  {
    id: 'bank',
    icon: Landmark,
    label: 'Banque',
    body: 'Virement vers le compte séquestre M&C Connect.',
  },
];

function load(): PaymentMethod {
  if (typeof window === 'undefined') return METHODS[0].id;
  try {
    return (window.localStorage.getItem(STORAGE_KEY) as PaymentMethod | null) ?? METHODS[0].id;
  } catch {
    return METHODS[0].id;
  }
}

export default function PaymentMethodsPage() {
  const toast = useToast();
  const [selected, setSelected] = useState<PaymentMethod>(load);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, selected);
    } catch {
      /* storage unavailable */
    }
  }, [selected]);

  const onSelect = (id: PaymentMethod) => {
    setSelected(id);
    toast('success', 'Moyen de paiement par défaut mis à jour');
  };

  return (
    <div className={styles.container}>
      <Section variant="flat" spacing="md" ariaLabel="Moyens de paiement">
        <SectionHeader title="Moyens de paiement" />
        <p className={styles.note}>
          Tous les paiements sont gérés et sécurisés par M&amp;C Connect - aucune information
          bancaire n&apos;est partagée avec un fournisseur.
        </p>
        <div className={styles.list} role="radiogroup" aria-label="Moyen de paiement par défaut">
          {METHODS.map((m) => {
            const Icon = m.icon;
            const active = selected === m.id;
            return (
              <Card key={m.id} elevation={active ? 'elevated' : 'flat'} className={styles.card}>
                <label className={styles.row}>
                  <input
                    type="radio"
                    name="payment-method"
                    checked={active}
                    onChange={() => onSelect(m.id)}
                  />
                  <span className={styles.icon}>
                    <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className={styles.body}>
                    <span className={styles.label}>{m.label}</span>
                    <span className={styles.desc}>{m.body}</span>
                  </span>
                  {active && <Chip tone="success" size="sm">Par défaut</Chip>}
                </label>
              </Card>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
