import { Link } from 'react-router-dom';
import { categories } from '@/state/catalog';
import { IconRender } from '@/components/primitives/IconRender';
import { Image } from '@/components/primitives/Image';
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
          <Link key={c.id} to={`/search/results?cat=${c.id}`} className={styles.card}>
            <Image
              src={c.imageUrl}
              alt=""
              width={72}
              height={72}
              ratio="1/1"
              loading="lazy"
              className={styles.image}
              fallbackIcon={<IconRender name={c.iconName} size={24} strokeWidth={1.5} />}
            />
            <span className={styles.text}>
              <span className={styles.name}>{c.name}</span>
              <span className={styles.count}>{c.productCount} produits</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
