# 12 - Responsive Architecture

> Behavior across phone sizes and tablets.

---

## 1. Supported widths

| Class | Min (dp) | Max (dp) | Examples |
|-------|----------|----------|----------|
| Tiny | 320 | 359 | Compact Android |
| Standard | 360 | 389 | Common Android |
| Standard+ | 390 | 413 | iPhone 12/13/14 |
| Large | 414 | 429 | iPhone Pro Max |
| XL | 430 | 599 | Large Android |
| Tablet | 600 | 1024 | iPad mini / Android tablet |

## 2. Approach

Mobile-first. Tablet is graceful growth, not a separate design. Desktop is not in scope.

## 3. Gutter mapping

| Width | Gutter |
|-------|--------|
| 320 | 12 dp |
| 360–389 | 16 dp |
| 390–413 | 16 dp |
| 414–429 | 20 dp |
| 430+ | 20 dp |
| Tablet | 24 dp |

## 4. Layout reflow rules

| Component | Tiny | Standard | Standard+ | Large | XL | Tablet |
|-----------|------|----------|-----------|-------|----|--------|
| Product grid | 2 col | 2 col | 2 col | 2 col | 2 col | 3 col |
| KPI tiles | 2 col | 2 col | 2 col | 2 col | 2 col | 4 col |
| Cart lines | 1 col full | 1 col full | 1 col full | 1 col full | 1 col full | 1 col full |
| Order cards | 1 col full | 1 col full | 1 col full | 1 col full | 1 col full | 1 col full |
| Dashboard charts | 1 col stack | 1 col stack | 1 col stack | 1 col stack | 1 col stack | 2 col |
| Filter sheet | full | full | full | full | full | half |

## 5. Typography scaling

| Width | Body size | Display size |
|-------|-----------|--------------|
| 320 | 14 | 24 |
| 360 | 14 | 24 |
| 390 | 14 | 24 |
| 414+ | 14 | 24 |
| Tablet | 16 | 28 |

Tablet gets slightly larger body type. Phone sizes use the standard scale.

## 6. Sticky elements

| Element | Behaviour |
|---------|-----------|
| Bottom nav | Always visible on tabs (320–599) |
| Sticky CTA | Always visible on detail/form screens |
| Sticky CTA + bottom nav | Mutually exclusive - see `04_NAVIGATION_ARCHITECTURE.md` |

## 7. Horizontal scroll

Allowed on:
- Product gallery
- Related products carousel
- Category strip on Home
- Order tracking timeline (when overflowing)
- Notification list (rare)

Not allowed on:
- Forms
- Cart
- Account settings

## 8. Image sizing

| Image | Tiny | Standard | XL | Tablet |
|-------|------|----------|----|--------|
| Product card | 160 dp | 175 dp | 195 dp | 220 dp |
| Hero | 320×180 | 360×202 | 430×242 | 600×338 |
| Cart thumb | 64 dp | 72 dp | 80 dp | 96 dp |

## 9. Touch interaction

- One-handed reach: primary action must be reachable with thumb at 60% screen height.
- Bottom-stacked CTAs optimised for thumb zone.
- Top app bar actions reach forward only for secondary features.

## 10. Tablet considerations

- Two-column product grid.
- Larger gutters and body type.
- Side-by-side dashboard layout for KPIs + chart.
- Filter sheet becomes a half-width sheet.
- Some lists (categories) can use a 3-column grid.

## 11. Anti-patterns

| Anti-pattern | Why to avoid |
|--------------|--------------|
| Scaling everything proportionally | Looks wrong on small screens |
| Clipping French text | Loss of meaning |
| Tiny touch controls | Below 44 dp fails accessibility |
| Inconsistent side padding | Breaks visual rhythm |
| Oversized hero | Crowds real content |
| Crowded labels in nav | Hurts legibility |

## 12. Decisions

- D-R01 Phone sizes use the standard 14/24 type scale.
- D-R02 Tablet enables 2-col layout, never 3-col for product list.
- D-R03 Sticky CTA and bottom nav are mutually exclusive at all widths.