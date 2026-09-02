import { Home, Package, Grid3x3, MessageCircle, User } from 'lucide-react';

export interface NavTabDef {
  to: string;
  label: string;
  icon: typeof Home;
  /** Pathname prefixes that also activate this tab (e.g. product flows). */
  match?: string[];
}

/** Shared Set-B tab list (Gate B) - used by both BottomNav and LeftRailNav. */
export const navTabs: readonly NavTabDef[] = [
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
      '/help',
      '/contact',
      '/about',
    ],
  },
] as const;
