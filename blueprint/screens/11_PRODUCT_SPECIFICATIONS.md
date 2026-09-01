# Screen 11 - Spécifications & paliers

## Purpose
Provide detailed specifications and tier pricing for a product.

## User objective
Understand the product deeply and plan quantities.

## Business objective
Help customers optimise their order for unit cost and MOQ.

## Entry points
- "Voir les spécifications" link on PDP (10).

## Exit points
- PDP (10) on back.
- Landed cost (12) on CTA.
- Cart (15) on add.
- RFQ (14) on quote.

## Layout hierarchy
1. App bar - back · title
2. Tabs - Spécifications / Paliers de prix / Garantie
3. Specs section (rows of label + value)
4. Tier pricing table
5. Warranty block
6. Sticky CTA - Add to cart / Demander un devis

## Header architecture
- Back to PDP.
- Title "Spécifications & paliers".

## Primary content
- Specifications table.
- Tier pricing table (qty ranges, unit price, savings).
- Warranty summary.

## Secondary content
- "Pourquoi ces paliers ?" expandable.
- "Voir le coût rendu" link → 12.

## Primary CTA
- "Ajouter au panier" (red, sticky).

## Secondary CTA
- "Demander un devis" text link.

## Components required
- `Tabs`
- `PriceTierTable`
- `SpecificationRow`
- `StickyActionBar`

## Image requirements
- None.

## States
- Loading: skeleton.
- Populated: standard.
- Empty: n/a.
- Error: retry banner.

## Interactions
- Tap tabs.
- Tier row selectable as quantity (planned).

## Responsive behavior
- All widths: 1-col.

## Accessibility
- Tables semantic.
- Tier table headers announced.

## Localization
- French primary.

## Acceptance criteria
- Tier table sorts ascending by quantity.
- Active tier highlighted (if quantity set).
- Specifications empty fallback: "Aucune spécification fournie".

## Dependencies
- `product` state.

## Risks
- Long tables - virtualise on overflow.

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