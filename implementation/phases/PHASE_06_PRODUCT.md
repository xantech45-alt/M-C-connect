# Phase 06 - Product decision

**Objective:** Implement screens 10–14.
**Dependencies:** Phase 05.

## Screens

- [ ] **10 Fiche produit** (`src/routes/ProductDetail.tsx`)
  - Gallery + thumbnails + zoom.
  - Title · category · price · MOQ · trust badge.
  - Tier pricing (entry to `PriceTierTable`).
  - Landed-cost preview entry.
  - Sticky: Demander un devis + Ajouter au panier.
- [ ] **11 Spécifications & paliers** (`src/routes/ProductSpecs.tsx`)
  - Specifications table.
  - Full tier pricing.
- [ ] **12 Coût rendu Bamako** (`src/routes/LandedCost.tsx`)
  - `<LandedCostPanel>` - itemised rows + ESTIMATION badge + disclaimer.
  - Coût unitaire rendu.
- [ ] **13 Comparer** (`src/routes/Compare.tsx`)
  - Up to 3 products side-by-side.
  - `<ComparisonTable>`.
- [ ] **14 Demander un devis** (`src/routes/RequestQuote.tsx`)
  - `<RFQForm>` multi-field.
  - Draft auto-save.
  - Submission → success state with ETA.

## Checklist

- [ ] All trust signals use M&C attribution ("Vérifié par M&C Connect").
- [ ] No supplier contact surfaces anywhere.
- [ ] Sticky CTA on PDP hides in-content CTA only when scrolled past.
- [ ] Tier-pricing compute unit tests pass.
- [ ] Landed-cost compute unit tests pass.
- [ ] One primary red CTA per screen.

## Exit gate

- PDP loads, gallery swipes, specs render, tier table renders, MOQ visible.
- Landed cost itemises every fee.
- RFQ submits to mock and shows success.
