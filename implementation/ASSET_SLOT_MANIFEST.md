# Asset Slot Manifest

> One row per image slot actually rendered in the app today. Every row resolves to a distinct
> asset key (enforced by `src/assets/registry.test.ts`). Section B catalogs assets that are
> relocated and registry-typed but not yet wired into a screen - that wiring lands in Phase 3
> (fidelity pass) and Phase 4 (commerce/messaging gaps), not Phase 1.

---

## A. Product image slots (43 - Gate D budget, zero duplicates)

All product slots render through `<Image>` (`src/components/primitives/Image.tsx`), consumed by
`ProductCard` (product-card ratio 1:1, per `blueprint/09` §3) and `ProductDetailPage`'s gallery
(gallery ratio 1:1; first frame `loading="eager" fetchpriority="high"`, remaining frames `lazy`).
`ProductCard` appears on `/home`, `/search/results`, and the "Produits similaires" rail on
`/product/:id` - the Route column below is the PDP gallery's own route, since that's where all 4
Tier-1 frames are visible at once; the primary frame of every product also surfaces via
`ProductCard` on the routes above.

### Tier 1 - 8 hero products × 4 images

| Slot ID | Surface | Route | Component | Asset key | Ratio | Loading | W×H |
|---|---|---|---|---|---|---|---|
| p-007.0 | PDP gallery (primary) + card | /product/p-007 | ProductDetailPage / ProductCard | veste-coupe-vent-1 | 1:1 | eager (PDP) / lazy (card) | 800×700 |
| p-007.1 | PDP gallery | /product/p-007 | ProductDetailPage | veste-coupe-vent-2 | 1:1 | lazy | 800×700 |
| p-007.2 | PDP gallery | /product/p-007 | ProductDetailPage | veste-coupe-vent-3 | 1:1 | lazy | 800×700 |
| p-007.3 | PDP gallery | /product/p-007 | ProductDetailPage | veste-coupe-vent-4 | 1:1 | lazy | 800×700 |
| p-008.0 | PDP gallery (primary) + card | /product/p-008 | ProductDetailPage / ProductCard | ensemble-sportswear-1 | 1:1 | eager / lazy | 800×700 |
| p-008.1 | PDP gallery | /product/p-008 | ProductDetailPage | ensemble-sportswear-2 | 1:1 | lazy | 800×700 |
| p-008.2 | PDP gallery | /product/p-008 | ProductDetailPage | ensemble-sportswear-3 | 1:1 | lazy | 800×700 |
| p-008.3 | PDP gallery | /product/p-008 | ProductDetailPage | ensemble-sportswear-4 | 1:1 | lazy | 800×700 |
| p-009.0 | PDP gallery (primary) + card | /product/p-009 | ProductDetailPage / ProductCard | chaussure-ville-cuir-1 | 1:1 | eager / lazy | 800×700 |
| p-009.1 | PDP gallery | /product/p-009 | ProductDetailPage | chaussure-ville-cuir-2 | 1:1 | lazy | 800×700 |
| p-009.2 | PDP gallery | /product/p-009 | ProductDetailPage | chaussure-ville-cuir-3 | 1:1 | lazy | 800×700 |
| p-009.3 | PDP gallery | /product/p-009 | ProductDetailPage | chaussure-ville-cuir-4 | 1:1 | lazy | 800×700 |
| p-010.0 | PDP gallery (primary) + card | /product/p-010 | ProductDetailPage / ProductCard | robe-tendance-1 | 1:1 | eager / lazy | 800×700 |
| p-010.1 | PDP gallery | /product/p-010 | ProductDetailPage | robe-tendance-2 | 1:1 | lazy | 800×700 |
| p-010.2 | PDP gallery | /product/p-010 | ProductDetailPage | robe-tendance-3 | 1:1 | lazy | 800×700 |
| p-010.3 | PDP gallery | /product/p-010 | ProductDetailPage | robe-tendance-4 | 1:1 | lazy | 800×700 |
| p-011.0 | PDP gallery (primary) + card | /product/p-011 | ProductDetailPage / ProductCard | montre-chronographe-1 | 1:1 | eager / lazy | 800×700 |
| p-011.1 | PDP gallery | /product/p-011 | ProductDetailPage | montre-chronographe-2 | 1:1 | lazy | 800×700 |
| p-011.2 | PDP gallery | /product/p-011 | ProductDetailPage | montre-chronographe-3 | 1:1 | lazy | 800×700 |
| p-011.3 | PDP gallery | /product/p-011 | ProductDetailPage | montre-chronographe-4 | 1:1 | lazy | 800×700 |
| p-012.0 | PDP gallery (primary) + card | /product/p-012 | ProductDetailPage / ProductCard | soiree-elegante-1 | 1:1 | eager / lazy | 765×765 |
| p-012.1 | PDP gallery | /product/p-012 | ProductDetailPage | soiree-elegante-2 | 1:1 | lazy | 760×765 |
| p-012.2 | PDP gallery | /product/p-012 | ProductDetailPage | soiree-elegante-3 | 1:1 | lazy | 765×765 |
| p-012.3 | PDP gallery | /product/p-012 | ProductDetailPage | soiree-elegante-4 | 1:1 | lazy | 765×765 |
| p-013.0 | PDP gallery (primary) + card | /product/p-013 | ProductDetailPage / ProductCard | veste-survetement-collection-1 | 1:1 | eager / lazy | 800×700 |
| p-013.1 | PDP gallery | /product/p-013 | ProductDetailPage | veste-survetement-collection-2 | 1:1 | lazy | 800×700 |
| p-013.2 | PDP gallery | /product/p-013 | ProductDetailPage | veste-survetement-collection-3 | 1:1 | lazy | 800×700 |
| p-013.3 | PDP gallery | /product/p-013 | ProductDetailPage | veste-survetement-collection-4 | 1:1 | lazy | 800×700 |
| p-014.0 | PDP gallery (primary) + card | /product/p-014 | ProductDetailPage / ProductCard | tenue-habillee-1 | 1:1 | eager / lazy | 800×700 |
| p-014.1 | PDP gallery | /product/p-014 | ProductDetailPage | tenue-habillee-2 | 1:1 | lazy | 800×700 |
| p-014.2 | PDP gallery | /product/p-014 | ProductDetailPage | tenue-habillee-3 | 1:1 | lazy | 800×700 |
| p-014.3 | PDP gallery | /product/p-014 | ProductDetailPage | tenue-habillee-4 | 1:1 | lazy | 800×700 |

