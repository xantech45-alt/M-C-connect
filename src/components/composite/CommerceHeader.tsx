import { useNavigate } from 'react-router-dom';
import { Brand } from '@/components/primitives/Brand';
import { NotificationButton } from './NotificationButton';
import { CartButton } from './CartButton';
import { DeliveryContext } from './DeliveryContext';
import { SearchBar } from './SearchBar';
import { UserChip } from './UserChip';
import { notifications } from '@/state/notifications';
import styles from './CommerceHeader.module.css';

interface Props {
  /** Scrolled state shrinks the header to its compact search-only form. */
  compact?: boolean;
  /** Pre-fill the search bar (e.g. on search results). */
  initialQuery?: string;
  /**
   * Hide the delivery-context and search-bar rows entirely. Used on the
   * dedicated active-search screen, which renders its own larger search
   * bar (with suggestions/recents/camera) - showing both would duplicate
   * the input.
   */
  hideSearch?: boolean;
}

/**
 * Global commerce header. Hosts the M&C mark, the signed-in user chip,
 * delivery context, prominent search bar, notification and cart affordances.
 * Becomes the persistent top navigation for tab screens.
 */
export function CommerceHeader({ compact = false, initialQuery, hideSearch = false }: Props) {
  const navigate = useNavigate();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className={styles.header}>
      <div className={`${styles.row} ${styles.rowTop}`}>
        <button
          type="button"
          className={styles.brandBtn}
          onClick={() => navigate('/home')}
          aria-label="Accueil - M&amp;C Connect"
        >
          <Brand />
        </button>
        <div className={styles.userArea}>
          <UserChip />
        </div>
        <div className={styles.actions}>
          <NotificationButton unread={unread} />
          <CartButton />
        </div>
      </div>

      {!compact && !hideSearch && (
        <div className={styles.row}>
          <DeliveryContext destination="Bamako, Mali" compact />
        </div>
      )}

      {!hideSearch && (
        <div className={styles.row}>
          <SearchBar variant={compact ? 'compact' : 'home'} initialValue={initialQuery} />
        </div>
      )}
    </header>
  );
}
