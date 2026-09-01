import styles from './Spinner.module.css';

interface Props {
  /** Fill the available route/content area while a lazy page chunk loads. */
  fullSection?: boolean;
}

/** Accessible loading indicator - used as the route-transition Suspense fallback. */
export function Spinner({ fullSection = false }: Props) {
  return (
    <div className={fullSection ? styles.section : styles.inline} role="status" aria-live="polite">
      <span className={styles.ring} aria-hidden="true" />
      <span className="sr-only">Chargement…</span>
    </div>
  );
}
