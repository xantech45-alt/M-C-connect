import { Link, useParams } from 'react-router-dom';
import { ShieldCheck, AlertTriangle, Camera, CheckCircle2, Clock } from 'lucide-react';
import { Card } from '@/components/primitives/Card';
import { Chip } from '@/components/primitives/Chip';
import { Section } from '@/components/primitives/Section';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import styles from './QualityControlPage.module.css';

interface QcItem {
  id: string;
  label: string;
  status: 'pass' | 'warn' | 'pending';
  detail?: string;
}

const MOCK_QC: QcItem[] = [
  { id: '1', label: 'Correspondance produit / échantillon', status: 'pass' },
  { id: '2', label: 'Quantité (qty check)', status: 'pass' },
  { id: '3', label: 'Test fonctionnel', status: 'pass' },
  {
    id: '4',
    label: 'Emballage et marquage',
    status: 'warn',
    detail: 'Marquage client demandé ; en cours de finalisation fournisseur',
  },
  { id: '5', label: 'Photo avant expédition', status: 'pending' },
];

export default function QualityControlPage() {
  const { id } = useParams<{ id: string }>();
  const passed = MOCK_QC.filter((i) => i.status === 'pass').length;
  const total = MOCK_QC.length;

  return (
    <div className={styles.container}>
      <Section variant="card" spacing="md" ariaLabel="En-tête QC">
        <div className={styles.head}>
          <span className={styles.icon} aria-hidden="true">
            <ShieldCheck size={28} strokeWidth={1.5} />
          </span>
          <div>
            <h1 className={styles.title}>Contrôle qualité</h1>
            <p className={styles.subtitle}>Commande {id}</p>
          </div>
        </div>
      </Section>

      <Section variant="card" spacing="md" ariaLabel="Statut QC">
        <div className={styles.summary}>
          <div>
            <p className={styles.summaryLabel}>Statut global</p>
            <p className={styles.summaryValue}>
              {passed} / {total} contrôles validés
            </p>
          </div>
          <Chip tone={passed === total ? 'success' : 'warning'}>
            {passed === total ? 'QC conforme' : 'QC en cours'}
          </Chip>
        </div>
        <p className={styles.summaryNote}>
          Inspection réalisée par M&amp;C Connect sur le site fournisseur avant expédition
          maritime. Photos et procès-verbal transmis au client.
        </p>
      </Section>

      <Section variant="flat" spacing="md" ariaLabel="Checklist">
        <SectionHeader title="Checklist d'inspection" />
        <ul className={styles.list}>
          {MOCK_QC.map((item) => (
            <li key={item.id}>
              <Card>
                <div className={styles.row}>
                  <div className={styles.rowLeft}>
                    <span className={styles.statusIcon}>
                      {item.status === 'pass' && (
                        <CheckCircle2 size={20} strokeWidth={1.8} aria-hidden="true" />
                      )}
                      {item.status === 'warn' && (
                        <AlertTriangle size={20} strokeWidth={1.8} aria-hidden="true" />
                      )}
                      {item.status === 'pending' && (
                        <Clock size={20} strokeWidth={1.5} aria-hidden="true" />
                      )}
                    </span>
                    <span className={styles.label}>{item.label}</span>
                  </div>
                  {item.status === 'pass' && <Chip tone="success">OK</Chip>}
                  {item.status === 'warn' && <Chip tone="warning">À compléter</Chip>}
                  {item.status === 'pending' && <Chip tone="neutral">À venir</Chip>}
                </div>
                {item.detail && <p className={styles.detail}>{item.detail}</p>}
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section variant="card" spacing="md" ariaLabel="Photos">
        <SectionHeader title="Photos d'inspection" />
        <div className={styles.photos}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.photo} aria-label={`Photo ${i}`}>
              <Camera size={20} strokeWidth={1.5} aria-hidden="true" />
            </div>
          ))}
        </div>
        <p className={styles.photosNote}>3 photos envoyées · Visuel disponible sur demande</p>
      </Section>

      <Card>
        <p className={styles.note}>
          <AlertTriangle size={14} strokeWidth={1.5} aria-hidden="true" />
          Toute non-conformité bloque l&apos;expédition jusqu&apos;à correction ou remplacement, à la
          charge du fournisseur.
        </p>
      </Card>

      <div className={styles.actions}>
        <Link to={`/orders/${id}`} className={styles.secondary}>
          Retour au suivi de commande
        </Link>
      </div>
    </div>
  );
}