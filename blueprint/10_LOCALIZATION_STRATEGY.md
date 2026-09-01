# 10 - Localization Strategy

> French (Mali) primary; English and Bambara secondary.

---

## 1. Locale inventory

| Code | Name | Status | Notes |
|------|------|--------|-------|
| `fr-ML` | Français (Mali) | Primary | Default |
| `en` | English | Secondary | Business-grade English |
| `bm` | Bambara | Tertiary | Read-only support; user-facing copy is planned but text length may require design accommodation |

## 2. Translation rules

- Primary locale is `fr-ML`. All strings originate in French.
- English strings must read as professional B2B English - no idioms.
- Bambara strings respect Malian conventions; final copy validated by native speaker before release.

## 3. Text expansion budget

| Locale | Expansion vs. English source |
|--------|------------------------------|
| French | +15–25% |
| Bambara | +0–10% (some phrases shorter) |

UI must accommodate up to +30% length growth for any string without truncation. Buttons expand vertically; layout containers use min-width or wrap to multiple lines.

## 4. Currency

| Locale | Currency | Symbol | Formatting |
|--------|----------|--------|------------|
| `fr-ML` | XOF (Franc CFA) | `FCFA` | `XX XXX FCFA` (space separator, no decimals) |
| `en` | XOF (Franc CFA) | `XOF` | `XX,XXX XOF` |
| `bm` | XOF (Franc CFA) | `FCFA` | Same as `fr-ML` |

**Hard rule:** never display a decimal on prices. CFA franc is non-decimal.

## 5. Phone numbers

- Format: `+223 XX XX XX XX` (Mali country code +223).
- Display in input as `XX XX XX XX` and prepend `+223` on submit.
- No spaces on submit; backend formatting handled by server.

## 6. Dates

| Locale | Default | Format |
|--------|---------|--------|
| `fr-ML` | fr-FR | `25 août 2026` |
| `en` | en-GB | `25 Aug 2026` |
| `bm` | fr-FR | localised variant - `25 awiri 2026` (final copy pending) |

## 7. Times

| Locale | Default | Format |
|--------|---------|--------|
| `fr-ML` | 24-hour | `14:30` |
| `en` | 24-hour | `14:30` |
| `bm` | 24-hour | `14:30` |

## 8. Quantities

- Display: `50 unités` (no comma separator in unit count).
- Tier pricing: `> 100 unités : 4 500 FCFA / unité`.
- Cart and RFQ inputs use unit steppers, not free text.

## 9. Pluralization

- French: 0 and 1 are singular; >1 is plural.
- English: standard `one`/`other`.
- Bambara: tonal-specific plural rules; final copy reviewed by native speaker.

## 10. RTL future-proofing

The blueprint currently targets LTR. RTL support is a future consideration; layouts use logical CSS properties (margin-inline, padding-inline) to make RTL adoption non-breaking.

## 11. Locale selection

- On first launch: language picker shown (screen 01).
- Stored in `localStorage` (per device).
- Re-selectable from Profile settings.
- Locale switch never restarts the app; reloads in place.

## 12. Mixed-language prevention

- The current locale determines every visible string.
- Fallback chain: `fr-ML` → `fr` → `en`.
- Never mix locales in a single screen (e.g. no English labels on a French screen).

## 13. Decisions

- D-L10N01 `fr-ML` is canonical; copy originates there.
- D-L10N02 XOF non-decimal; no decimal places ever.
- D-L10N03 24-hour time everywhere.
- D-L10N04 Localized copy must never be truncated; layouts adapt.