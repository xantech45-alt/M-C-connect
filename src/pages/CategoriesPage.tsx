import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/state/catalog';
import { IconRender } from '@/components/primitives/IconRender';
import styles from './CategoriesPage.module.css';

export default function CategoriesPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Toutes les catégories</h1>
        <p className={styles.subtitle}>
          {categories.length} catégories sourcées et vérifiées par M&amp;C Connect
        </p>
      </header>
      <div className={styles.grid}>
        {categories.map((c) => (
          <Link key={c.id} to={`/search?cat=${c.id}`} className={styles.card}>
            <span className={styles.icon}>
              <IconRender name={c.iconName} size={22} strokeWidth={1.5} />
            </span>
            <span className={styles.text}>
              <span className={styles.name}>{c.name}</span>
              <span className={styles.count}>{c.productCount} produits</span>
            </span>
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  );
}