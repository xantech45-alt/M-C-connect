# Screen 12 - Coût rendu Bamako

## Purpose
Provide a transparent, itemised landed-cost breakdown delivered to Bamako.

## User objective
Know the total cost including shipping, customs, and handling.

## Business objective
Build trust through transparent pricing - a managed-commerce core value.

## Entry points
- "Voir le coût rendu" link on PDP (10).
- Sticky CTA on PDP (10).
- Cart summary on 15.

## Exit points
- PDP (10) on back.
- Cart (15) on add-to-cart.
- RFQ (14) on quote.

## Layout hierarchy
1. App bar - back · title
2. Quantity selector (top)
3. Destination selector (Bamako default)
4. Itemised cost breakdown
5. Total summary (sticky-ish)
6. Disclaimer
7. Sticky CTA

## Header architecture
- Back to PDP.
- Title "Coût rendu Bamako".

## Primary content
- Quantity stepper.
- Destination dropdown (Bamako).
- Cost breakdown:
  - Sous-total produit
  - Frais de livraison internationale (estimé)
  - Frais de douane (estimé)
  - Frais de gestion M&C
  - -
  - **Total rendu Bamako**
  - Coût unitaire rendu
- Disclaimer: "Estimation - le coût confirmé sera fourni dans votre devis M&C."

## Secondary content
- "Voir les spécifications" link.
- FAQ link.

## Primary CTA
- "Ajouter au panier" (red, sticky).

## Secondary CTA
- "Demander un devis" text link.

## Components required
- `LandedCostPanel`
- `QuantitySelector`
- `Select` (destination)
- `StickyActionBar`
- `Disclaimer`

## Image requirements
- None.

## States
- Loading: skeleton.
- Populated: standard.
- Empty: n/a.
- Error: "Estimation indisponible".

## Interactions
- Quantity change updates breakdown.
- Destination change updates estimate.

## Responsive behavior
- All widths: 1-col.

## Accessibility
- Cost lines announced with currency.
- Disclaimer associated via aria-describedby.

## Localization
- French primary.

## Acceptance criteria
- Estimated lines labelled "estimé".
- Confirmed lines (from quote) labelled "confirmé".
- Unit cost = total / quantity.
- Disclaimer always visible.

## Dependencies
- `landedCost` state.

## Risks
- Discrepancy between estimate and confirmed → disclaimer mandatory.

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