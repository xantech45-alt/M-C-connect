import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Card } from '@/components/primitives/Card';
import { EmptyState } from '@/components/primitives/EmptyState';
import { Section } from '@/components/primitives/Section';
import { StarRating } from '@/components/composite/StarRating';
import { reviews } from '@/state/reviews';
import styles from './ReviewsPage.module.css';

export default function ReviewsPage() {
  if (reviews.length === 0) {
    return (
      <div className={styles.container}>
        <EmptyState
          icon={<Star size={56} strokeWidth={1.5} />}
          title="Aucun avis pour le moment"
          body="Vos avis sur les produits achetés apparaîtront ici."
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Section variant="flat" spacing="md" ariaLabel="Mes avis">
        <div className={styles.list}>
          {reviews.map((r) => (
            <Card key={r.id} className={styles.card}>
              <div className={styles.head}>
                <Link to={`/product/${r.productId}`} className={styles.productTitle}>
                  {r.productTitle}
                </Link>
                <StarRating rating={r.rating} showValue={false} />
              </div>
              <p className={styles.comment}>{r.comment}</p>
              <p className={styles.date}>{new Date(r.date).toLocaleDateString('fr-FR')}</p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
