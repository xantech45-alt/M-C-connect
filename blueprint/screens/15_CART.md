# Screen 15 - Panier

## Purpose
Review cart lines, quantities, MOQ compliance, and totals.

## User objective
Confirm items and proceed to checkout.

## Business objective
Convert cart to order.

## Entry points
- "Voir le panier" from Home cart indicator (planned).
- Tap cart icon in app bar (planned).
- Add-to-cart success toast → "Voir le panier" link.

## Exit points
- Order review (16).
- PDP (10) on product tap.
- Empty state → Products tab.

## Layout hierarchy
1. App bar - back · title
2. Vendor line ("M&C Connect")
3. Cart lines (one card each)
4. Promo code input (planned)
5. Cost summary
6. Sticky CTA - Passer à la commande

## Header architecture
- Back to source.
- Title "Panier".

## Primary content
- Vendor banner - single line "M&C Connect" with verification icon.
- Cart lines: image · title · unit price · MOQ · quantity stepper · total line · remove.
- Cost summary:
  - Sous-total
  - Frais estimés (livraison + douane + gestion)
  - Total estimé

## Secondary content
- "Continuer mes achats" text link.
- MOQ warnings per line.

## Primary CTA
- "Passer à la commande" (red, sticky).

## Secondary CTA
- "Vider le panier" text link (with confirm).

## Components required
- `CartLine`
- `QuantitySelector`
- `CostBreakdown`
- `StickyActionBar`
- `EmptyState`

## Image requirements
- 1:1 product thumbnails.

## States
- Loading: skeleton lines.
- Populated: standard.
- Empty: friendly + CTA.
- Error: line item unavailable banner.
- MOQ not met: warning chip.

## Interactions
- Quantity change updates totals.
- Remove → confirm + undo toast.
- Tap line → 10.

## Responsive behavior
- All widths: 1-col cart lines.

## Accessibility
- Stepper buttons labelled "+" / "−".
- Quantity value announced.

## Localization
- French primary.

## Acceptance criteria
- Quantity respects MOQ; warning if below.
- Cost totals in FCFA, no decimals.
- "Vider le panier" requires confirm.

## Dependencies
- `cart` state.

## Risks
- Stock changes → invalidate cart.

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