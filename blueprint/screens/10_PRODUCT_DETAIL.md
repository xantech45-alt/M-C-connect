# Screen 10 - Fiche produit

## Purpose
Present a single product with all the information needed to evaluate and act.

## User objective
Decide whether to add to cart, request a quote, or continue browsing.

## Business objective
Convert product pageview into a cart action or RFQ.

## Entry points
- Product card (04, 07, 09, 13, 19).
- Deep link `mc://product/:id`.

## Exit points
- Cart (15) on "Ajouter au panier".
- RFQ (14) on "Demander un devis".
- Specs & tiers (11) on "Voir les spécifications".
- Landed cost (12) on "Voir le coût rendu".
- Compare (13) on "Comparer".
- Back to source.

## Layout hierarchy
1. App bar - back · share · favorite
2. Product gallery (swipeable)
3. Title block - name · category · verification chip · rating
4. Price block - current price · MOQ · price-tier cue
5. Sticky CTA bar - Add to cart / Demander un devis
6. Quick info cards - Livraison estimée, Garantie, Inspection qualité
7. Specifications preview (3–5 rows + "Voir tout")
8. Description (collapsible)
9. Similar products carousel

## Header architecture
- Back to source.
- Right: share · favorite (icon-only).

## Primary content
- Gallery with thumbnails.
- Title, category, verification chip.
- Price + MOQ.
- Sticky CTA.

## Secondary content
- Quick info cards.
- Specs preview.
- Description.
- Similar products.

## Primary CTA
- "Ajouter au panier" (red, sticky bottom).

## Secondary CTA
- "Demander un devis" (red text link, sticky).
- "Voir les spécifications" text link → 11.
- "Voir le coût rendu" text link → 12.
- "Comparer" text link → 13.

## Components required
- `ProductGallery`
- `StatusChip` (verified)
- `PriceTierTable`
- `SpecificationRow`
- `StickyActionBar`
- `ProductCard` (similar)
- `FavoriteButton`
- `ShareButton`

## Image requirements
- Gallery: 1:1 product photography.
- Similar carousel: 1:1 product photography.

## States
- Loading: skeleton.
- Populated: standard.
- Empty: n/a.
- Error: retry.
- Offline: cached product shown.

## Interactions
- Swipe gallery.
- Tap CTA → action.
- Favorite toggle.
- Share via system share sheet.

## Responsive behavior
- Standard: same layout.
- Tablet: 2-col - gallery on left, info on right.

## Accessibility
- Gallery swipeable + thumbnail buttons.
- Price announced as "Prix XX francs CFA".
- Favorite state announced.

## Localization
- French primary.

## Acceptance criteria
- Price formatted `XX XXX FCFA` (no decimals).
- MOQ visible above CTA.
- Sticky CTA never collides with bottom nav (bottom nav hidden here).
- "Ajouter au panier" disabled if product unavailable.

## Dependencies
- `product` state.
- `cart` state on add.

## Risks
- Image-heavy → lazy-load; aspect-ratio reserved space.

## TODOs
- [x] architecture approved
- [x] components identified
- [x] design tokens mapped
- [x] desktop assumptions removed
- [x] mobile spacing reviewed
- [x] empty state planned
- [x] loading state planned
- [x] error state planned
- [x] accessibility reviewed
- [x] localization reviewed
- [x] business-model rules reviewed
- [x] imagery specified
- [x] acceptance criteria finalized