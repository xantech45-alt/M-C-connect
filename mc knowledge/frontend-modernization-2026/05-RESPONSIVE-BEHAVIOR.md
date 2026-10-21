# 05 · Responsive behaviour

One application and one set of markup. Breakpoints switch the presentation, not the product.

| Width | Navigation | Header | Content | Footer | Sticky CTA bar |
|---|---|---|---|---|---|
| < 900px (phones, small tablets) | Fixed **BottomNav** (5 tabs, 64px plus safe area) | Three rows: brand+user+actions / delivery / search | Full width, gutter 12-24px | none | Above the bottom nav |
| 900-1023px (tablet landscape) | Fixed **LeftRailNav** (84px) | Three rows | Full width beside the rail | none | Viewport bottom |
| ≥ 1024px (desktop) | **DesktopNav** inside the header (5 anchors plus Demande sur mesure) | One row: brand, delivery, search (≤720px), user, actions | Centred 1280 / 760 / 440 | **SiteFooter** | Viewport bottom, contained and right-aligned |

The constants live in `src/hooks/useMediaQuery.ts` (`RAIL_QUERY`, `DESKTOP_QUERY`, `NO_BOTTOM_NAV_QUERY`), so every layout and `StickyActionBar` reads the same thresholds.

## Mobile customer journey (protected)

- The bottom tab bar, thumb-zone sticky CTAs, 44px tap targets, the mobile type scale and the mobile hero (4:3) are unchanged below 1024px.
- No new runtime dependency and no new images. Added code is about 3 KB of CSS/TSX (`DesktopNav`, `SiteFooter`, `format.ts`).
- Desktop-only components (DesktopNav, SiteFooter, the PDP global header) are **not rendered** below 1024px (JS media query), so mobile DOM weight is unchanged.

## Onboarding per device

The same component serves every device. Below 900px it is the original phone carousel (swipe, dots, full-width CTA). At 900px and above it is a two-column panel with an inline CTA. On every device, "Passer" and "Commencer" open the catalog, "Déjà client ? Se connecter" goes to `/login`, and completion is remembered so `/` goes straight to `/home` (`/onboarding` still replays it).

## Verified widths

1920, 1440, 1280, 1024, 768, 390 and 320px across all 46 routes. Results are in `09-TESTING-AND-VALIDATION.md`, with screenshots in `evidence/before` and `evidence/after` (`<route>__<width>.png`).
