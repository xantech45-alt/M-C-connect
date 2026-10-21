import { useSearchParams } from 'react-router-dom';
import { Card } from '@/components/primitives/Card';
import { products } from '@/state/catalog';
import styles from './ComparePage.module.css';

export default function ComparePage() {
  const [params] = useSearchParams();
  const ids = (params.get('ids') ?? '').split(',').filter(Boolean);
  const list = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  if (list.length === 0) {
    return <div className={styles.container}>Sélectionnez jusqu&apos;à 3 produits à comparer.</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comparer</h1>
      <div className={styles.grid}>
        {list.map((p) => p && (
          <Card key={p.id} elevation="elevated">
            <h2 className={styles.name}>{p.title}</h2>
            <p className={styles.price}>À partir de {p.priceMinXof.toLocaleString('fr-FR')} FCFA</p>
            <p className={styles.moq}>MOQ : {p.moq}</p>
            <ul className={styles.specs}>
              {p.shortSpecs.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
