# Screen 22 - Rapport de contrôle qualité

## Purpose
Display the quality inspection report from M&C.

## User objective
Verify product quality before shipment.

## Business objective
Build trust; deliver a key managed-commerce value.

## Entry points
- "Voir le rapport qualité" link on Tracking (21).
- Notification (QC complete).
- Deep link `mc://order/:id/qc/:reportId`.

## Exit points
- Tracking (21) on back.
- Message thread (23) for follow-up.

## Layout hierarchy
1. App bar - back · title
2. Verdict banner
3. Photo grid
4. Rating rows
5. Notes
6. Inspector attribution
7. Action - Contacter M&C

## Header architecture
- Back to tracking.
- Title "Rapport qualité".

## Primary content
- Verdict: "Approuvé" / "Approuvé avec remarques" / "Rejeté".
- Photo grid (4:3 thumbnails) - inspection photos.
- Rating rows: Conformité packaging · Conformité produit · Conformité quantité · État général.
- Notes (paragraph).
- Inspector attribution: "Inspecté par l'équipe qualité M&C Connect".

## Secondary content
- "Voir le rapport PDF" link (planned).

## Primary CTA
- "Contacter M&C" (red, sticky or inline).

## Secondary CTA
- "Voir le rapport PDF" text link.

## Components required
- `QualityInspectionPanel` (Feature)
- `StatusChip`
- `ImageGrid`
- `StickyActionBar`

## Image requirements
- 4:3 inspection photos.

## States
- Loading: skeleton.
- Populated: standard.
- Empty: "Rapport non disponible" + ETA when pending.
- Error: retry banner.

## Interactions
- Tap photo → full-screen viewer.
- Tap rating row → expand.

## Responsive behavior
- 1-col; photo grid 2x2.

## Accessibility
- Photos have descriptive alt.

## Localization
- French primary.

## Acceptance criteria
- Verdict chip visible at top.
- Inspector attribution visible.
- Photos load progressively.

## Dependencies
- `qc` state.

## Risks
- Heavy photos → progressive load.

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