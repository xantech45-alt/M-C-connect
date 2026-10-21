import { NavLink } from 'react-router-dom';
import { FilePlus2 } from 'lucide-react';
import { navTabs } from './navTabs';
import styles from './DesktopNav.module.css';

/**
 * Desktop (>=1024px) replacement for BottomNav / LeftRailNav: the same five
 * permanent anchors (MS-CAT-01) laid out as a horizontal section bar under
 * the header, plus the "Demande sur mesure" entry the spec places on Accueil
 * and inside Produits - surfaced here so it is one click away on desktop.
 */
export function DesktopNav({ currentPath }: { currentPath: string }) {
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
                <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                {label}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <NavLink to="/rfq/new" className={styles.cta}>
        <FilePlus2 size={18} strokeWidth={1.75} aria-hidden="true" />
        Demande sur mesure
      </NavLink>
    </nav>
  );
}
