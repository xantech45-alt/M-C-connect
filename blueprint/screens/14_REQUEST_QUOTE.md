# Screen 14 - Demander un devis (RFQ)

## Purpose
Capture the customer's request for a custom quote from M&C.

## User objective
Get a tailored quote from M&C for a product or product set.

## Business objective
Route RFQ to M&C's quoting team; never expose supplier directly.

## Entry points
- "Demander un devis" on PDP (10), Cart (15), Specs (11), Landed cost (12), Compare (13).
- Messages / quote history (planned).

## Exit points
- Confirmation / pending state (in-place success state).
- Quote received (19) when M&C responds.
- Back to source.

## Layout hierarchy
1. App bar - back · title
2. Product summary (compact card)
3. Form sections
4. Sticky CTA - Submit RFQ

## Header architecture
- Back to source.

## Primary content
- Product summary card: image · title · MOQ.
- Form:
  - Quantité (number input with stepper)
  - Ville de livraison (select)
  - Adresse de livraison (textarea)
  - Délai souhaité (date picker)
  - Notes (textarea, optional)
  - Pièces jointes (file picker, optional)

## Secondary content
- "Comment fonctionne un devis ?" expandable.
- Sample response time ("Réponse sous 24–48 h ouvrées").

## Primary CTA
- "Envoyer ma demande" (red, sticky).

## Secondary CTA
- "Enregistrer comme brouillon" text link.

## Components required
- `RFQForm`
- `TextField`
- `Select`
- `QuantitySelector`
- `DatePicker`
- `FilePicker`
- `StickyActionBar`

## Image requirements
- Product thumbnail.

## States
- Loading: spinner on submit.
- Populated: standard.
- Empty: required fields show errors.
- Error: inline + toast.
- Success: full-screen success state with ETA.
- Offline: draft auto-saves; submit disabled.

## Interactions
- Submit → loading → success state.

## Responsive behavior
- All widths: 1-col form.

## Accessibility
- All fields labelled.
- Error association via aria-describedby.

## Localization
- French primary.

## Acceptance criteria
- Required fields enforced.
- Submit success transitions to confirmation.
- Drafts persist.

## Dependencies
- `rfq` state.

## Risks
- Long response time → set expectations.

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