# 05 - Design System

> The complete design-token and pattern plan for M&C Connect.

---

## 1. Brand posture

**Professional · commercial · trustworthy · modern · African-market appropriate · enterprise-ready**

Not childish, not AI-generated, not overdecorated, not neon, not glassmorphism-heavy, not gradient-heavy.

Red is an accent - not a background for everything. Target ≤12% of any single screen's surface.

---

## 2. Color tokens

### Brand
| Token | Value | Usage |
|-------|-------|-------|
| `--mc-red` | `#C4122F` | Primary CTA, brand mark |
| `--mc-red-deep` | `#8E0B22` | Hover/pressed, emphasis |
| `--mc-red-tint` | `#FBEAEC` | Selected backgrounds, alert surfaces |

### Neutral
| Token | Value | Usage |
|-------|-------|-------|
| `--ink` | `#14181D` | Body text, primary text |
| `--slate` | `#5C6673` | Secondary text, captions |
| `--border` | `#E4E7EB` | Dividers, input borders |
| `--surface` | `#F5F6F8` | App background, neutral surface |
| `--white` | `#FFFFFF` | Cards, sheet background |

### Status
| Token | Value | Usage |
|-------|-------|-------|
| `--success` | `#1F7A4D` | Success state, delivered, verified |
| `--warning` | `#B4700E` | Caution, pending, awaiting action |
| `--info` | `#1B4E7A` | Informational state, in-progress |

Status tokens must always be paired with an icon or label. Colour alone never conveys meaning.

### Text on colour
| Surface | Token | Min contrast |
|---------|-------|--------------|
| White | `--ink` | 16:1 |
| `--surface` | `--ink` | 15.5:1 |
| `--mc-red` | `--white` | 5.4:1 (passes 4.5:1 AA) |
| `--mc-red-tint` | `--mc-red-deep` | 9.2:1 |

---

## 3. Typography tokens

**Family:** Inter (with system fallbacks: -apple-system, Segoe UI, Roboto, sans-serif).

### Type scale
| Token | Size / line | Weight | Usage |
|-------|-------------|--------|-------|
| `display-lg` | 32 / 40 | 700 | Hero titles (rare) |
| `display-md` | 24 / 32 | 700 | Page titles |
| `title-lg` | 20 / 28 | 600 | Section headings |
| `title-md` | 18 / 26 | 600 | Card titles, important labels |
| `body-lg` | 16 / 24 | 400 | Primary body |
| `body` | 14 / 22 | 400 | Default body |
| `caption` | 12 / 18 | 400 | Captions, helper text |
| `overline` | 11 / 16 | 600 | Eyebrow text, uppercase optional |

### Use rules
- **Inter weights** available: 400, 500, 600, 700.
- Never use weight 300.
- All copy is left-aligned by default; numeric/price strings may be right-aligned in tables.
- Line-length guideline: 60–72 characters max in body, never wider on mobile.

---

## 4. Spacing scale

Base 4 dp scale:

```
4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 · 72
```

Use only these tokens. No arbitrary spacing values.

| Token | px |
|-------|----|
| `space-1` | 4 |
| `space-2` | 8 |
| `space-3` | 12 |
| `space-4` | 16 |
| `space-5` | 20 |
| `space-6` | 24 |
| `space-8` | 32 |
| `space-10` | 40 |
| `space-14` | 56 |
| `space-18` | 72 |

---

## 5. Radius tokens

| Token | px | Usage |
|-------|-----|-------|
| `radius-sm` | 4 | Pills, chips |
| `radius-md` | 8 | Inputs, small buttons |
| `radius-lg` | 12 | Cards |
| `radius-xl` | 16 | Modals, sheets, hero cards |
| `radius-full` | 999 | Avatars, round buttons |

---

## 6. Elevation

| Token | Spec | Usage |
|-------|------|-------|
| `elev-0` | none | Flat surfaces |
| `elev-1` | `0 1 2px rgba(20,24,29,0.06)` | Cards, raised chips |
| `elev-2` | `0 4 12px rgba(20,24,29,0.08)` | Sticky bars, sheets |
| `elev-3` | `0 8 24px rgba(20,24,29,0.12)` | Modals, toasts |

---

## 7. Border tokens

| Token | Spec |
|-------|------|
| `border-hairline` | 1 px `--border` |
| `border-strong` | 1 px `--slate` at 24% opacity |
| `border-focus` | 2 px `--mc-red` |

---

## 8. Iconography

