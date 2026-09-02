import { useNavigate } from 'react-router-dom';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { Card } from '@/components/primitives/Card';
import { Button } from '@/components/primitives/Button';
import { Section } from '@/components/primitives/Section';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import styles from './HelpPage.module.css';

const FAQ = [
  {
    q: 'Comment fonctionne le sourcing M&C Connect ?',
    a: "Vous choisissez le produit qui vous intéresse ; M&C Connect s'occupe de la vérification du fournisseur, du contrôle qualité, du fret et de la douane jusqu'à votre porte à Bamako.",
  },
  {
    q: 'Puis-je contacter directement le fournisseur ?',
    a: 'Non. Toute la communication passe par M&C Connect afin de garantir la qualité, la sécurité des paiements et le suivi de votre commande.',
  },
  {
    q: 'Quels sont les délais de livraison habituels ?',
    a: 'Le délai dépend du mode de transport choisi à la commande : 2 semaines à 1 mois par avion, ou 3 à 4 mois par bateau. Le mode disponible dépend du produit.',
  },
  {
    q: 'Comment est calculé le coût total ?',
    a: "M&C Connect calcule pour vous le prix produit, le fret international, les droits de douane et la livraison finale, et affiche un coût total unique pour chaque produit avant commande.",
  },
  {
    q: 'Que se passe-t-il si un produit ne passe pas le contrôle qualité ?',
    a: "M&C Connect bloque l'expédition avant qu'elle ne quitte la Chine, vous en informe avec le rapport de contrôle qualité, et coordonne une correction avec le fournisseur.",
  },
  {
    q: 'Quels moyens de paiement sont acceptés ?',
    a: 'Wave, Orange Money ou virement bancaire - tous gérés et sécurisés par M&C Connect. Vous choisissez aussi entre un paiement en une fois ou 60% à la commande avec le solde à la livraison.',
  },
];

export default function HelpPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <Section variant="flat" spacing="md" ariaLabel="Centre d'aide">
        <SectionHeader title="Questions fréquentes" />
        <Card className={styles.faqCard}>
          {FAQ.map((item, i) => (
            <details key={item.q} className={styles.item}>
              {i > 0 && <div className={styles.divider} aria-hidden="true" />}
              <summary className={styles.summary}>
                <span>{item.q}</span>
                <ChevronDown size={18} strokeWidth={1.5} className={styles.chevron} aria-hidden="true" />
              </summary>
              <p className={styles.answer}>{item.a}</p>
            </details>
          ))}
        </Card>
      </Section>

      <Section variant="card" spacing="md" ariaLabel="Contact">
        <div className={styles.contactBlock}>
          <span className={styles.contactIcon}>
            <MessageCircle size={22} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <div>
            <h2 className={styles.contactTitle}>Vous ne trouvez pas de réponse ?</h2>
            <p className={styles.contactBody}>Notre équipe support répond en français, du lundi au samedi.</p>
          </div>
        </div>
        <Button variant="primary" size="large" block onClick={() => navigate('/contact')}>
          Contactez-nous
        </Button>
      </Section>
    </div>
  );
}