### Tier 2 - 11 products × 1 image

| Slot ID | Surface | Route | Component | Asset key | Ratio | Loading | W×H |
|---|---|---|---|---|---|---|---|
| p-015.0 | Card + PDP | /product/p-015 | ProductCard / ProductDetailPage | chaussure-sport-tissu | 1:1 | lazy | 800×700 |
| p-016.0 | Card + PDP | /product/p-016 | ProductCard / ProductDetailPage | chaussure-randonnee | 1:1 | lazy | 800×700 |
| p-017.0 | Card + PDP | /product/p-017 | ProductCard / ProductDetailPage | sandale-confort | 1:1 | lazy | 800×700 |
| p-018.0 | Card + PDP | /product/p-018 | ProductCard / ProductDetailPage | bijou-collier-plaque-or | 1:1 | lazy | 800×700 |
| p-019.0 | Card + PDP | /product/p-019 | ProductCard / ProductDetailPage | bijou-bracelet-perles | 1:1 | lazy | 800×700 |
| p-020.0 | Card + PDP | /product/p-020 | ProductCard / ProductDetailPage | bijou-boucles-oreilles | 1:1 | lazy | 800×700 |
| p-021.0 | Card + PDP | /product/p-021 | ProductCard / ProductDetailPage | short-sport-homme | 1:1 | lazy | 800×700 |
| p-022.0 | Card + PDP | /product/p-022 | ProductCard / ProductDetailPage | short-cycliste | 1:1 | lazy | 800×700 |
| p-023.0 | Card + PDP | /product/p-023 | ProductCard / ProductDetailPage | ceinture-cuir | 1:1 | lazy | 800×700 |
| p-024.0 | Card + PDP | /product/p-024 | ProductCard / ProductDetailPage | parfum-eau-de-toilette | 1:1 | lazy | 800×700 |
| p-025.0 | Card + PDP | /product/p-025 | ProductCard / ProductDetailPage | shampoing-professionnel | 1:1 | lazy | 800×700 |

