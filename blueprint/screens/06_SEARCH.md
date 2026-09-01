# Screen 06 - Recherche active

## Purpose
Provide a focused search experience with live suggestions and recent history.

## User objective
Type a query and find products.

## Business objective
Drive discovery and shorten time-to-RFQ.

## Entry points
- Tap search bar on Home (04).
- Tap search icon on Categories (05).
- Deep link `mc://search?q=...`.

## Exit points
- Search results (07).
- Image search (09) via camera icon.
- Back to entry screen.

## Layout hierarchy
1. App bar - back · search input (expanded) · voice · camera
2. Recent searches (when input empty)
3. Live suggestions (when typing)
4. Trending searches (optional)
5. Trending categories chips

## Header architecture
- Back button replaces search bar's "close" affordance.
- Input is the focus on entry.

## Primary content
- Text input with autosuggest.
- Recent searches list (tap to refill).
- Trending searches chips.

## Secondary content
- "Effacer l'historique" text link.
- Trending categories chips (link to filtered search).

## Primary CTA
- Tap a recent search OR submit query.

## Secondary CTA
- Camera icon (image search).
- Voice input (planned).

## Components required
- `SearchBar`
- `Chip` (recent, trending, categories)
- `List` (recent searches)
- `TextLink`

## Image requirements
- None (search-only screen).

## States
- Loading: spinner on autosuggest.
- Populated: standard.
- Empty: recent + trending.
- Error: retry banner.

## Interactions
- Type → debounced autosuggest (300 ms).
- Tap suggestion → 07 with prefilled query.
- Tap recent → 07 with prefilled query.
- Tap camera → 09.

## Responsive behavior
- Standard: full screen layout.
- Tablet: input max-width 480 dp centered.

## Accessibility
- Input has label "Rechercher un produit".
- Suggestions list announced via live region.

## Localization
- French primary; placeholder strings.

## Acceptance criteria
- Autosuggest responds within 300 ms of keystroke.
- Recent searches persist locally.
- Voice and camera icons always visible.

## Dependencies
- `search` state.
- `recentSearches` local persistence.

## Risks
- Empty results → 07 handles.

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