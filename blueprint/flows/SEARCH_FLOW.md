# SEARCH_FLOW

> Text-based product search.

## Stages

### Stage 1 - Entry
- Tap search bar from Home (04) or Categories (05).
- Land on 06.

### Stage 2 - Input
- Recent searches (when empty).
- Type → autosuggest (debounced 300 ms).
- Tap suggestion or recent → 07 with prefilled query.

### Stage 3 - Results (07)
- Filter icon → 08 (sheet).
- Sort icon → bottom sheet.
- Tap product → 10.

### Stage 4 - Refinement
- Apply filter → return to 07 with active filter chips.
- Sort → return to 07 with new order.
- Pull-to-refresh → re-query.

## Exit
- 07 (results), 10 (PDP).

## States
- `search.query`, `search.filters`, `search.results`, `search.recent`.

## Acceptance criteria
- Autosuggest responds within 300 ms.
- Filters apply without page reload.
- Empty state shows suggestions.

## Failure / edge cases
- No results → empty state + suggestions.
- Backend latency → skeleton stays.
- Offline → banner + cached where available.