- **Family:** Lucide (outline style) or equivalent 1.5 px stroke.
- **Default size:** 24 px.
- **Small:** 20 px · **Tiny:** 16 px · **Large:** 32 px.
- **Colour:** `--ink` default · `--slate` secondary · `--white` on red.
- **Touch padding:** invisible 8 px around the icon to reach 40+ px hit area.
- **Consistent metaphors:** truck = shipping, package = order, verified shield = quality verified, calendar = dates, search = text search, camera = image search.

---

## 9. Button hierarchy

| Variant | Background | Text | Border | Use |
|---------|-----------|------|--------|-----|
| Primary | `--mc-red` | `--white` | none | Single dominant CTA |
| Primary-pressed | `--mc-red-deep` | `--white` | none | Pressed state |
| Secondary | `--white` | `--ink` | `border-hairline` | Secondary actions |
| Tertiary | transparent | `--mc-red` | none | Inline links |
| Ghost | transparent | `--ink` | none | Icon-only / low-emphasis |
| Disabled | `--surface` | `--slate` | none | Disabled state |

Sizes: **sm 36 dp · md 44 dp · lg 52 dp**.

**Only one Primary button per screen.** Multiple screens limit red usage to that single dominant CTA plus a maximum of two tertiary red links (text-only).

---

## 10. Input hierarchy

| Variant | Border | Background | Use |
|---------|--------|-----------|-----|
| Default | `--border` | `--white` | Empty field |
| Focused | `border-focus` (red) | `--white` | Active field |
| Error | `--mc-red` | `--white` | Validation error |
| Disabled | `--border` | `--surface` | Disabled |
| Read-only | `--border` | `--surface` | Read-only |

Inputs always pair with a label and helper text. Errors display as text below the input, never colour-only.

---

## 11. Card patterns

- Background `--white` · radius `radius-lg` (12) · `elev-1` · 16 dp internal padding.
- Optional header strip in `--surface` for status emphasis.
- Avoid decorative shadows; use elevation sparingly.
- ProductCard includes image area, title, price, MOQ, optional verification chip, optional favorite.

---

## 12. Status chips

| Status | Background | Text | Icon |
|--------|-----------|------|------|
| Verified | `--success` at 12% | `--success` | Shield |
| In review | `--warning` at 12% | `--warning` | Clock |
| In transit | `--info` at 12% | `--info` | Truck |
| Delivered | `--success` | `--white` | Check |
| Cancelled | `--mc-red-tint` | `--mc-red-deep` | X |

All chips include an icon plus label. Colour is not the sole signal.

---

## 13. Product price hierarchy

| Token | Format | Usage |
|-------|--------|-------|
| `price-current` | `XX XXX FCFA` (no decimals) | Main price |
| `price-tiers` | `> 100: 4 500 FCFA / unité` | Tier pricing |
| `price-moq` | `MOQ : 50 unités` | Minimum order quantity |
| `price-unit` | `par pièce` / `par carton` | Per-unit hint |
| `price-range` | `4 500 – 6 200 FCFA` | Range on lists |

Locale-aware thousand separator (space, French convention). Currency always "FCFA" or "XOF" - pick one per locale and stick to it. (Default: `FCFA`.)

---

## 14. Touch targets

- Minimum: **44 × 44 dp** (Apple HIG / Material).
- Recommended: **48 × 48 dp** for primary actions.
- Spacing between adjacent touchable elements: minimum 8 dp.

---

## 15. Mobile safe-area rules

- Top padding respects status bar; safe-area inset applied to app bar.
- Bottom padding respects home indicator / gesture bar; sticky CTA reserves 16 dp + safe area.
- Landscape is supported for select screens (search results, image gallery) but not the primary orientation.

---

## 16. Imagery ratios

See `09_ASSET_AND_IMAGE_STRATEGY.md` for full detail. Summary:

| Surface | Ratio |
|---------|-------|
| Home hero | 16:9 |
| Category tile | 1:1 |
| Product card | 1:1 (default), 4:3 (variant) |
| Product detail gallery | 1:1 |
| Cart line | 1:1 |
| Compare row | 1:1 |
| Order card | 4:3 |
| Quality inspection | 4:3 |

---

## 17. Feedback states (component-agnostic)

- **Loading** - neutral skeleton, no spinner-in-button for > 1.5 s.
- **Success** - green tick + brief message.
- **Error** - red surface tint + text + retry action.
- **Empty** - illustration + headline + body + CTA.
- **Offline** - info banner at top: "Vous êtes hors ligne. Vos modifications seront enregistrées."

---

## 18. Decisions

- D-DS01 Inter is canonical; do not introduce additional font families.
- D-DS02 Red CTA count = 1 dominant per screen.
- D-DS03 Spacing tokens only; no arbitrary px.
- D-DS04 Status colour must always pair with icon + label.