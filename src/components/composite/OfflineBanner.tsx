import { useOffline } from '@/state/OfflineProvider';
import styles from './OfflineBanner.module.css';

export function OfflineBanner() {
  const { isOffline } = useOffline();
  if (!isOffline) return null;
  return (
    <div role="status" aria-live="polite" className={styles.banner}>
      Vous êtes hors ligne. Vos modifications seront enregistrées.
    </div>
  );
}
