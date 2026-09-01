# Screen 19 - Devis reçu

## Purpose
Display the M&C-issued quote and let the customer accept or request changes.

## User objective
Review the quote and decide.

## Business objective
Convert quote to order or iterate.

## Entry points
- Notification (quote ready).
- RFQ history (planned).
- Deep link `mc://rfq/:id`.

## Exit points
- Cart (15) if quote converts to order.
- Message thread (23) to discuss.
- Back to source.

## Layout hierarchy
1. App bar - back · title
2. Quote status banner
3. Quote summary card (product, quantity)
4. Itemised cost breakdown (CONFIRMED lines)
5. Validity period
6. Terms
7. Primary CTA - Accepter et commander
8. Secondary - Demander une modification

## Header architecture
- Back to source.
- Title "Devis reçu".

## Primary content
- Quote status: "Devis prêt".
- Quote ID.
- Product summary.
- Cost breakdown - every line labelled **confirmé** (not estimated).
- Validity period ("Valable jusqu'au 25 août 2026").
- Terms summary.

## Secondary content
- "Comparer avec d'autres produits" link.
- "Voir le coût rendu estimé" link.

## Primary CTA
- "Accepter et commander" (red).

## Secondary CTA
- "Demander une modification" (text link → 23).

## Components required
- `QuoteResponse` (Feature)
- `CostBreakdown` (confirmed variant)
- `StickyActionBar`

## Image requirements
- Product thumbnail.

## States
- Loading: skeleton.
- Populated: standard.
- Empty: n/a.
- Expired: banner "Ce devis a expiré" + CTA to re-request.
- Error: retry banner.

## Interactions
- Accept → 15 with quote data preloaded.
- Modify → 23 with pre-filled content.

## Responsive behavior
- All widths: 1-col.

## Accessibility
- Validity period announced.
- Status announced.

## Localization
- French primary.

## Acceptance criteria
- Confirmed lines distinct from estimated.
- Validity countdown visible.
- Accept creates order draft.

## Dependencies
- `quote` state.

## Risks
- Expired quotes handled explicitly.

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