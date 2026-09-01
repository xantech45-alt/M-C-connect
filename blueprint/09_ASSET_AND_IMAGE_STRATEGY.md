# 09 - Asset & Image Strategy

> Photography, illustration, iconography, and ratio rules for M&C Connect.

---

## 1. Brand asset inventory

| Asset | Status |
|-------|--------|
| M&C logo | To be supplied (primary lockup + monogram) |
| Mascot / illustration | None - avoid |
| Decorative gradients | None - avoid |
| Background patterns | None - avoid |

## 2. Product imagery principles

- Real product photography only.
- Clean neutral background (white or light grey).
- Consistent crop, centered object, predictable ratio.
- High legibility - avoid blurry or watermarked images.
- No decorative props that distract from the product.
- No AI-generated imagery.
- No fake 3D icons where photography exists.

## 3. Imagery ratios

| Surface | Ratio | Notes |
|---------|-------|-------|
| Home hero banner | 16:9 | Real product / contextual |
| Category tile | 1:1 | Icon-led or photo-led |
| Product card | 1:1 | Default |
| Product card alt | 4:3 | Variant |
| Product detail gallery | 1:1 | Zoomable |
| Cart line | 1:1 | Small thumbnail |
| Compare row | 1:1 | Small thumbnail |
| Order card | 4:3 | Hero |
| Quality inspection photo | 4:3 | Square-safe framing |
| Banner (Promo) | 16:9 | Optional banner |
| Blog / editorial | 4:3 | Reserved for future |

## 4. Subject categories required

Photography must cover (planned):

- Agricultural machinery
- Generators
- Solar equipment
- Construction equipment
- Electronics
- Industrial machinery
- Consumer goods (clothing, shoes, jewellery, watches, perfume, shampoo, belts, accessories)
- Shipping containers / cargo ship / truck
- Quality inspection photos (real-world, supplied later)
- Empty-state photos (light industrial contexts)

## 5. Empty-state imagery

- Use a simple line illustration or photographic neutral background.
- Avoid cartoon characters.
- Use a single object to anchor the message (a parcel for empty cart, a search lens for empty results).

## 6. Photography rules

- All product photos shot at consistent distance and lighting.
- Use consistent neutral shadow.
- White balance locked.
- Avoid heavy watermarks; if branded, small and unobtrusive.
- Avoid 3D-rendered look.
- Crop predictable (centered subject, generous breathing room).

## 7. Category icons

- Outline style (Lucide / Phosphor line).
- 1.5 px stroke.
- 24 px default.
- Coloured `--ink` default, `--mc-red` when selected.

Available SVG icons (existing supply):

```
bag · coat · cosmetics · dress · glasses · hat · jacket · jewelry · perfume · shoes · shorts · tee · watch
```

Additional categories require new icons:

```
machinery · generator · solar · construction · electronics · industrial · agriculture
```

## 8. Status icons

| Status | Icon | Library key |
|--------|------|-------------|
| Verified | shield-check | quality verified |
| In progress | clock | pending |
| In transit | truck | shipping |
| Delivered | package-check | delivered |
| Cancelled | x-circle | cancelled |
| Quality report | file-check | QC |

## 9. Imagery anti-patterns

| Anti-pattern | Why to avoid |
|--------------|--------------|
| Gradient backgrounds | Breaks professional aesthetic |
| Glassmorphism | Looks AI-generated |
| Neon colour | Looks consumer / toy-like |
| Decorative icons everywhere | Dilutes trust signals |
| Cartoon mascots | Wrong audience |
| 3D-rendered products | Looks fake; use photography |
| Generic stock illustrations | Looks generic; use product photography |
| Watermarks | Distract from product |

## 10. Decisions

- D-IMG01 Real photography only; no AI imagery.
- D-IMG02 Categories use either photo or line icon, never both at once.
- D-IMG03 Status icons are paired with colour tone, never colour alone.