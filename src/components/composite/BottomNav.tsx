import { NavLink } from 'react-router-dom';
import { Home, Package, Grid3x3, MessageCircle, User } from 'lucide-react';
import styles from './BottomNav.module.css';

interface TabDef {
  to: string;
  label: string;
  icon: typeof Home;
  /** Pathname prefixes that also activate this tab (e.g. product flows). */
  match?: string[];
}

const tabs: readonly TabDef[] = [
  { to: '/home', label: 'Accueil', icon: Home },
  {
    to: '/orders',
    label: 'Commandes',
    icon: Package,
    match: ['/orders'],
  },
  {
    to: '/categories',
    label: 'Produits',
    icon: Grid3x3,
    match: ['/categories', '/products', '/search', '/product', '/compare', '/cart', '/checkout', '/rfq'],
  },
  { to: '/messages', label: 'Messages', icon: MessageCircle },
  {
    to: '/profile',
    label: 'Profil',
    icon: User,
    match: [
      '/profile',
      '/settings',
      '/addresses',
      '/payment-methods',
      '/favorites',
      '/coupons',
      '/reviews',
      '/returns',
      '/help',
      '/contact',
      '/about',
    ],
  },
] as const;

export function BottomNav({ currentPath }: { currentPath: string }) {
  return (
    <nav aria-label="Navigation principale" className={styles.nav}>
      <ul className={styles.list}>
        {tabs.map(({ to, label, icon: Icon, match }) => {
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
