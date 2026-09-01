# PRODUCT_DECISION_FLOW

> From product pageview to add-to-cart or RFQ.

## Stages

### Stage 1 - Product detail (10)
- Gallery, title, price, MOQ.
- Sticky CTA - Add to cart.
- Secondary actions - Demander un devis, Comparer, Voir spécifications, Voir coût rendu.

### Stage 2 - Specs & tiers (11) [optional]
- Tab - Spécifications, Paliers, Garantie.
- Return to 10.

### Stage 3 - Landed cost (12) [optional]
- Quantity stepper, breakdown, disclaimer.
- Return to 10.

### Stage 4 - Compare (13) [optional]
- Add to comparison set (max 3).
- Compare screen.

### Stage 5 - Add to cart (15)
- Sticky CTA → 15 with new line.

### Stage 6 - RFQ (14)
- "Demander un devis" → 14.
- Submit → success state.

## Exit
- 15, 14, 18 (after cart+checkout).

## States
- `product.detail`, `comparison`, `rfq.draft`, `cart`.

## Acceptance criteria
- One sticky CTA per screen (Add to cart) + secondary RFQ link.
- Estimated vs confirmed distinguished.
- No supplier contact surfaces.

## Failure / edge cases
- Product unavailable → CTA disabled with banner.
- Add-to-cart fails → retry + support link.
- RFQ submission failure → retry; draft persists.