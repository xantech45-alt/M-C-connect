# Phase 08 - Fulfillment

**Objective:** Implement screens 20–22.
**Dependencies:** Phase 07.

## Screens

- [ ] **20 Mes commandes** (`src/routes/Orders.tsx`)
  - Tabs: En cours · Livrées · Toutes.
  - `<OrderCard>` list.
  - Pull-to-refresh.
- [ ] **21 Suivi de commande** (`src/routes/OrderTracking.tsx`)
  - Status header + ETA.
  - `<ShipmentTimeline>` - vertical; completed / current / pending / delayed / exception distinguishable by icon + label, never colour alone.
  - Sticky: Contacter le support.
- [ ] **22 Rapport QC** (`src/routes/QualityControl.tsx`)
  - `<QualityInspectionPanel>` - verdict + photos + checklist + observations.
  - Sticky: Approuver / Contester.

## Checklist

- [ ] All statuses map through `src/data/statusMap.ts` (single source of truth).
- [ ] Tracking timeline renders correctly for all 5 visual states.
- [ ] No supplier identity surfaces.
- [ ] One primary red CTA per screen.
- [ ] Empty / loading / error states defined.

## Exit gate

- Order list loads.
- Tracking timeline renders.
- QC report screen renders with verdict + photos.
