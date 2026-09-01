# Screen 13 - Comparer

## Purpose
Side-by-side comparison of 2–3 products.

## User objective
Pick between products.

## Business objective
Help customers decide; reduce ambiguity.

## Entry points
- "Comparer" link on PDP (10) with prior comparison set.
- "Ajouter à la comparaison" from PDP.

## Exit points
- PDP (10) on product tap.
- Cart (15) on add.
- RFQ (14) on quote.

## Layout hierarchy
1. App bar - back · title · "Vider" link
2. Comparison rows (attribute by attribute)
3. Sticky CTA - Demander un devis groupé / Ajouter tout au panier

## Header architecture
- Back to source.
- "Vider" text link clears comparison set.

## Primary content
- Row per attribute:
  - Image
  - Title
  - Price + MOQ
  - Verification
  - Lead time
  - Warranty
  - Inspection quality
  - Specs (key features)
  - Landed cost (link)
  - Action - "Ajouter au panier" / "Demander un devis"

## Secondary content
- Header row with product images + names (sticky at top).

## Primary CTA
- "Demander un devis groupé" (red, sticky) for RFQ on multiple products.

## Secondary CTA
- Per-product "Ajouter au panier" inline buttons.

## Components required
- `ComparisonTable`
- `StickyActionBar`
- `ProductCard` (compact)
- `StatusChip`

## Image requirements
- 1:1 product thumbnails.

## States
- Loading: skeleton.
- Populated: standard.
- Empty: "Aucun produit à comparer" + CTA "Voir les produits".
- Error: retry banner.

## Interactions
- Tap product header → 10.
- Tap attribute row → expand (if long).
- Swipe row horizontally (mobile).

## Responsive behavior
- Standard: rows scroll horizontally if wider than viewport.
- Tablet: rows visible without horizontal scroll.

## Accessibility
- Tables semantic; row headers.

## Localization
- French primary.

## Acceptance criteria
- Max 3 products.
- "Vider" requires confirmation.
- Attribute values always rendered, never blank.

## Dependencies
- `comparison` state.

## Risks
- Attribute mismatch across categories - limit to compatible categories.

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