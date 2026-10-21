import { Link } from 'react-router-dom';
import { Plus, MapPin, Pencil, Trash2, Truck, Zap } from 'lucide-react';
import { Card } from '@/components/primitives/Card';
import { Chip } from '@/components/primitives/Chip';
import { Section } from '@/components/primitives/Section';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import { EmptyState } from '@/components/primitives/EmptyState';
import { useAddresses } from '@/state/AddressesProvider';
import styles from './AddressesPage.module.css';

export default function AddressesPage() {
  const { addresses, setDefault, removeAddress } = useAddresses();

  const onDelete = (id: string, label: string) => {
    if (window.confirm(`Supprimer l'adresse « ${label} » ?`)) {
      removeAddress(id);
    }
  };

  return (
    <div className={styles.container}>
      <Section variant="flat" spacing="md" ariaLabel="Mes adresses">
        <SectionHeader
          title="Mes adresses"
          trailing={
            <Link to="/addresses/new" className={styles.addLink}>
              <Plus size={16} strokeWidth={2} aria-hidden="true" />
              Ajouter
            </Link>
          }
        />

        {addresses.length === 0 ? (
          <EmptyState
            icon={<MapPin size={56} strokeWidth={1.5} />}
            title="Aucune adresse enregistrée"
            body="Ajoutez une adresse pour accélérer vos prochaines commandes."
          />
        ) : (
          <div className={styles.list} role="radiogroup" aria-label="Adresse par défaut">
            {addresses.map((a) => (
              <Card key={a.id} className={styles.card}>
                <label className={styles.cardHead}>
                  <input
                    type="radio"
                    name="default-address"
                    checked={a.isDefault}
                    onChange={() => setDefault(a.id)}
                    aria-label={`Définir « ${a.label} » comme adresse par défaut`}
                  />
                  <span className={styles.cardLabel}>{a.label}</span>
                  {a.isDefault && <Chip tone="success" size="sm">Par défaut</Chip>}
                </label>
                <p className={styles.cardLine}>{a.recipientName} · {a.phone}</p>
                <p className={styles.cardLine}>{a.quartier}, {a.region}</p>
                {a.repere && <p className={styles.cardMuted}>Repère : {a.repere}</p>}
                <div className={styles.cardActions}>
                  <Link to={`/addresses/${a.id}/edit`} className={styles.actionBtn}>
                    <Pencil size={14} strokeWidth={1.5} aria-hidden="true" />
                    Modifier
                  </Link>
                  <button type="button" className={styles.actionBtnDanger} onClick={() => onDelete(a.id, a.label)}>
                    <Trash2 size={14} strokeWidth={1.5} aria-hidden="true" />
                    Supprimer
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Section>

      <Section variant="flat" spacing="md" ariaLabel="Options de livraison">
        <SectionHeader title="Options de livraison" />
        <Card className={styles.deliveryCard}>
          <div className={styles.deliveryRow}>
            <span className={styles.deliveryIcon}>
              <Truck size={18} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className={styles.deliveryBody}>
              <span className={styles.deliveryLabel}>Standard - 2 à 5 jours</span>
              <span className={styles.deliveryPrice}>Gratuite</span>
            </span>
          </div>
          <div className={styles.deliveryRow}>
            <span className={styles.deliveryIcon}>
              <Zap size={18} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className={styles.deliveryBody}>
              <span className={styles.deliveryLabel}>Express - 1 à 2 jours</span>
              <span className={styles.deliveryPrice}>5 000 FCFA</span>
            </span>
          </div>
        </Card>
      </Section>
    </div>
  );
}
