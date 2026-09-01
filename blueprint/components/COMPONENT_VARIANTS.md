# Component Variants

> Per-component variant catalogue (functional + visual).

---

## Button

| Variant | Background | Text | Border | Size |
|---------|-----------|------|--------|------|
| Primary | `--mc-red` | `--white` | none | sm 36 / md 44 / lg 52 |
| Primary pressed | `--mc-red-deep` | `--white` | none | same |
| Secondary | `--white` | `--ink` | `border-hairline` | same |
| Secondary pressed | `--surface` | `--ink` | `border-hairline` | same |
| Tertiary | transparent | `--mc-red` | none | same |
| Ghost | transparent | `--ink` | none | same |
| Icon-only | transparent or `--white` | – | – | sm 36 / md 44 / lg 52 |
| Disabled | `--surface` | `--slate` | none | same |
| Loading | – | – | – | spinner replaces label |

## TextField

| Variant | Border | Background |
|---------|--------|-----------|
| Default | `--border` | `--white` |
| Focused | `border-focus` (red) | `--white` |
| Error | `--mc-red` | `--white` |
| Disabled | `--border` | `--surface` |
| Read-only | `--border` | `--surface` |
| With-icon (left/right) | – | – |

## Chip

| Variant | Default | Selected |
|---------|---------|----------|
| Filter | `--white` w/ border | `--mc-red-tint` w/ red border |
| Category | `--surface` | `--mc-red-tint` |
| Tag | `--surface` | – |
| Status | variant-specific | – |

## Card

| Variant | Radius | Padding | Elevation |
|---------|--------|---------|-----------|
| Default | 12 | 16 | elev-1 |
| Compact | 8 | 12 | elev-1 |
| Hero | 16 | 20 | elev-2 |

## StatusChip

| Status | Background tint | Text | Icon |
|--------|----------------|------|------|
| Success | success 12% | success | shield-check |
| Warning | warning 12% | warning | clock |
| Info | info 12% | info | truck |
| Error | red-tint | red-deep | x-circle |
| Neutral | surface | slate | dot |

## ProductCard

| Variant | Image | Layout | Show |
|---------|-------|--------|------|
| Grid | 1:1 | vertical | image, title, price, MOQ, verified chip, favorite |
| List | 1:1 | horizontal | image, title, price, MOQ, verified chip, favorite |
| Horizontal | 1:1 | horizontal scroll | image, title, price, MOQ |
| Compact | 1:1 | no favourite | image, title, price |

## OrderCard

| Variant | Layout | Show |
|---------|--------|------|
| Active | 4:3 image | status, ETA, total, "Voir le suivi" |
| Past | 4:3 image | status, date, total, "Voir détails" |
| QC-available | 4:3 image | status, "Voir le rapport qualité" link |

## BottomSheet

| Variant | Snap points |
|---------|-------------|
| Peek | 30% |
| Half | 60% |
| Full | 90% |

## ImageSearchCapture

| Variant | Trigger |
|---------|---------|
| Camera | live capture |
| Upload | gallery picker |

## Tabs

| Variant | Style |
|---------|-------|
| Underline | 2 px underline at active |
| Pill | pill background at active |

## QuantitySelector

| Variant | Behaviour |
|---------|-----------|
| Default | −/+ buttons + numeric input |
| Disabled | inputs disabled |

## ProgressBar

| Variant | Use |
|---------|-----|
| Indeterminate | loading |
| Determinate | upload, sync |

## Avatar

| Variant | Source |
|---------|--------|
| Photo | URL |
| Initials | name string |
| Placeholder | line icon |

## KPIValue

| Variant | Show |
|---------|------|
| Success | green delta up |
| Warning | amber delta flat |
| Info | blue delta up |
| Default | no delta |

## CostBreakdown

| Variant | Labels |
|---------|--------|
| Estimated | "estimé" suffix on each line |
| Confirmed | "confirmé" suffix on each line |

## PriceTierTable

| Variant | Layout |
|---------|--------|
| Compact | 4 rows max |
| Expanded | all rows + summary |

## Modal

| Variant | Use |
|---------|-----|
| Default | centred, max-width 480 dp |
| Full-screen | covers entire viewport |

## EmptyState

| Variant | Show |
|---------|------|
| Standard | illustration + headline + body + CTA |
| Compact | headline + CTA only |

## AddressCard

| Variant | Show |
|---------|------|
| Default | address + default badge |
| Selectable | radio + address |

## PaymentOption

| Variant | Show |
|---------|------|
| Selected | logo + label + checkmark |
| Unselected | logo + label |

## MessageThread

| Variant | Show |
|---------|------|
| Unread | bold name + snippet + unread badge |
| Read | regular name + snippet |

## LanguageOption

| Variant | Show |
|---------|------|
| Selected | flag + name + checkmark |
| Unselected | flag + name |

## Rating

| Variant | Show |
|---------|------|
| Static | star count + label |

## Decisions

- D-CV01 Each component has at most 3 functional variants.
- D-CV02 Visual variants enumerated in this document.
- D-CV03 New variants require update to this file and `COMPONENT_HIERARCHY.md`.