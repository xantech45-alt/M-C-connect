# Component Implementation Map

> Each canonical component, its blueprint source, props summary, and target file.

---

## Layer 1 - Primitives (`src/components/primitives/`)

| Component | Source | Notes |
|-----------|--------|-------|
| `Icon` | `07_COMPONENT_ARCHITECTURE.md` § 2 | Lucide wrapper, `name` + `size` + `tone` |
| `Text` | § 2 | Variant prop maps to typography tokens |
| `Divider` | § 2 | Horizontal/vertical hairline |
| `Surface` | § 2 | Background + optional elevation |
| `Box` | § 2 | Generic layout primitive |
| `Stack` | § 2 | Vertical/horizontal with gap token |
| `Spacer` | § 2 | Fixed space via token |
| `Badge` | § 2 | Coloured tag |

## Layer 2 - UI Components (`src/components/ui/`)

| Component | Source | Notes |
|-----------|--------|-------|
| `Button` | § 3 | Variants: primary, secondary, tertiary, ghost, icon-only · sizes: sm 36 / md 44 / lg 52 |
| `TextField` | § 3 | Variants: default, with-icon, numeric, OTP, search |
| `Chip` | § 3 | Variants: filter, category, tag, status |
| `Switch` | § 3 | Accessible label |
| `Checkbox` | § 3 | Accessible label |
| `Radio` | § 3 | Group container |
| `Avatar` | § 3 | Photo / initials / placeholder |
| `Toast` | § 3 | Auto-dismiss |
| `Skeleton` | § 3 | block / text / circle / product-card |
| `Tabs` | § 3 | Underline / pill |
| `BottomSheet` | § 3 | Drag handle + scrim, three snap points |
| `Modal` | § 3 | Default / full-screen |
| `Tooltip` | § 3 | Top / bottom |
| `Spinner` | § 3 | sm / md / lg |
| `ProgressBar` | § 3 | Indeterminate / determinate |
| `QuantitySelector` | § 3 | + / − controls; respects MOQ |
| `Image` | § 3 | Aspect-ratio locked, loading/error/placeholder |

## Layer 3 - Composite (`src/components/composite/`)

| Component | Source | Notes |
|-----------|--------|-------|
| `ProductCard` | § 4 | Variants: grid / list / horizontal / compact |
| `SearchBar` | § 4 | Input + voice + camera + cancel |
| `OrderCard` | § 4 | Thumbnail + status chip + ETA + amount |
| `CostBreakdown` | § 4 | Lines + subtotal + total; estimated / confirmed |
| `PriceTierTable` | § 4 | Compact / expanded |
| `StatusChip` | § 4 | Icon + label + colour tone |
| `CategoryTile` | § 4 | Grid / list |
| `NotificationItem` | § 4 | Unread / read |
| `KPIValue` | § 4 | Number + label + delta |
| `AddressCard` | § 4 | Default / selectable |
| `PaymentOption` | § 4 | Logo + label + selected indicator |
| `MessageThread` | § 4 | Avatar + name + snippet + time + unread |
| `EmptyState` | § 4 | Illustration + headline + body + CTA |
| `LanguageOption` | § 4 | Flag + name + selected |
| `Rating` | § 4 | Static |

## Layer 4 - Feature (`src/features/*/components/`)

| Feature | Source | Used on |
|---------|--------|---------|
| `OnboardingCarousel` | `20_TRACEABILITY_MATRIX.md` § 2 | 01 |
| `OTPForm` | § 2 | 02 |
| `BusinessProfileForm` | § 2 | 03 |
| `ProductGallery` | § 2 | 10 |
| `PriceTierTable` | § 2 | 10, 11 |
| `LandedCostPanel` | § 2 | 12 |
| `ComparisonTable` | § 2 | 13 |
| `RFQForm` | § 2 | 14 |
| `CheckoutSummary` | § 2 | 15, 16 |
| `OrderTrackingTimeline` | § 2 | 21 |
| `QualityInspectionPanel` | § 2 | 22 |
| `AnalyticsSummary` | § 2 | 24 |
| `FilterSheet` | `04_NAVIGATION_ARCHITECTURE.md` § 8 | 08 |
| `ImageSearchCapture` | `03_INFORMATION_ARCHITECTURE.md` § 6 | 09 |
| `QuoteResponse` | § 6 | 19 |
| `OrderConfirmation` | § 6 | 18 |

## Reuse enforcement

Per `07_COMPONENT_ARCHITECTURE.md` § 7:

- `ProductCard` is canonical. No `ProductItem`, `ProductTile`, `ProductBox` variants.
- `StatusChip` is canonical. No inline coloured labels.
- `CostBreakdown` is canonical for any monetary summary.
- `EmptyState` is canonical for empty screens.
- `KPIValue` is canonical for numeric metrics.

Reuse-first: every screen change searches the existing component map before creating a new file.
