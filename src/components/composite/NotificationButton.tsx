import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './NotificationButton.module.css';

interface Props {
  /** Pass actual unread count; button hides badge when 0. */
  unread?: number;
}

export function NotificationButton({ unread = 0 }: Props) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className={styles.root}
      onClick={() => navigate('/notifications')}
      aria-label={unread > 0 ? `${unread} notification${unread > 1 ? 's' : ''} non lue${unread > 1 ? 's' : ''}` : 'Notifications'}
    >
      <Bell size={22} strokeWidth={1.5} aria-hidden="true" />
      {unread > 0 && <span className={styles.badge}>{unread > 9 ? '9+' : unread}</span>}
    </button>
  );
}
