export type CouponStatus = 'active' | 'used' | 'expired';

export interface Coupon {
  id: string;
  code: string;
  title: string;
  discountLabel: string;
  minOrderXof?: number;
  status: CouponStatus;
  expiresAt: string;
}

export const coupons: Coupon[] = [
  {
    id: 'cp-1',
    code: 'BIENVENUE10',
    title: 'Réduction de bienvenue',
    discountLabel: '−10%',
    minOrderXof: 50000,
    status: 'active',
    expiresAt: '2026-12-31',
  },
  {
    id: 'cp-2',
    code: 'LIVRAISON0',
    title: 'Livraison offerte',
    discountLabel: 'Livraison gratuite',
    minOrderXof: 100000,
    status: 'active',
    expiresAt: '2026-10-15',
  },
  {
    id: 'cp-3',
    code: 'RENTREE5000',
    title: 'Remise rentrée',
    discountLabel: '−5 000 FCFA',
    minOrderXof: 30000,
    status: 'used',
    expiresAt: '2026-08-01',
  },
  {
    id: 'cp-4',
    code: 'FLASH15',
    title: 'Offre flash textile',
    discountLabel: '−15%',
    status: 'expired',
    expiresAt: '2026-07-01',
  },
];
