export type OrderStage =
  | 'awaiting_payment'
  | 'sourcing'
  | 'production'
  | 'qc'
  | 'shipping'
  | 'customs'
  | 'delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderTimelineEvent {
  stage: OrderStage;
  date: string;
  description: string;
}

export interface Order {
  id: string;
  productTitle: string;
  quantity: number;
  totalXof: number;
  currentStage: OrderStage;
  eta: string;
  events: OrderTimelineEvent[];
}

export const orders: Order[] = [
  {
    id: 'MC-000123',
    productTitle: 'Tissu wax imprimé 6 yards',
    quantity: 200,
    totalXof: 2380000,
    currentStage: 'shipping',
    eta: '2026-09-22',
    events: [
      { stage: 'awaiting_payment', date: '2026-08-12', description: 'Commande confirmée' },
      { stage: 'sourcing', date: '2026-08-14', description: 'Sourcing fournisseur' },
      { stage: 'production', date: '2026-08-18', description: 'Production lancée' },
      { stage: 'qc', date: '2026-08-30', description: 'Contrôle qualité validé' },
      { stage: 'shipping', date: '2026-09-02', description: 'Chargement conteneur Tianjin' },
    ],
  },
  {
    id: 'MC-000124',
    productTitle: 'Téléviseur LED 43"',
    quantity: 12,
    totalXof: 2520000,
    currentStage: 'qc',
    eta: '2026-10-05',
    events: [
      { stage: 'awaiting_payment', date: '2026-08-25', description: 'Commande confirmée' },
      { stage: 'sourcing', date: '2026-08-27', description: 'Sourcing fournisseur' },
      { stage: 'production', date: '2026-08-30', description: 'Production lancée' },
      { stage: 'qc', date: '2026-09-15', description: 'Contrôle qualité en cours' },
    ],
  },
  {
    id: 'MC-000125',
    productTitle: 'Moulin à grain',
    quantity: 4,
    totalXof: 640000,
    currentStage: 'delivered',
    eta: '2026-08-10',
    events: [
      { stage: 'delivered', date: '2026-08-10', description: 'Livraison effectuée à Bamako' },
    ],
  },
];

export function getOrderById(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}

export const STAGE_LABELS: Record<OrderStage, string> = {
  awaiting_payment: 'En attente de paiement',
  sourcing: 'Sourcing fournisseur',
  production: 'Production',
  qc: 'Contrôle qualité',
  shipping: 'Expédition',
  customs: 'Douane',
  delivery: 'Livraison en cours',
  delivered: 'Livrée',
  cancelled: 'Annulée',
};
