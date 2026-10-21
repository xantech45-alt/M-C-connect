# 04 · Layout and spacing

## Why the app looked like a phone app on desktop (root causes)

1. **No content container.** Every page applied only `padding: var(--page-gutter)`. At 1440px, paragraphs measured up to **1344px** wide (baseline `results.json`, `maxParagraphW`), and login inputs were 1344px wide.
2. **Mobile chrome at every width.** The header was three stacked rows (brand+actions / delivery / search) at all sizes. From 900px the bottom bar became an 84px icon rail with 11px labels, still a phone tab bar turned sideways.
3. **Phone-proportioned media.** The hero was `aspect-ratio: 4/3` at full width, which made it 960px tall at 1280px: one image filled the whole first screen.
4. **Single-column flows.** Search results, profile, settings and auth were single phone columns stretched horizontally.
5. **No desktop page furniture.** No footer, no trust/legal block, no persistent "Demande sur mesure" entry.

## Desktop layout system (≥1024px), implemented

```
┌──────────────────────── header (sticky, white) ─────────────────────────┐
│ [M&C] Livraison Bamako ▾ [ Rechercher ……………………… 📷 ] [Invité] 🔔 🛒      │  ← one row, grid areas
│ Accueil  Commandes  Produits  Messages  Profil      [Demande sur mesure] │  ← DesktopNav
└──────────────────────────────────────────────────────────────────────────┘
        ┌──────────── content: max 1280px, centred, 32px gutter ───────────┐
        │  page (full) │ narrow 760 column │ 440 card │ two-column split  │
        └──────────────────────────────────────────────────────────────────┘
┌──────────────────────── SiteFooter (4 columns + legal) ──────────────────┐
```

- `TabsLayout` / `PdpLayout` `.desktopMode .outlet { max-width: calc(--content-max + 2 × gutter) }`. The page's own gutter keeps content edges aligned with the header row.
- `DetailLayout` `width="narrow"` is used on 19 form and reading routes (see `02-ROUTE-AND-COMPONENT-INVENTORY.md`).
- `DetailLayout` (non-bare, pre-auth) renders a centred white card (≥600px). Child phone sizing (`min-height: 100vh`) is neutralised inside the card.
- `DetailLayout bare` header: sticky under the commerce header below 1024px. On desktop it becomes a static page heading (the header and nav are already sticky; a third sticky bar wasted 56px).

## Page-level compositions (desktop)

| Page | Before | After |
|---|---|---|
| Home | 960px hero, 4×2 small category tiles, horizontal flash scroller | 16:5 banner hero, eight categories on one row, six-column flash grid, four-column product rails |
| Search results | One phone list column | Two-column result cards (white, bordered, 120px thumbs) |
| All products | Four columns | Five columns ≥1280px |
| PDP | No global header, full-bleed sticky buttons | Global shell. Gallery sticky under the header + PDP row. Actions right-aligned (240px buttons) |
| Profile | 1280px-wide CTA and rows | 360px sticky summary (identity, stats) + menus column |
| Auth pages | 1344px inputs | 440px card |
| Onboarding | Phone column, 1344px button | Two-column 1040px panel (art / copy + controls) |
| Cart | Already had a 2fr/1fr split at ≥1024 (IDI-024) | Now also capped at 1280px |

## Spacing scale

The 4 px scale is unchanged. Gutter: 12 (≤359) / 16 / 18 (414-599) / 24 (600-1023) / 32 (≥1024). Section gap: 20 / 32 / 40.
