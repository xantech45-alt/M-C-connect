import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Brand } from '@/components/primitives/Brand';
import { CartButton } from './CartButton';
import styles from './DetailCommerceHeader.module.css';

interface Props {
  title?: string;
  /** Hide the brand (full-screen capture flows). */
  hideBrand?: boolean;
  /** Replace default back with a brand-leading home link. */
  asHomeLink?: boolean;
}

/**
 * Detail-page header. Back button + page title + persistent cart affordance.
 * Used for product detail, specs, landed cost, cart, checkout, tracking, QC.
 */
export function DetailCommerceHeader({ title, hideBrand = false, asHomeLink = false }: Props) {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      {asHomeLink ? (
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigate('/home')}
          aria-label="Retour à l'accueil"
        >
          {hideBrand ? <ChevronLeft size={24} strokeWidth={1.5} /> : <Brand />}
        </button>
      ) : (
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigate(-1)}
          aria-label="Retour"
        >
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>
      )}
      <h1 className={styles.title}>{title ?? ''}</h1>
      <div className={styles.spacer} />
      <CartButton />
    </header>
  );
}
