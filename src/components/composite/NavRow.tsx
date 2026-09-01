import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import styles from './NavRow.module.css';

interface Props {
  icon: ReactNode;
  label: string;
  value?: string;
  to?: string;
  onClick?: () => void;
  /** Red text/icon treatment for destructive actions (e.g. "Se déconnecter"). */
  danger?: boolean;
}

/**
 * A single icon + label + value row used across account/settings list screens
 * (Profile, Settings, Addresses, Payment methods, ...). Renders as a link,
 * a button, or - when neither `to` nor `onClick` is given - a non-interactive
 * display row with no chevron (e.g. "Langue : Français" with no target screen).
 */
export function NavRow({ icon, label, value, to, onClick, danger }: Props) {
  const interactive = Boolean(to || onClick);
  const rowClass = [styles.row, !interactive ? styles.rowStatic : '', danger ? styles.rowDanger : '']
    .filter(Boolean)
    .join(' ');

  const body = (
    <>
      <span className={styles.rowIcon}>{icon}</span>
      <span className={styles.rowBody}>
        <span className={styles.rowLabel}>{label}</span>
        {value && <span className={styles.rowValue}>{value}</span>}
      </span>
      {interactive && (
        <ChevronRight size={18} strokeWidth={1.5} className={styles.rowChevron} aria-hidden="true" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={rowClass}>
        {body}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button type="button" className={rowClass} onClick={onClick}>
        {body}
      </button>
    );
  }
  return <div className={rowClass}>{body}</div>;
}

export function NavRowList({ children }: { children: ReactNode }) {
  return <ul className={styles.rows}>{children}</ul>;
}
