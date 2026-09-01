# Screen 18 - Commande confirmée

## Purpose
Confirm to the customer that the order has been placed.

## User objective
Confirm receipt and choose next action.

## Business objective
Set expectations, drive engagement (tracking, share).

## Entry points
- Payment success (17 → 18).

## Exit points
- Order tracking (21).
- Home (04).
- Mes commandes (20).

## Layout hierarchy
1. App bar - close
2. Success icon (green)
3. Headline - "Commande confirmée"
4. Order summary card
5. Next steps timeline (compact)
6. Primary action - Voir ma commande
7. Secondary actions - Continuer mes achats, Partager la commande

## Header architecture
- Close returns to Home.

## Primary content
- Order ID and ETA.
- Summary card: order total · delivery address · method.
- "Que se passe-t-il maintenant ?" mini-timeline:
  - Confirmation M&C
  - Sourcing du produit
  - Contrôle qualité
  - Expédition
  - Livraison Bamako

## Secondary content
- "Besoin d'aide ?" link.

## Primary CTA
- "Voir ma commande" (red).

## Secondary CTA
- "Continuer mes achats" text link.
- "Partager" text link.

## Components required
- `OrderCard` (compact)
- `OrderConfirmation` (Feature)
- `PrimaryButton`

## Image requirements
- None.

## States
- Loading: success always assumed.
- Populated: standard.
- Empty: n/a.
- Error: n/a (terminal success state).

## Interactions
- Tap CTA → 21.

## Responsive behavior
- All widths: 1-col.

## Accessibility
- Success announced via live region.

## Localization
- French primary.

## Acceptance criteria
- Order ID matches backend.
- CTA navigates to correct order.

## Dependencies
- `orders` state.

## Risks
- Customer confusion about "next steps" - explicit timeline required.

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