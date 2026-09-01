# QUALITY_CONTROL_FLOW

> Inspection report surfaced to customer.

## Stages

### Stage 1 - Notification
- Customer notified when inspection is complete.

### Stage 2 - Tracking hint
- "Voir le rapport qualité" link on 21.

### Stage 3 - QC report (22)
- Verdict, photos, ratings, notes, M&C attribution.
- Optional: download PDF (planned).

### Stage 4 - Follow-up
- "Contacter M&C" if customer has concerns.

## Exit
- 21, 23.

## States
- `qc.report`.

## Acceptance criteria
- Verdict chip visible.
- Photos render progressively.
- Inspector attribution visible.

## Failure / edge cases
- Inspection pending → "Rapport non disponible" + ETA.
- Photos heavy → progressive load.

## Risks
- Customer disputes verdict → support thread.