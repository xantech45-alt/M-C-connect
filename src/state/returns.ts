export type ReturnStatus = 'requested' | 'approved' | 'refunded' | 'rejected';

export interface ReturnRequest {
  id: string;
  orderId: string;
  productTitle: string;
  reason: string;
  status: ReturnStatus;
  requestedAt: string;
}

export const returns: ReturnRequest[] = [
  {
    id: 'ret-1',
    orderId: 'MC-000123',
    productTitle: 'Tissu wax imprimé 6 yards',
    reason: 'Coloris différent de la commande',
    status: 'refunded',
    requestedAt: '2026-07-20',
  },
  {
    id: 'ret-2',
    orderId: 'MC-000124',
    productTitle: 'Téléviseur LED 43" Full HD',
    reason: 'Carton endommagé à la réception',
    status: 'approved',
    requestedAt: '2026-08-25',
  },
];

export const RETURN_STATUS_LABELS: Record<ReturnStatus, string> = {
  requested: 'Demande envoyée',
  approved: 'Retour approuvé',
  refunded: 'Remboursé',
  rejected: 'Refusé',
};
