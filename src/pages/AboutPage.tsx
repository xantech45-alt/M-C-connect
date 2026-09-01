import { ShieldCheck, Truck, FileText, Layers } from 'lucide-react';
import { Card } from '@/components/primitives/Card';
import { Section } from '@/components/primitives/Section';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import { Brand } from '@/components/primitives/Brand';
import styles from './AboutPage.module.css';

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'M&C Verification',
    body: 'Chaque fournisseur est audité sur site avant référencement.',
  },
  {
    icon: Layers,
    title: 'M&C Quality Control',
    body: "Inspection systématique avant expédition - vous ne payez jamais un lot non contrôlé.",
  },
  {
    icon: Truck,
    title: 'M&C Logistics',
    body: 'Fret maritime, dédouanement et livraison jusqu’à Bamako, de bout en bout.',
  },
  {
    icon: FileText,
    title: 'M&C Support',
    body: 'Un seul interlocuteur, en français, du premier contact à la livraison.',
  },
];

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <Brand variant="full" />
        <p className={styles.tagline}>
          Vous choisissez ce dont vous avez besoin ; M&amp;C Connect s&apos;occupe du reste.
        </p>
      </div>

      <Section variant="flat" spacing="md" ariaLabel="Notre modèle">
        <SectionHeader title="Notre modèle" />
        <Card className={styles.textCard}>
          <p className={styles.paragraph}>
            M&amp;C Connect est une plateforme de sourcing géré : vous choisissez un produit, et
            nous gérons tout le reste - vérification du fournisseur, contrôle qualité, fret,
            douane et livraison jusqu&apos;à votre porte au Mali.
          </p>
          <p className={styles.paragraph}>
            La plateforme ne crée jamais de relation directe entre vous et un fournisseur chinois.
            Toute la communication, tout le paiement et tout le suivi passent par M&amp;C Connect,
            afin que chaque commande reste protégée du premier contact jusqu&apos;à la livraison.
          </p>
        </Card>
      </Section>

      <Section variant="flat" spacing="md" ariaLabel="Ce que nous garantissons">
        <SectionHeader title="Ce que nous garantissons" />
        <div className={styles.pillars}>
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <Card key={p.title} className={styles.pillar}>
                <span className={styles.pillarIcon}>
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h2 className={styles.pillarTitle}>{p.title}</h2>
                <p className={styles.pillarBody}>{p.body}</p>
              </Card>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
