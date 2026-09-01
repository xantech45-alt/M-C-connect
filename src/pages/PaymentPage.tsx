import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Wallet, Banknote, Smartphone, Building2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { Section } from '@/components/primitives/Section';
import { StickyActionBar } from '@/components/composite/StickyActionBar';
import styles from './PaymentPage.module.css';

const METHODS = [
  { id: 'cod', label: 'Paiement à la livraison (Bamako)', sub: 'Wave / espèces / virement à la réception', icon: Banknote },
  { id: 'wave', label: 'Wave Mali', sub: 'Mobile money instantané', icon: Smartphone },
  { id: 'orange', label: 'Orange Money', sub: 'Mobile money', icon: Smartphone },
  { id: 'bank', label: 'Virement bancaire BCEAO', sub: 'Sur facture pro forma', icon: Building2 },
] as const;

type MethodId = typeof METHODS[number]['id'];

export default function PaymentPage() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<MethodId>('cod');

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

      <Section variant="flat" spacing="md" ariaLabel="Méthodes">
        <div role="radiogroup" aria-label="Mode de paiement" className={styles.list}>
          {METHODS.map((m) => {
            const Icon = m.icon;
            return (
              <label
                key={m.id}
                className={`${styles.option} ${method === m.id ? styles.optionActive : ''}`}
              >
                <input
                  type="radio"
                  name="method"
                  value={m.id}
                  checked={method === m.id}
                  onChange={() => setMethod(m.id)}
                  className={styles.radio}
                />
                <span className={styles.optionIcon}>
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className={styles.optionText}>
                  <strong>{m.label}</strong>
                  <span className={styles.optionSub}>{m.sub}</span>
                </span>
                {method === m.id && (
                  <CheckCircle2
                    size={20}
                    strokeWidth={1.8}
                    className={styles.check}
                    aria-hidden="true"
                  />
                )}
              </label>
            );
          })}
        </div>
      </Section>

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
        <Button variant="primary" size="large" block onClick={onConfirm}>
          Confirmer et payer
        </Button>
      </StickyActionBar>
    </div>
  );
}