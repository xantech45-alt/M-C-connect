import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { DetailCommerceHeader } from '@/components/composite/DetailCommerceHeader';
import styles from './DetailLayout.module.css';

interface DetailLayoutProps {
  children: ReactNode;
  title?: string;
  /** Hide the back button (e.g. full-screen capture flows). */
  hideBack?: boolean;
  /** Render content full-bleed with no header (image search, image viewer). */
  fullScreen?: boolean;
  /** Use the new composite header with cart badge (default true). */
  useNewHeader?: boolean;
  /** Render the back button as a home link (Brand mark instead of chevron). */
  homeLink?: boolean;
  /**
   * Render only the in-flow back/title row - no app-bar, no root background.
   * Use when nested inside TabsLayout so the parent CommerceHeader stays
   * visible and the bottom nav is preserved.
   */
  bare?: boolean;
}

/**
 * DetailLayout renders a top app bar with back/title/contextual action,
 * plus the routed page content. When `bare` it renders just a sticky
 * back/title row for use inside TabsLayout (which already provides the
 * CommerceHeader + BottomNav).
 */
export function DetailLayout({
  children,
  title,
  hideBack,
  fullScreen,
  useNewHeader = true,
  homeLink,
  bare = false,
}: DetailLayoutProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (fullScreen) {
    return <div className={styles.fullScreen}>{children}</div>;
  }

  if (bare) {
    return (
      <div className={styles.bare}>
        {(useNewHeader || title || !hideBack) && (
          <div className={styles.bareHeader}>
            {!hideBack && (
              <button
                type="button"
                aria-label="Retour"
                className={styles.backBtn}
                onClick={() => navigate(-1)}
              >
                <ChevronLeft size={22} aria-hidden="true" />
              </button>
            )}
            {title && <h1 className={styles.bareTitle}>{title}</h1>}
          </div>
        )}
        <div className={styles.bareContent}>{children}</div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {useNewHeader ? (
        <DetailCommerceHeader title={title} hideBrand={!homeLink && hideBack} asHomeLink={homeLink} />
      ) : (
        <header className={styles.appBar}>
          {!hideBack && (
            <button
              type="button"
              aria-label="Retour"
              className={styles.backBtn}
              onClick={() => navigate(-1)}
            >
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
          )}
          {title && <h1 className={styles.title}>{title}</h1>}
          <div className={styles.spacer} />
        </header>
      )}
      <div className={styles.content} data-route={pathname}>
        {children}
      </div>
    </div>
  );
}