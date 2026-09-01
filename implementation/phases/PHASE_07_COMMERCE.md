# Phase 07 - Commerce

**Objective:** Implement screens 15–19.
**Dependencies:** Phase 06.

## Screens

- [ ] **15 Panier** (`src/routes/Cart.tsx`)
  - Cart lines with thumbnail + name + variant + MOQ + unit price + quantity + total.
  - `<CartLine>` + `<QuantitySelector>`.
  - `<CheckoutSummary>` collapsible.
  - Sticky: Passer à la commande.
- [ ] **16 Récapitulatif** (`src/routes/OrderReview.tsx`)
  - Business · Delivery · Order · Review sections.
  - Charges visible.
  - Sticky: Confirmer et payer.
- [ ] **17 Paiement** (`src/routes/Payment.tsx`)
  - `<PaymentOption>` list - M&C-managed options only (Mobile Money, Virement bancaire, Paiement à la livraison).
  - Sticky: Payer maintenant.
- [ ] **18 Commande confirmée** (`src/routes/OrderConfirmation.tsx`)
  - `<OrderConfirmation>` success icon + reference + next steps.
  - Sticky: Voir mes commandes.
- [ ] **19 Devis reçu** (`src/routes/QuoteReceived.tsx`)
  - `<QuoteResponse>` - M&C branding + breakdown + Accept / Decline.
  - Sticky: Accepter le devis.

## Checklist

- [ ] MOQ respected; quantity selector never drops below MOQ.
- [ ] Destructive actions (remove from cart) confirm via bottom sheet + undo toast.
- [ ] Payment options are M&C-managed only.
- [ ] One primary red CTA per screen.
- [ ] Empty / loading / error states defined.

## Exit gate

- Cart updates persist (localStorage).
- Checkout flow completes to confirmation screen.
- RFQ response screen renders M&C attribution.
