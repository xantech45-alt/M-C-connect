import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/state/AuthProvider';
import styles from './UserChip.module.css';

/**
 * Compact user chip for the top navigation. Shows avatar initials + first
 * name and routes to /profile when tapped. Falls back to "Invité" when
 * no company profile has been completed yet.
 */
export function UserChip() {
  const navigate = useNavigate();
  const { company, isAuthenticated } = useAuth();

  const displayName = company?.contactName?.trim() || 'Invité';
  const firstName = displayName.split(/\s+/)[0] || 'Invité';
  const initials = firstName
    .slice(0, 2)
    .toUpperCase()
    .replace(/[^A-ZÀ-ÖØ-Þ]/g, (m) => m);

  return (
    <button type="button" className={styles.root} onClick={() => navigate('/profile')}>
      <span className={styles.avatar} aria-hidden="true">
        {initials || 'U'}
      </span>
      {isAuthenticated && <span className="sr-only">Profil de </span>}
      <span className={styles.name}>{firstName}</span>
      {!isAuthenticated && <span className="sr-only">, se connecter</span>}
    </button>
  );
}
