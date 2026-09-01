# Screen 08 - Filtres

## Purpose
Apply filters and sort to a search.

## User objective
Refine search results.

## Business objective
Help users narrow inventory to relevant SKUs.

## Entry points
- Filter icon from 07.
- Filter chip from Home (planned).

## Exit points
- Search results (07) with filters applied.
- Cancel back to 07 with no change.

## Layout hierarchy
1. Bottom sheet handle
2. Sheet title
3. Filter sections
4. Apply CTA

## Header architecture
- Drag handle dismisses sheet.
- "Effacer" link in header right.

## Primary content (filter sections)
- **Catégorie** (multi-select chips)
- **Prix** (range slider with min/max in FCFA)
- **MOQ** (range)
- **Vérification** (Verified by M&C only toggle)
- **Livraison estimée** (chips: < 14 j, < 30 j, < 60 j)
- **Pays d'origine** (chip multi-select - *but only "Chine" visible to avoid revealing supplier details*)
- **Fournisseur** (hidden - never surfaced; see `15_FRONTEND_SECURITY_BOUNDARIES.md`)

## Secondary content
- Sort row at top (Pertinence, Prix croissant, Prix décroissant, MOQ croissant).

## Primary CTA
- "Appliquer" (red, full-width).

## Secondary CTA
- "Effacer tout" text link.

## Components required
- `BottomSheet`
- `Chip` (multi-select)
- `RangeSlider`
- `Switch`
- `PrimaryButton`
- `Radio` (sort)

## Image requirements
- None.

## States
- Loading: n/a.
- Populated: standard.
- Empty: n/a.
- Error: n/a at sheet level.

## Interactions
- Apply returns to 07 with applied filters.
- Cancel returns to 07 unchanged.

## Responsive behavior
- Phone: full sheet.
- Tablet: half-width sheet.

## Accessibility
- Sheet role="dialog".
- Focus trapped while open.
- Esc closes.

## Localization
- French primary.

## Acceptance criteria
- Filters apply without page reload.
- Active filter chips appear on 07.
- Range sliders show current value as text.

## Dependencies
- `filters` state.

## Risks
- Too many filter sections - keep ≤ 6.

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