import { NavLink } from 'react-router-dom';
import { navTabs } from './navTabs';
import styles from './BottomNav.module.css';

export function BottomNav({ currentPath }: { currentPath: string }) {
  return (
    <nav aria-label="Navigation principale" className={styles.nav}>
      <ul className={styles.list}>
        {navTabs.map(({ to, label, icon: Icon, match }) => {
          const matches = match ?? [to];
          const isActive = matches.some((p) => currentPath === p || currentPath.startsWith(`${p}/`));
          return (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/home'}
                className={styles.tab}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={styles.iconWrap} aria-hidden="true">
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <span className={styles.label}>{label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
