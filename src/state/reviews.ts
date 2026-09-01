export interface Review {
  id: string;
  productId: string;
  productTitle: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  date: string;
}

export const reviews: Review[] = [
  {
    id: 'rv-1',
    productId: 'p-007',
    productTitle: 'Veste coupe-vent homme',
    rating: 5,
    comment: 'Qualité conforme aux photos, livraison suivie de bout en bout par M&C Connect.',
    date: '2026-08-02',
  },
  {
    id: 'rv-2',
    productId: 'p-011',
    productTitle: 'Montre chronographe acier',
    rating: 4,
    comment: "Bon rapport qualité-prix pour le MOQ demandé. Contrôle qualité rassurant avant expédition.",
    date: '2026-07-18',
  },
];
