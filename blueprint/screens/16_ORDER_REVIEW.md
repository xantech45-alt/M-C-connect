# Screen 16 - Récapitulatif

## Purpose
Final review of the order before payment.

## User objective
Confirm shipping, address, costs, and lines.

## Business objective
Reduce last-minute friction; capture consent.

## Entry points
- Cart (15) → "Passer à la commande".

## Exit points
- Payment (17) on continue.
- Edit address → bottom sheet.
- Cart (15) on back.

## Layout hierarchy
1. App bar - back · title
2. Shipping address block (with edit)
3. Shipping option (select)
4. Order lines summary
5. Cost breakdown
6. Terms checkbox
7. Sticky CTA - Confirmer et payer

## Header architecture
- Back to cart.

## Primary content
- Address card with edit affordance.
- Shipping option (Standard, Express - both M&C-managed).
- Lines list (compact).
- Cost breakdown (estimated).
- "J'accepte les conditions" checkbox.

## Secondary content
- "Pourquoi ces frais ?" expandable.

## Primary CTA
- "Confirmer et payer" (red, sticky, disabled until checkbox).

## Secondary CTA
- "Modifier" address.

## Components required
- `CheckoutSummary`
- `AddressCard`
- `Radio` (shipping option)
- `Checkbox` (consent)
- `CostBreakdown`
- `StickyActionBar`

## Image requirements
- None (compact lines).

## States
- Loading: skeleton.
- Populated: standard.
- Empty: n/a.
- Error: address validation error.

## Interactions
- Edit address → bottom sheet.
- Tap line → 10.
- Checkbox toggles CTA enable.

## Responsive behavior
- All widths: 1-col.

## Accessibility
- Checkbox associated with terms text.

## Localization
- French primary.

## Acceptance criteria
- CTA disabled until consent.
- Estimated costs clearly labelled.
- Address valid before proceeding.

## Dependencies
- `checkout` state.

## Risks
- Validation friction → address validation messages clear.

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