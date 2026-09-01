export type NotificationCategory = 'order' | 'promo' | 'system';

export interface AppNotification {
  id: string;
  category: NotificationCategory;
  title: string;
  body: string;
  sentAt: string;
  read: boolean;
}

export const notifications: AppNotification[] = [
  {
    id: 'n-1',
    category: 'order',
    title: 'Commande MC-000123 expédiée',
    body: 'Le conteneur a quitté Tianjin. ETA révisé au 22 septembre.',
    sentAt: '2026-09-04T10:22:00Z',
    read: false,
  },
  {
    id: 'n-2',
    category: 'system',
    title: 'Contrôle qualité validé',
    body: 'Votre commande MC-000124 a passé le contrôle qualité M&C.',
    sentAt: '2026-08-31T08:15:00Z',
    read: false,
  },
  {
    id: 'n-3',
    category: 'promo',
    title: 'Offre flash textile',
    body: '-15% sur la collection textile jusqu’à dimanche.',
    sentAt: '2026-08-30T09:00:00Z',
    read: true,
  },
  {
    id: 'n-4',
    category: 'order',
    title: 'Commande MC-000125 livrée',
    body: 'Livraison confirmée à Bamako. Merci pour votre confiance.',
    sentAt: '2026-08-10T09:00:00Z',
    read: true,
  },
  {
    id: 'n-5',
    category: 'promo',
    title: 'Coupon de bienvenue',
    body: 'BIENVENUE10 : -10% dès 50 000 XOF d’achat.',
    sentAt: '2026-07-25T12:00:00Z',
    read: true,
  },
  {
    id: 'n-6',
    category: 'system',
    title: 'Nouvelle méthode de paiement',
    body: 'Le virement bancaire est désormais disponible.',
    sentAt: '2026-07-18T16:30:00Z',
    read: true,
  },
];
