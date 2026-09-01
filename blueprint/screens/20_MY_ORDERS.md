# Screen 20 - Mes commandes

## Purpose
List all orders with status and entry to detail.

## User objective
Find an order and see its current state.

## Business objective
Drive engagement, reduce support load.

## Entry points
- Tab tap "Commandes".
- Deep link `mc://orders`.

## Exit points
- Order tracking (21).
- Quality report (22) when QC report ready.
- Profile tab.

## Layout hierarchy
1. App bar - title · filter icon
2. Tabs - Toutes · En cours · Livrées · Annulées
3. Order list (cards)
4. Empty state
5. Bottom nav

## Header architecture
- Title "Mes commandes".
- Filter icon (right) - quick status filter.

## Primary content
- Order cards: thumbnail · product · status chip · ETA · total · "Voir le suivi" link.

## Secondary content
- Date grouping (planned: "Cette semaine", "Plus tôt").

## Primary CTA
- Tap an order card.

## Secondary CTA
- "Voir le suivi" inline link.

## Components required
- `OrderCard`
- `Tabs`
- `EmptyState`
- `Chip` (filter)

## Image requirements
- 4:3 product thumbnail.

## States
- Loading: skeleton cards.
- Populated: standard.
- Empty: friendly + CTA.
- Error: retry banner.
- Offline: cached; banner.

## Interactions
- Pull-to-refresh.
- Tap card → 21.

## Responsive behavior
- All widths: 1-col list.

## Accessibility
- List semantics; card focus order.

## Localization
- French primary.

## Acceptance criteria
- Filters update list instantly.
- Order status chip accurate.

## Dependencies
- `orders` state.

## Risks
- Long lists → virtualise.

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