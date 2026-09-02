import { Fragment, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Chip } from '@/components/primitives/Chip';
import { Card } from '@/components/primitives/Card';
import { Divider } from '@/components/primitives/Divider';
import { getProductById } from '@/state/catalog';
import { TRANSPORT_LABELS, TRANSPORT_TIMING } from '@/domain/transport';
import styles from './ProductSpecsPage.module.css';

export default function ProductSpecsPage() {
  const { id } = useParams<{ id: string }>();
  const product = useMemo(() => (id ? getProductById(id) : undefined), [id]);

  if (!product) return <div className={styles.container}>Produit introuvable.</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product.title}</h1>
      <div className={styles.chips}>
        <Chip tone="info">Code HS {product.hsCode ?? '-'}</Chip>
        <Chip tone="neutral">Origine CN</Chip>
      </div>

      <Divider />

      <h2 className={styles.section}>Caractéristiques</h2>
      <Card>
        <ul className={styles.specs}>
          {product.shortSpecs.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </Card>

      <h2 className={styles.section}>Emballage et manutention</h2>
      <Card>
        <dl className={styles.dl}>
          <dt>Carton</dt>
          <dd>Standard export 5 plis</dd>
          <dt>Marquage</dt>
          <dd>Marque client acceptée</dd>
          <dt>Documents</dt>
          <dd>Facture, packing list, certificat d&apos;origine</dd>
        </dl>
      </Card>

      <h2 className={styles.section}>Logistique</h2>
      <Card>
        <dl className={styles.dl}>
          {product.transportModes.map((mode) => (
            <Fragment key={mode}>
              <dt>{TRANSPORT_LABELS[mode]}</dt>
              <dd>{TRANSPORT_TIMING[mode]} - coordination douane par M&amp;C Connect</dd>
            </Fragment>
          ))}
        </dl>
      </Card>
    </div>
  );
}
