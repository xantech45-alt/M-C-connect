import { asset } from '@/assets/registry';

export interface CatalogCategory {
  id: string;
  name: string;
  iconName: 'shirt' | 'tv' | 'wrench' | 'package' | 'laptop' | 'factory' | 'home' | 'phone' | 'sparkles' | 'car';
  productCount: number;
}

export const categories: CatalogCategory[] = [
  { id: 'textile', name: 'Textile & Mode', iconName: 'shirt', productCount: 1240 },
  { id: 'electronics', name: 'Électronique', iconName: 'tv', productCount: 980 },
  { id: 'machinery', name: 'Machines', iconName: 'wrench', productCount: 312 },
  { id: 'home', name: 'Maison & Cuisine', iconName: 'home', productCount: 1640 },
  { id: 'phones', name: 'Téléphones & Accessoires', iconName: 'phone', productCount: 720 },
  { id: 'beauty', name: 'Beauté & Hygiène', iconName: 'sparkles', productCount: 540 },
  { id: 'auto', name: 'Auto & Moto', iconName: 'car', productCount: 410 },
  { id: 'industrial', name: 'Équipement industriel', iconName: 'factory', productCount: 180 },
];

export interface CatalogProduct {
  id: string;
  title: string;
  categoryId: string;
  priceMinXof: number;
  /** Pre-discount reference price. Present only for products currently on a flash offer. */
  originalPriceXof?: number;
  moq: number;
  /** Primary image (registry-resolved URL). Undefined renders the Lucide fallback - never a mislabelled photo. */
  imageUrl?: string;
  /** Extra PDP gallery frames beyond the primary image. Tier-1 hero products only (see Gate D). */
  gallery?: string[];
  verified: boolean;
  hsCode?: string;
  shortSpecs: string[];
}

