# Screen 05 - Toutes les catégories

## Purpose
Browse the full category catalog.

## User objective
Find a category of products to browse.

## Business objective
Surface all inventory verticals.

## Entry points
- Tap "Produits" tab → sub-entry "Catégories".
- Tap "Voir tout" on category strip from Home.
- Deep link `mc://category/:slug`.

## Exit points
- Search results (07) filtered by category.
- Product detail (10) for featured product (optional).
- Back to Home.

## Layout hierarchy
1. App bar - back · title · search icon
2. Search input
3. Category grid (2-3 columns)
4. Featured banner (optional)

## Header architecture
- Back to previous.
- Search icon (right) → 06.

## Primary content
- 2-column grid on phones; 3-column on tablet.
- Each tile: line icon + label + product count badge.

## Secondary content
- Featured banner above the grid (rare).

## Primary CTA
- Tap a category tile.

## Secondary CTA
- Search input above the grid.

## Components required
- `CategoryTile`
- `SearchBar`
- `Banner` (optional)
- `Grid` (2-col, 3-col)

## Image requirements
- Category tiles: line icons + label, no photo background.
- Featured banner: contextual photo 16:9 (rare).

## States
- Loading: skeleton grid.
- Populated: standard.
- Empty: n/a (always populated).
- Error: retry banner.

## Interactions
- Tap category → 07 with category filter applied.
- Tap featured banner → deep link to product/category.
- Tap search → 06.

## Responsive behavior
- 320–599: 2 cols.
- 600+: 3 cols.

## Accessibility
- Tiles are buttons with text labels.
- Focus ring visible.

## Localization
- French primary category names.
- English secondary.

## Acceptance criteria
- All categories render.
- Tap navigation respects filter state.
- Featured banner shown only when configured.

## Dependencies
- `categories` state.

## Risks
- Category names too long - enforce 1–2 lines.

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