# Screen 07 - Résultats de recherche

## Purpose
Display matching products for a query with filters and sort.

## User objective
Find a product to inspect.

## Business objective
Convert discovery to product decision.

## Entry points
- Search submit (06).
- Filter apply (08).
- Deep link with query.

## Exit points
- Product detail (10).
- Filters (08).
- Sort sheet.
- Back to 06.

## Layout hierarchy
1. App bar - back · query summary · filter icon · sort icon
2. Result count + active filters (chips)
3. Product grid (2 columns)
4. Empty state if no results
5. Pagination / infinite scroll

## Header architecture
- Back button.
- Filter icon (right) → 08.
- Sort icon (right of filter) → sort sheet.

## Primary content
- Result count "XX produits".
- Active filter chips (dismissible).
- Product grid (2 columns on phones).

## Secondary content
- "Suggestions de recherche" chips when empty.

## Primary CTA
- Tap a product card.

## Secondary CTA
- Tap a filter chip to remove.
- "Effacer tous les filtres" link.

## Components required
- `ProductCard` (grid variant)
- `Chip` (active filter)
- `BottomSheet` (sort)
- `EmptyState`

## Image requirements
- 1:1 product photography on every card.

## States
- Loading: skeleton grid.
- Populated: standard.
- Empty: friendly empty + suggestions.
- Error: retry banner.
- Offline: banner; cached results shown if available.

## Interactions
- Tap product → 10.
- Tap filter icon → 08.
- Tap sort icon → bottom sheet.
- Pull-to-refresh.

## Responsive behavior
- 320–599: 2 cols.
- 600+: 3 cols.

## Accessibility
- Result count announced.
- Filter chips dismissible and announced.
- Skeleton has aria-busy="true".

## Localization
- French primary; "produits" singular/plural.

## Acceptance criteria
- Results load within 1 s on mid-range Android.
- Pagination handles up to 1000 results without jank.
- Empty state shows suggestions.

## Dependencies
- `search` state, `filters` state, `catalog`.

## Risks
- Slow backend → skeleton stays visible.

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