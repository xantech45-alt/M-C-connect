# ORDER_TRACKING_FLOW

> Order placement through delivery.

## Stages

### Stage 1 - Order list (20)
- Tab "Commandes".
- Filter by status.
- Tap → 21.

### Stage 2 - Tracking (21)
- Status banner + ETA.
- Multi-step timeline.
- Current step emphasised.
- "Voir le rapport qualité" when QC complete.

### Stage 3 - QC report (22) [optional]
- Verdict, photos, ratings, notes.
- M&C attribution.

### Stage 4 - Delivered
- Status moves to "Livrée".
- Notification surfaces.
- Order moves to "Livrées" tab.

## Exit
- 23 (support), 22 (QC), 20 (back).

## States
- `orders.list`, `orders.tracking`, `qc.report`.

## Acceptance criteria
- Timeline accurate to last update.
- QC report available only after inspection.
- Status attributed to M&C.

## Failure / edge cases
- Delayed status → warning tone + last update timestamp.
- Offline → cached values; banner.

## Risks
- Customer confusion when delayed → clear copy.