# 06 - Layout & Spacing System

> Page gutter, section gaps, card gaps, alignment, sticky rules, safe areas.

---

## 1. Page gutter

| Width | Gutter (px) | Notes |
|-------|-------------|-------|
| 320 | 12 | Tight phone |
| 360 | 16 | Common phone |
| 375–390 | 16 | Standard phone |
| 414–430 | 20 | Large phone |
| Tablet | 24 | 2-column content if applicable |

`--page-gutter` is a responsive token; implementation reads viewport width and selects the appropriate value.

## 2. Header & top app bar

| Token | Value |
|-------|-------|
| Header height (default) | 56 dp |
| Header height (with tabs) | 88 dp |
| Top safe-area inset | device-dependent |
| Header padding horizontal | `--page-gutter` |
| Header padding vertical | 8 dp |
| Title typography | `title-lg` (20/28, 600) |

## 3. Section gaps

| Context | Gap |
|---------|-----|
| Between sections on Home | 24 dp |
| Between major blocks on PDP | 24 dp |
| Between form sections | 24 dp |
| Between list rows | 12 dp |
| Between cards in a 2-col grid | 12 dp |

## 4. Card internal padding

| Card type | Padding |
|-----------|---------|
| Product card | 12 dp |
| Order card | 16 dp |
| Generic content card | 16 dp |
| Detail panel | 20 dp |
| Sheet content | 20 dp |

## 5. List spacing

- **Vertical list rows:** 12 dp gap.
- **Horizontal carousel:** 16 dp gutter + 12 dp item gap.
- **Grid (2-column):** 12 dp gutter, equal width items.
- **Grid (3-column, small phones):** 8 dp gutter.

## 6. Bottom navigation offset

| Property | Value |
|----------|-------|
| Height | 64 dp + safe-area inset bottom |
| Background | `--white` with top hairline |
| Top hairline | 1 px `--border` |
| Active indicator | optional pill behind icon |
| Tab label | 11/16 caption, slate; red when active |

Any screen that needs a sticky primary CTA pushes its content bottom-padding to clear the bottom nav: **`64 dp + safe-area` + `16 dp` breathing room**.

## 7. Sticky action position

| Property | Value |
|----------|-------|
| Container height | 72 dp + safe-area bottom |
| Internal padding | 16 dp horizontal · 12 dp vertical |
| Background | `--white` with top hairline |
| CTA button | Full width primary |

The sticky bar floats above the bottom nav. If the screen hides the bottom nav, the sticky bar sits 16 dp above the safe-area bottom instead.

## 8. Product grid behaviour

| Viewport | Columns |
|----------|---------|
| 320 | 2 |
| 360–414 | 2 |
| 414–430 | 2 |
| ≥ 600 (tablet) | 3 |

Card image: 1:1, full-bleed within card, 8 dp top-corner radius inherited from card.

## 9. Modal / bottom-sheet spacing

- Drag handle: 36 × 4 dp, centered, 8 dp from top.
- Sheet content padding: 20 dp horizontal · 16 dp top · 24 dp bottom.
- Sticky CTA inside sheet sits 16 dp from safe-area bottom.

## 10. Form spacing

- Field-to-label gap: 8 dp.
- Field-to-helper: 8 dp.
- Field-to-error: 8 dp.
- Between field groups: 24 dp.
- Last field before primary CTA: 24 dp minimum.

## 11. Dashboard spacing

- KPI tile row gap: 12 dp.
- KPI tile internal padding: 16 dp.
- Section gap: 24 dp.
- Chart padding: 16 dp around.

## 12. Sticky action collision rules

- A sticky CTA must never collide with a bottom nav (when both present).
- A sticky CTA must never obscure the last 24 dp of scrollable content.
- A sticky CTA must never appear inside a modal whose sheet CTA already exists (one or the other, not both).

## 13. Visual rhythm

A screen is composed of:

```
App bar
  ↓ 16 dp
Hero / quick actions (where applicable)
  ↓ 24 dp
Primary content blocks (12–24 dp gaps between)
  ↓ 24 dp
Secondary content blocks
  ↓ variable breathing room
Sticky CTA OR bottom nav (mutually exclusive)
```

## 14. Density rules

- Maximum 6 primary content regions stacked on mobile.
- Carousels never exceed 2 visible items at 320 px; 2.5 at 360 px.
- Cards never exceed 2 lines of title text on mobile (3-line clamp allowed only in cart/order cards).

## 15. Decisions

- D-LS01 Gutter is responsive (12–24 dp).
- D-LS02 Sticky CTA and bottom nav are mutually exclusive.
- D-LS03 Section gap baseline = 24 dp.
- D-LS04 Spacing tokens only.