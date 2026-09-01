import type { ReactNode } from 'react';
import { Inbox } from 'lucide-react';
import styles from './EmptyState.module.css';

interface Props {
  title: string;
  body?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ title, body, icon, action }: Props) {
  return (
    <div className={styles.empty} role="status">
      <span className={styles.icon}>{icon ?? <Inbox size={56} strokeWidth={1.5} />}</span>
      <h2 className={styles.title}>{title}</h2>
      {body && <p className={styles.body}>{body}</p>}
      {action}
    </div>
  );
}