export const products: CatalogProduct[] = [
  // --- No photography available yet (Gate C): icon fallback, queued for capture. ---
  {
    id: 'p-001',
    title: 'Téléviseur LED 43" Full HD',
    categoryId: 'electronics',
    priceMinXof: 165000,
    moq: 5,
    verified: true,
    hsCode: '8528.72',
    shortSpecs: ['1080p', 'HDMI ×3', 'USB ×2'],
  },
  {
    id: 'p-002',
    title: 'Réfrigérateur 350L',
    categoryId: 'home',
    priceMinXof: 280000,
    moq: 3,
    verified: true,
    hsCode: '8418.21',
    shortSpecs: ['Classe A+', 'No frost'],
  },
  {
    id: 'p-003',
    title: 'Smartphone Android 6.5"',
    categoryId: 'phones',
    priceMinXof: 95000,
    moq: 10,
    verified: true,
    hsCode: '8517.13',
    shortSpecs: ['128 GB', 'Triple caméra'],
  },
  {
    id: 'p-004',
    title: 'Moulin à grain électrique 1.5kW',
    categoryId: 'machinery',
    priceMinXof: 145000,
    moq: 2,
    verified: true,
    hsCode: '8437.80',
    shortSpecs: ['220V', 'Capacité 80 kg/h'],
  },
  {
    id: 'p-005',
    title: 'Pneus auto 195/65R15',
    categoryId: 'auto',
    priceMinXof: 38000,
    moq: 50,
    verified: true,
    hsCode: '4011.10',
    shortSpecs: ['Tubeless'],
  },
  {
    id: 'p-006',
    title: "Ligne d'emballage industrielle",
    categoryId: 'industrial',
    priceMinXof: 4500000,
    moq: 1,
    verified: true,
    hsCode: '8422.30',
    shortSpecs: ['Sur mesure'],
  },

  // --- Tier 1 - 8 hero products, 4 unique gallery images each (Gate D). ---
  {
    id: 'p-007',
    title: 'Veste coupe-vent homme',
    categoryId: 'textile',
    priceMinXof: 18500,
    originalPriceXof: 23100,
    moq: 50,
    verified: true,
    hsCode: '6201.93',
    imageUrl: asset('veste-coupe-vent-1'),
    gallery: [asset('veste-coupe-vent-2'), asset('veste-coupe-vent-3'), asset('veste-coupe-vent-4')],
    shortSpecs: ['Déperlant', 'Doublure filet', 'S–XXL'],
  },
  {
    id: 'p-008',
    title: 'Ensemble sportswear performance',
    categoryId: 'textile',
    priceMinXof: 14200,
    moq: 60,
    verified: true,
    hsCode: '6112.11',
    imageUrl: asset('ensemble-sportswear-1'),
    gallery: [asset('ensemble-sportswear-2'), asset('ensemble-sportswear-3'), asset('ensemble-sportswear-4')],
    shortSpecs: ['Tissu respirant', 'Coutures plates', 'S–XXL'],
  },
  {
    id: 'p-009',
    title: 'Chaussures de ville en cuir',
    categoryId: 'textile',
    priceMinXof: 22000,
    originalPriceXof: 25900,
    moq: 40,
    verified: true,
    hsCode: '6403.59',
    imageUrl: asset('chaussure-ville-cuir-1'),
    gallery: [asset('chaussure-ville-cuir-2'), asset('chaussure-ville-cuir-3'), asset('chaussure-ville-cuir-4')],
    shortSpecs: ['Cuir véritable', 'Semelle antidérapante', '39–46'],
  },
  {
    id: 'p-010',
    title: 'Robe tendance femme',
    categoryId: 'textile',
    priceMinXof: 12800,
    moq: 80,
    verified: true,
    hsCode: '6204.42',
    imageUrl: asset('robe-tendance-1'),
    gallery: [asset('robe-tendance-2'), asset('robe-tendance-3'), asset('robe-tendance-4')],
    shortSpecs: ['100% viscose', '4 coloris', 'S–XL'],
  },
  {
    id: 'p-011',
    title: 'Montre chronographe acier',
    categoryId: 'textile',
    priceMinXof: 16500,
    originalPriceXof: 19400,
    moq: 30,
    verified: true,
    hsCode: '9102.21',
    imageUrl: asset('montre-chronographe-1'),
    gallery: [asset('montre-chronographe-2'), asset('montre-chronographe-3'), asset('montre-chronographe-4')],
    shortSpecs: ['Boîtier acier inox', 'Étanche 5 ATM', 'Bracelet réglable'],
  },
  {
    id: 'p-012',
    title: 'Tenue de soirée élégante',
    categoryId: 'textile',
    priceMinXof: 26500,
    moq: 30,
    verified: true,
    hsCode: '6204.43',
    imageUrl: asset('soiree-elegante-1'),
    gallery: [asset('soiree-elegante-2'), asset('soiree-elegante-3'), asset('soiree-elegante-4')],
    shortSpecs: ['Finition satinée', 'Doublure intégrale', 'S–XL'],
  },
  {
    id: 'p-013',
    title: 'Collection veste et survêtement',
    categoryId: 'textile',
    priceMinXof: 15800,
    moq: 50,
    verified: true,
    hsCode: '6211.33',
    imageUrl: asset('veste-survetement-collection-1'),
    gallery: [
      asset('veste-survetement-collection-2'),
      asset('veste-survetement-collection-3'),
      asset('veste-survetement-collection-4'),
    ],
    shortSpecs: ['Ensemble 2 pièces', 'Molleton gratté', 'S–XXL'],
  },
  {
    id: 'p-014',
    title: 'Tenue habillée chemise et robe',
    categoryId: 'textile',
    priceMinXof: 13400,
    moq: 60,
    verified: true,
    hsCode: '6205.20',
    imageUrl: asset('tenue-habillee-1'),
    gallery: [asset('tenue-habillee-2'), asset('tenue-habillee-3'), asset('tenue-habillee-4')],
    shortSpecs: ['Coton mélangé', 'Repassage facile', 'S–XXL'],
  },

  // --- Tier 2 - 11 products, 1 unique primary image each (Gate D). ---
  {
    id: 'p-015',
    title: 'Chaussures de sport en tissu',
    categoryId: 'textile',
    priceMinXof: 11200,
    moq: 60,
    verified: true,
    hsCode: '6404.11',
    imageUrl: asset('chaussure-sport-tissu'),
    shortSpecs: ['Semelle EVA', 'Tissu mesh', '38–45'],
  },
  {
    id: 'p-016',
    title: 'Chaussures de randonnée',
    categoryId: 'textile',
    priceMinXof: 19500,
    moq: 40,
    verified: true,
    hsCode: '6403.91',
    imageUrl: asset('chaussure-randonnee'),
    shortSpecs: ['Tige haute', 'Semelle crantée', '39–46'],
  },
  {
    id: 'p-017',
    title: 'Sandales confort',
    categoryId: 'textile',
    priceMinXof: 7200,
    moq: 100,
    verified: true,
    hsCode: '6402.99',
    imageUrl: asset('sandale-confort'),
    shortSpecs: ['Semelle amortissante', 'Sangles ajustables'],
  },
  {
    id: 'p-018',
    title: 'Collier plaqué or',
    categoryId: 'textile',
    priceMinXof: 5400,
    moq: 100,
    verified: true,
    hsCode: '7117.19',
    imageUrl: asset('bijou-collier-plaque-or'),
    shortSpecs: ['Plaqué or 18K', 'Hypoallergénique'],
  },
  {
    id: 'p-019',
    title: 'Bracelet perles',
    categoryId: 'textile',
    priceMinXof: 3800,
    moq: 150,
    verified: true,
    hsCode: '7117.90',
    imageUrl: asset('bijou-bracelet-perles'),
    shortSpecs: ['Perles synthétiques', 'Élastique renforcé'],
  },
  {
    id: 'p-020',
    title: "Boucles d'oreilles",
    categoryId: 'textile',
    priceMinXof: 2900,
    moq: 200,
    verified: true,
    hsCode: '7117.19',
    imageUrl: asset('bijou-boucles-oreilles'),
    shortSpecs: ['Sans nickel', 'Présentoir carton inclus'],
  },
  {
    id: 'p-021',
    title: 'Short de sport homme',
    categoryId: 'textile',
    priceMinXof: 6200,
    moq: 100,
    verified: true,
    hsCode: '6103.43',
    imageUrl: asset('short-sport-homme'),
    shortSpecs: ['Séchage rapide', 'Poche zippée'],
  },
  {
    id: 'p-022',
    title: 'Short cycliste',
    categoryId: 'textile',
    priceMinXof: 8100,
    moq: 80,
    verified: true,
    hsCode: '6104.63',
    imageUrl: asset('short-cycliste'),
    shortSpecs: ['Peau de pêche', 'Bande réfléchissante'],
  },
  {
    id: 'p-023',
    title: 'Ceinture en cuir véritable',
    categoryId: 'textile',
    priceMinXof: 4600,
    originalPriceXof: 5750,
    moq: 120,
    verified: true,
    hsCode: '4203.30',
    imageUrl: asset('ceinture-cuir'),
    shortSpecs: ['Cuir pleine fleur', 'Boucle métal'],
  },
  {
    id: 'p-024',
    title: 'Parfum eau de toilette 100ml',
    categoryId: 'beauty',
    priceMinXof: 6900,
    moq: 150,
    verified: true,
    hsCode: '3303.00',
    imageUrl: asset('parfum-eau-de-toilette'),
    shortSpecs: ['Vaporisateur 100ml', 'Tenue longue durée'],
  },
  {
    id: 'p-025',
    title: 'Shampoing professionnel 1L',
    categoryId: 'beauty',
    priceMinXof: 3500,
    moq: 200,
    verified: true,
    hsCode: '3305.10',
    imageUrl: asset('shampoing-professionnel'),
    shortSpecs: ['Marque blanche disponible', 'Formule sans sulfate'],
  },
];

export const featuredIds = ['p-007', 'p-009', 'p-011', 'p-024'];
export const trendingIds = ['p-010', 'p-015', 'p-001'];
export const flashSaleIds = ['p-007', 'p-009', 'p-011', 'p-023'];

export function getProductById(id: string): CatalogProduct | undefined {
  return products.find((p) => p.id === id);
}
