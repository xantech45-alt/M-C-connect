# Screen 17 - Paiement

## Purpose
Collect the payment method via M&C-managed channels.

## User objective
Pay for the order.

## Business objective
Securely capture payment intent via M&C.

## Entry points
- Order review (16) → "Confirmer et payer".

## Exit points
- Confirmation (18) on success.
- Retry on failure.

## Layout hierarchy
1. App bar - back · title
2. Order summary (compact)
3. Payment options (radio list)
4. Selected method details
5. Sticky CTA - Payer

## Header architecture
- Back to order review.

## Primary content
- Compact order summary (3 lines: count, total, ETA).
- Payment options (mobile money, bank transfer, M&C credit):
  - Logo · Label · Selected indicator
  - Per-method helper text (e.g. "Vous recevrez une demande de confirmation sur votre téléphone.")
- Sticky CTA.

## Secondary content
- "Mes moyens de paiement enregistrés" section (planned).
- Security microcopy.

## Primary CTA
- "Payer" (red, sticky).

## Secondary CTA
- "Modifier" order link.

## Components required
- `PaymentOption`
- `CheckoutSummary` (compact)
- `StickyActionBar`

## Image requirements
- Payment option logos (small, 1:1).

## States
- Loading: spinner.
- Populated: standard.
- Empty: n/a.
- Error: banner + retry.
- Success: navigates to 18.

## Interactions
- Select option → method-specific fields appear.

## Responsive behavior
- All widths: 1-col.

## Accessibility
- Radio semantics.

## Localization
- French primary.

## Acceptance criteria
- Only M&C-managed payment methods shown.
- No direct bank transfer to supplier exposed.
- CTA disabled until method selected.

## Dependencies
- `checkout` state.

## Risks
- Payment provider downtime → retry + support.

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