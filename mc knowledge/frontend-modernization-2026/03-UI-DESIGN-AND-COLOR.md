# 03 · UI design and color

## Preserved (brand identity unchanged)

- Brand red `--mc-red #c4122f`, deep `#8e0b22`, tint `#fbeaec`. These match the mockup's red and white identity (Overview §6).
- Neutral ink/slate/border/surface scale, Inter / system font stack, 4 px spacing scale, radius scale 4/8/12/16, and elevation 1-3.
- Existing components, icons (lucide, stroke 1.5-1.75) and imagery.

## Standardised / changed

| Token / pattern | Before | After | Why |
|---|---|---|---|
| `--warning` | `#b4700e` | `#8f5500` | 3.46:1 on its 12% tint failed AA for 11-12 px status pills (axe on `/orders`, `/orders/:id/qc`). The new value gives ≥ 5:1 |
| `--content-max` / `--content-narrow` / `--content-form` | none | 1280 / 760 / 440 px | One source for desktop measure, instead of each page stretching edge to edge |
| `--commerce-header-h` | hard-coded `--app-bar-height` (56px) for sticky offsets, while the real header is about 150px on mobile | Measured at runtime (ResizeObserver in CommerceHeader) | Nested sticky rows sat under the header |
| `--page-gutter` | 16 / 18 / 24 px. A 414px rule later in the cascade overrode the 600px rule (tablet gutters stayed 18px), and this was masked by a duplicate rule in `globals.css` | 16 → 18 (414-599) → 24 (600+) → 32 (1024+), single source in `tokens.css` | Cascade bug; desktop needs wider gutters |
| `--section-gap` / `--section-gap-lg` | 32 / 40 at tablet | 40 / 48 at desktop | Desktop vertical rhythm |
| Currency label | "XOF" | "FCFA" (data and types still XOF) | INV-8 |
| Hero radius | `5%` (scaled with box) | `--radius-xl` on desktop | 5% of a 1280px box was 64px, oversized |
| Desktop nav active state | n/a | Red label plus 2 px underline aligned with the header border | Standard desktop affordance. Mobile keeps its tinted pill |
| Sticky action bar (desktop) | Full-bleed white strip | Bordered, rounded, right-aligned actions | Reads as part of the content column, not a phone toolbar |

## Typography

The scale is unchanged. On desktop, page titles inside `DetailLayout bare` use `display-md` (28/36) instead of `title-md`, hero titles use `display-md`, and category labels use body size. Mobile type tightening (≤599px) is untouched.

## Light / dark mode

Only light mode exists (`color-scheme: light` in tokens and no dark tokens). Dark mode is **not** an approved existing feature, so it was not added. Recorded as a possible enhancement (U-10).

## Remaining visual notes

- Product cards on Home desktop are large (four per row at 1280px with a 1:1 image). This is acceptable, and denser rails would need more than four curated items (`MAX_ITEMS = 4`).
- The onboarding illustration contains English text ("Shop Now") baked into the PNG (U-12).
