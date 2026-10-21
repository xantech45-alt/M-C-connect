import { Link } from 'react-router-dom';
import { Brand } from '@/components/primitives/Brand';
import styles from './SiteFooter.module.css';

const COLUMNS = [
  {
    title: 'Acheter',
    links: [
      { to: '/categories', label: 'Toutes les catégories' },
      { to: '/products', label: 'Tous les produits' },
      { to: '/rfq/new', label: 'Demande sur mesure' },
      { to: '/image-search', label: 'Recherche par image' },
    ],
  },
  {
    title: 'Mon compte',
    links: [
      { to: '/orders', label: 'Mes commandes' },
      { to: '/messages', label: 'Messages' },
      { to: '/favorites', label: 'Favoris' },
      { to: '/settings', label: 'Paramètres' },
    ],
  },
  {
    title: 'Aide',
    links: [
      { to: '/help', label: "Centre d'aide" },
      { to: '/contact', label: 'Contactez-nous' },
      { to: '/about', label: 'À propos de M&C Connect' },
    ],
  },
] as const;

/**
 * Desktop-only site footer (>=1024px; mobile keeps the bottom tab bar as
 * its only chrome to save vertical space). Carries the payment-safety
 * notice (MS-TRU-01) and the demonstration-data disclosure required while
 * the app runs on fixtures with no backend.
 */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <Brand />
          <p className={styles.tagline}>
            Le sourcing géré, de l&apos;usine chinoise à votre porte au Mali. M&amp;C Connect achète,
            contrôle, expédie et livre : vous ne traitez jamais avec un fournisseur.
          </p>
          <p className={styles.safety}>
            M&amp;C Connect ne vous demandera jamais votre code secret de mobile money ou bancaire.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title} className={styles.col}>
            <h2 className={styles.colTitle}>{col.title}</h2>
            <ul className={styles.links}>
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={styles.link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className={styles.legal}>
        <p>
          Version de démonstration : produits, prix, commandes et messages sont des données fictives.
          Aucun paiement n&apos;est traité.
        </p>
        <p>© {new Date().getFullYear()} M&amp;C Connect</p>
      </div>
    </footer>
  );
}
