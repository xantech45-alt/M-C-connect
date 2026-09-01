# CART_CHECKOUT_FLOW

> Cart through payment to order confirmation.

## Stages

### Stage 1 - Cart (15)
- Lines, MOQ warnings, totals.
- "Passer à la commande" → 16.

### Stage 2 - Order review (16)
- Address (with edit).
- Shipping option.
- Lines summary.
- Cost breakdown.
- Consent checkbox → "Confirmer et payer" → 17.

### Stage 3 - Payment (17)
- Payment option list.
- "Payer" → loading → success or failure.

### Stage 4 - Confirmation (18)
- Order ID, ETA, summary.
- Mini-timeline of next steps.
- "Voir ma commande" → 21.
- "Continuer mes achats" → 04.

## Exit
- 18 (terminal success).

## States
- `cart`, `checkout.address`, `checkout.shipping`, `checkout.payment`, `orders.draft`, `orders.placed`.

## Acceptance criteria
- CTA disabled until consent.
- Costs labelled estimated.
- Confirmation always reachable from 21.

## Failure / edge cases
- Stock change between cart and order → banner.
- Payment provider failure → retry + support.
- App killed mid-flow → cart persists.

## Risks
- Drop-off → consent friction minimised; progress visible.