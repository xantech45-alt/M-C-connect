# Screen 24 - Tableau de bord entreprise

## Purpose
Show the customer's import activity and trends.

## User objective
Understand spend, delivery performance, and category mix.

## Business objective
Drive repeat purchases through insight.

## Entry points
- Profile tab → "Tableau de bord".
- Notification (insight card).
- Deep link.

## Exit points
- Orders list (20).
- Category filtered search.
- Profile tab.

## Layout hierarchy
1. App bar - title · period selector
2. KPI tile row (2x2 on phone; 4x1 on XL/tablet)
3. Trend chart (line)
4. Category distribution (horizontal bar list)
5. Recent orders (3–5 cards)
6. Insight card
7. Bottom nav

## Header architecture
- Title "Tableau de bord".
- Period selector (right): Semaine / Mois / Trimestre / Année.

## Primary content
- KPI tiles:
  - Dépenses totales
  - Commandes
  - Livrées
  - En cours
- Trend line (period-aligned).
- Category mix.
- Recent orders.

## Secondary content
- Insight card with descriptive copy.

## Primary CTA
- Tap a KPI tile (planned: drill down).

## Secondary CTA
- "Voir toutes les commandes" link → 20.

## Components required
- `AnalyticsSummary` (Feature)
- `KPIValue`
- `LineChart`
- `OrderCard` (compact)
- `Select` (period)

## Image requirements
- None (data viz).

## States
- Loading: skeleton.
- Populated: standard.
- Empty (no orders): zero-state + CTA.
- Error: retry banner.

## Interactions
- Period change updates all sections.
- Tap category → filtered orders.

## Responsive behavior
- Phone: 2x2 KPI, 1-col chart, 1-col recents.
- Tablet: 4x1 KPI, 2-col chart + categories.

## Accessibility
- Charts have data tables as fallback (a11y).
- KPI numbers announced.

## Localization
- French primary.

## Acceptance criteria
- Numbers formatted `XX XXX FCFA`.
- Period selector applies instantly.
- Recent orders limited to 5.

## Dependencies
- `analytics` state.

## Risks
- Performance - chart libraries must be lightweight.

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