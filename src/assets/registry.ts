/**
 * Typed asset registry. Every raster/SVG asset ships through Vite's glob
 * import so it is hashed, tree-shaken, and never referenced by a raw string
 * path from a component. Add a file to `src/assets/catalog` or
 * `src/assets/brand` and it appears here automatically - no manual wiring.
 */

const catalogModules = import.meta.glob('./catalog/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const iconModules = import.meta.glob('./catalog/icons/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const brandModules = import.meta.glob('./brand/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

function keyOf(path: string): string {
  const file = path.split('/').pop() ?? path;
  return file.replace(/\.(jpg|jpeg|png|webp|svg)$/i, '');
}

function toKeyedRecord(modules: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [path, url] of Object.entries(modules)) {
    out[keyOf(path)] = url;
  }
  return out;
}

/** Product photography, banners, editorial, and marketing raster assets. */
export const catalogAssets = toKeyedRecord(catalogModules) as Record<
  | 'avatar-temoignage'
  | 'bijou-boucles-oreilles'
  | 'bijou-bracelet-perles'
  | 'bijou-collier-plaque-or'
  | 'category-strip-electronics-1'
  | 'category-strip-electronics-2'
  | 'category-strip-mode-femme'
  | 'category-strip-mode-homme'
  | 'ceinture-cuir'
  | 'chaussure-randonnee'
  | 'chaussure-sport-tissu'
  | 'chaussure-ville-cuir-1'
  | 'chaussure-ville-cuir-2'
  | 'chaussure-ville-cuir-3'
  | 'chaussure-ville-cuir-4'
  | 'editorial-1'
  | 'editorial-2'
  | 'editorial-3'
  | 'editorial-4'
  | 'ensemble-sportswear-1'
  | 'ensemble-sportswear-2'
  | 'ensemble-sportswear-3'
  | 'ensemble-sportswear-4'
  | 'hero-banner-1'
  | 'hero-banner-2'
  | 'hero-banner-3'
  | 'montre-chronographe-1'
  | 'montre-chronographe-2'
  | 'montre-chronographe-3'
  | 'montre-chronographe-4'
  | 'newsletter-signup'
  | 'parfum-eau-de-toilette'
  | 'promo-cta-banner'
  | 'robe-tendance-1'
  | 'robe-tendance-2'
  | 'robe-tendance-3'
  | 'robe-tendance-4'
  | 'sandale-confort'
  | 'shampoing-professionnel'
  | 'short-cycliste'
  | 'short-sport-homme'
  | 'soiree-elegante-1'
  | 'soiree-elegante-2'
  | 'soiree-elegante-3'
  | 'soiree-elegante-4'
  | 'tenue-habillee-1'
  | 'tenue-habillee-2'
  | 'tenue-habillee-3'
  | 'tenue-habillee-4'
  | 'veste-coupe-vent-1'
  | 'veste-coupe-vent-2'
  | 'veste-coupe-vent-3'
  | 'veste-coupe-vent-4'
  | 'veste-survetement-collection-1'
  | 'veste-survetement-collection-2'
  | 'veste-survetement-collection-3'
  | 'veste-survetement-collection-4',
  string
>;

/** Legacy outline SVGs supplied alongside the photography (unused by IconRender today; reserved). */
export const catalogIcons = toKeyedRecord(iconModules) as Record<
  | 'bag'
  | 'coat'
  | 'cosmetics'
  | 'dress'
  | 'glasses'
  | 'hat'
  | 'jacket'
  | 'jewelry'
  | 'perfume'
  | 'quotes'
  | 'shoes'
  | 'shorts'
  | 'tee'
  | 'watch',
  string
>;

/** Onboarding brand illustrations (3D-render style, transparent PNG). */
export const brandAssets = toKeyedRecord(brandModules) as Record<
  'onboarding-1' | 'onboarding-2' | 'onboarding-3' | 'onboarding-4',
  string
>;

export type CatalogAssetKey = keyof typeof catalogAssets;
export type CatalogIconKey = keyof typeof catalogIcons;
export type BrandAssetKey = keyof typeof brandAssets;

/** Resolve a catalog (product/marketing) asset key to its hashed URL. */
export function asset(key: CatalogAssetKey): string {
  return catalogAssets[key];
}

/** Resolve a legacy category-icon SVG key to its hashed URL. */
export function catalogIcon(key: CatalogIconKey): string {
  return catalogIcons[key];
}

/** Resolve an onboarding brand illustration key to its hashed URL. */
export function brandAsset(key: BrandAssetKey): string {
  return brandAssets[key];
}
