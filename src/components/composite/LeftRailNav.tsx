import { NavLink } from 'react-router-dom';
import { Brand } from '@/components/primitives/Brand';
import { navTabs } from './navTabs';
import styles from './LeftRailNav.module.css';

/**
 * Tablet-landscape (>=900px) replacement for BottomNav - same Set-B tabs
 * (Gate B), same routes, laid out as a fixed left rail instead of a fixed
 * bottom bar so the thumb-zone tab bar doesn't waste horizontal space once
 * there's room for it.
 */
export function LeftRailNav({ currentPath }: { currentPath: string }) {
  return (
    <nav aria-label="Navigation principale" className={styles.rail}>
      <div className={styles.brand}>
        <Brand variant="mark" />
      </div>
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
