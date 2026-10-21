import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Brand } from '@/components/primitives/Brand';
import { DESKTOP_QUERY, useMediaQuery } from '@/hooks/useMediaQuery';
import { NotificationButton } from './NotificationButton';
import { CartButton } from './CartButton';
import { DeliveryContext } from './DeliveryContext';
import { DesktopNav } from './DesktopNav';
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
 *
 * Mobile/tablet: three stacked rows (brand + actions / delivery / search).
 * Desktop (>=1024px): one row (brand, delivery, search, actions) inside the
 * centered content width, followed by the horizontal section nav that
 * replaces the bottom tab bar. Same markup - the reflow is CSS grid areas.
 */
export function CommerceHeader({ compact = false, initialQuery, hideSearch = false }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const headerRef = useRef<HTMLElement>(null);
  const unread = notifications.filter((n) => !n.read).length;

  // Publish the header height so nested sticky rows (DetailLayout bare
  // header, PDP header) can sit directly under it at every breakpoint.
  useEffect(() => {
    const el = headerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const root = document.documentElement;
    const ro = new ResizeObserver(() => {
      root.style.setProperty('--commerce-header-h', `${el.offsetHeight}px`);
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.removeProperty('--commerce-header-h');
    };
  }, []);

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={`${styles.bar} ${hideSearch ? styles.noSearch : ''}`}>
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

        {!compact && !hideSearch && (
          <div className={styles.delivery}>
            <DeliveryContext destination="Bamako, Mali" compact />
          </div>
        )}

        {!hideSearch && (
          <div className={styles.search}>
            <SearchBar variant={compact ? 'compact' : 'home'} initialValue={initialQuery} />
          </div>
        )}
      </div>

      {isDesktop && (
        <div className={styles.navRow}>
          <DesktopNav currentPath={pathname} />
        </div>
      )}
    </header>
  );
}
