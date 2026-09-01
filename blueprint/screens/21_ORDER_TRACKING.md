# Screen 21 - Suivi de commande

## Purpose
Provide a transparent, multi-stage progress view of an order.

## User objective
Know where their order is and when it arrives.

## Business objective
Build trust through transparency.

## Entry points
- Order card (20).
- Deep link `mc://order/:id`.
- Notification (status change).

## Exit points
- Quality report (22) when QC complete.
- Message thread (23) for support.
- Order list (20) on back.

## Layout hierarchy
1. App bar - back · title · share · support
2. Status banner (current state + ETA)
3. Timeline (visual steps)
4. Items summary
5. Cost summary (compact)
6. Action - Contacter M&C

## Header architecture
- Back to order list.
- Right: share, contact support (icon buttons).

## Primary content
- Status banner: "En transit international" with ETA.
- Timeline nodes:
  - Order confirmed (completed)
  - Supplier sourcing (completed)
  - Production (completed)
  - Quality inspection (in progress)
  - Ready for shipment (pending)
  - International transit (pending)
  - Customs clearance (pending)
  - Local delivery (pending)
  - Delivered (pending)
- Each node: icon + label + timestamp + short explanation.

## Secondary content
- "Voir le rapport qualité" link (when QC complete).
- "Voir les détails" expandable.

## Primary CTA
- "Contacter M&C" (red).

## Secondary CTA
- "Voir le rapport qualité" text link.

## Components required
- `ShipmentTimeline` (Feature)
- `OrderCard` (compact)
- `StickyActionBar` (replaced by inline button here)

## Image requirements
- None.

## States
- Loading: skeleton timeline.
- Populated: standard.
- Empty: n/a.
- Error: retry.
- Delayed: status chip warning tone.

## Interactions
- Tap node → expand details.

## Responsive behavior
- All widths: 1-col; horizontal scroll if timeline overflows.

## Accessibility
- Timeline list semantic.
- Current step announced.

## Localization
- French primary.

## Acceptance criteria
- Current state visually emphasised.
- Completed states styled distinctly.
- ETA visible and updates.
- Status attributed to M&C, not supplier.

## Dependencies
- `orders` state.

## Risks
- Late updates - surface last update timestamp.

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