Products `p-001`…`p-006` (Électronique, Maison, Téléphones, Machines, Auto, Industriel) have
**no photography available** (Gate C). `imageUrl` is `undefined`; `ProductCard` and
`ProductDetailPage` render the Lucide `Package` fallback inside the same aspect-ratio frame -
never a mislabelled photo. Logged as a capture request in `ASSET_IMPLEMENTATION_MAP.md` §2.

---

## B. Relocated but not yet wired (reserved for later phases)

These assets were moved and semantically renamed into `src/assets/catalog/` /
`src/assets/brand/` and are available through the typed registry (`asset()`, `catalogIcon()`,
`brandAsset()`), but no screen renders them yet because the surface itself doesn't exist until a
later phase's fidelity pass.

| Asset key | Pool | Intended surface | Target ratio | Wired in |
|---|---|---|---|---|
| hero-banner-1/2/3 | Wide banner (1920×800) | Home hero carousel | 16:9 | Phase 3 (Home fidelity) |
| category-strip-electronics-1/2, category-strip-mode-homme, category-strip-mode-femme | Category strip (554×264) | Category header strips | 2.1:1 (custom) | Phase 3/6 |
| promo-cta-banner | CTA banner (580×400) | Promo block | 4:3-ish (custom) | Phase 3 |
| editorial-1/2/3/4 | Editorial (800×458) | Help centre / about | 4:3 | Phase 3 §4.2 (`/about`, `/help`) |
| avatar-temoignage | Avatar (200×200) | Testimonial / profile default | 1:1 | Phase 3/4 |
| newsletter-signup (re-encoded WebP, 107 KB, was 1.7 MB PNG) | Newsletter promo | Newsletter signup block | 1:1 | Not yet designed into any screen |
| onboarding-1/2/3/4 | Brand illustration (transparent PNG) | Onboarding slides 1–4 + order-tracking empty state (onboarding-4) | native | Phase 3 (Onboarding fidelity - 5-slide rebuild) |
| icons/bag, coat, cosmetics, dress, glasses, hat, jacket, jewelry, perfume, quotes, shoes, shorts, tee, watch (14 SVGs) | Legacy outline icon supply | Category tiles / empty states | n/a (vector) | Reserved - `IconRender` currently uses Lucide, not this SVG set; no current screen consumes them |

`payment.png` is **excluded from the registry entirely** - never moved into `src/`, never
imported. The original file remains, unreferenced, at `assets/products/payment.png`.

---

## Totals

- **Slots filled (Phase 1):** 43 / 43 product image slots (Section A) - 0 remaining unfilled in
  that budget.
- **Unique assets consumed (Phase 1):** 43 / 43 available product-grade photos - zero duplicates
  (enforced by `src/assets/registry.test.ts`).
- **Assets relocated but unconsumed by any screen yet:** 32 individual files (3 hero banners +
  4 category strips + 1 CTA banner + 4 editorial + 1 avatar + 1 newsletter + 4 onboarding
  illustrations + 14 SVG icons) across the 8 reserved rows in Section B - all reserved for
  Phase 3/4/6, not dropped.
- **Assets excluded on purpose:** 1 (`payment.png` - forbidden, never imported).
