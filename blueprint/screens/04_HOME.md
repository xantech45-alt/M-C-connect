# Screen 04 - Accueil (Home)

## Purpose
Provide a single starting point for discovery, current order visibility, and recommendations.

## User objective
Find what they need quickly, see where their last order is, and resume recent activity.

## Business objective
Drive discovery, repeat purchases, and order engagement.

## Entry points
- Tab tap (Accueil).
- Login success.
- Order confirmation back.

## Exit points
- Search results (06, 07)
- Categories (05)
- Image search (09)
- Order tracking (21)
- Product detail (10)
- Messages (23)
- Profile (Profile tab)
- Notifications

## Layout hierarchy
1. App bar - logo · notifications · profile avatar
2. Search bar (sticky)
3. Current order card (if any) - single most-recent active order
4. Category strip - 6 horizontal tiles
5. Recommendations - "Pour vous" carousel
6. Recent activity - "Récemment consultés" carousel
7. Banner (occasional) - service upgrade / new feature
8. Bottom nav

## Header architecture
- M&C logo (left).
- Notification bell (with badge).
- Profile avatar (right).

## Primary content
- Sticky search bar with text + voice + camera icons.
- Current order card: order title · status chip · ETA · "Voir le suivi" CTA.
- Category strip: 6 most-used categories (icons + labels).
- Recommendations: 6–10 product cards in a horizontal carousel.

## Secondary content
- "Voir tout" text links per section.
- Recent activity carousel (product thumbnails).

## Primary CTA
- Tap a category OR tap a product card OR tap search input.

## Secondary CTA
- "Voir le suivi" on current order card.
- "Voir tout" on each section.

## Components required
- `SearchBar`
- `OrderCard` (active variant)
- `CategoryTile`
- `ProductCard`
- `StatusChip`
- `NotificationButton`
- `Avatar`
- `Banner`

## Image requirements
- Product cards: 1:1 product photography.
- Category tiles: line icon + label; no decorative photo.
- Banner: 16:9 contextual import imagery.

## States
- Loading: skeleton for current order, categories, recommendations.
- Populated: standard.
- Empty (no orders): "Aucune commande en cours" tile with CTA "Découvrir les produits".
- Empty (no recs): hide section.
- Error: retry banner; sections render skeletons.
- Offline: cached content; banner.

## Interactions
- Tap category → 05 (filtered).
- Tap product card → 10.
- Tap search → 06.
- Tap camera → 09.
- Tap order card → 21.
- Tap notification bell → notification list (planned).

## Responsive behavior
- All widths: same structure; carousels show fewer items on tiny widths.
- Standard+: same layout, slightly larger hero cards.

## Accessibility
- Search bar has accessible label and `role="search"`.
- Carousels announce "Voir plus" affordance.
- Card focus order: top-to-bottom, left-to-right.

## Localization
- French primary.
- English + Bambara placeholder.

## Acceptance criteria
- Home renders within 2 s on mid-range Android.
- Current order card visible only when an active order exists.
- Category strip max 6 items visible.
- Recommendations carousel supports swipe and snap-to-item.

## Dependencies
- `auth`, `orders`, `notifications`, `catalog` states.

## Risks
- Overloading Home - keep max 5 sections.

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