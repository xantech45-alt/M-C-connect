# Component Inventory

> Canonical list of every planned component, organised by layer.

---

## Layer 1 - Primitives

| Component | Responsibility |
|-----------|----------------|
| `Icon` | Render line-style icon at given size + colour token |
| `Text` | Typography variant; truncate/clamp helpers |
| `Divider` | Hairline horizontal or vertical |
| `Surface` | Background surface with optional elevation |
| `Box` | Layout primitive with spacing tokens |
| `Stack` | Vertical/horizontal layout with gap token |
| `Spacer` | Fixed vertical or horizontal space |
| `Badge` | Coloured tag (status, count) |

## Layer 2 - UI

| Component | Variants | Notes |
|-----------|----------|-------|
| `Button` | primary, secondary, tertiary, ghost, icon-only | sm 36 / md 44 / lg 52 |
| `TextField` | default, with-icon, numeric, OTP, search | label + helper + error |
| `Chip` | filter, category, tag, status | radius-full |
| `Switch` | on, off | accessible label |
| `Checkbox` | checked, unchecked, indeterminate | accessible label |
| `Radio` | selected, unselected | group container |
| `Avatar` | photo, initials, placeholder | radius-full |
| `Toast` | success, error, info, warning | auto-dismiss 3 s |
| `Skeleton` | block, text, circle, product-card | loading state |
| `Tabs` | underline, pill | horizontal scroll when overflow |
| `Badge` | count, dot | top-right of icon |
| `BottomSheet` | collapsed, half, full | drag handle + scrim |
| `Modal` | default, full-screen | close affordance |
| `Tooltip` | top, bottom | dismissible |
| `Spinner` | sm, md, lg | neutral colour |
| `ProgressBar` | linear | indeterminate, determinate |
| `QuantitySelector` | default | disabled supported |
| `Image` | aspect-locked | loading, error, placeholder |

## Layer 3 - Composite

| Component | Responsibility | Variants |
|-----------|----------------|----------|
| `ProductCard` | Image + title + price + MOQ + verification + favorite | grid, list, horizontal, compact |
| `SearchBar` | Input + voice + camera + cancel | default, focused |
| `OrderCard` | Thumbnail + status + ETA + amount | active, past, QC-available |
| `CostBreakdown` | Itemised lines + subtotal + total | estimated, confirmed |
| `PriceTierTable` | Quantity tier rows + highlight current | compact, expanded |
| `StatusChip` | Status icon + label + colour tone | success, warning, info, error, neutral |
| `CategoryTile` | Icon + label + count | grid, list |
| `NotificationItem` | Icon + title + body + timestamp | unread, read |
| `KPIValue` | Big number + label + delta | success, warning, info |
| `AddressCard` | Address lines + default + actions | default, selectable |
| `PaymentOption` | Logo + label + selected | selected, unselected |
| `MessageThread` | Avatar + name + snippet + time + unread | unread, read |
| `EmptyState` | Illustration + headline + body + CTA | standard |
| `LanguageOption` | Flag + name + selected | – |
| `Rating` | Star rating + count | static |

## Layer 4 - Feature

| Feature | Responsibility | Used on |
|---------|----------------|---------|
| `ProductGallery` | Image carousel + thumbnails + zoom | 10 |
| `LandedCostPanel` | Itemised estimated + confirmed lines + disclaimer | 12 |
| `RFQForm` | Multi-field form with submission state | 14 |
| `CheckoutSummary` | Lines + shipping + cost + payment select | 15, 16 |
| `OrderTrackingTimeline` | Multi-step visual timeline | 21 |
| `QualityInspectionPanel` | Photo grid + ratings + verdict | 22 |
| `AnalyticsSummary` | KPI tiles + chart + recent orders | 24 |
| `OnboardingCarousel` | Slides + skip + CTA | 01 |
| `OTPForm` | Phone + OTP + resend | 02 |
| `BusinessProfileForm` | Multi-step form | 03 |
| `FilterSheet` | Bottom-sheet filter UI | 08 |
| `ImageSearchCapture` | Camera + upload + result | 09 |
| `ComparisonTable` | Side-by-side product compare | 13 |
| `QuoteResponse` | Quote breakdown + accept/decline | 19 |
| `OrderConfirmation` | Receipt + next steps | 18 |

---

## Count summary
- Primitives: 8
- UI components: 17
- Composite components: 15
- Feature components: 15
- **Total: 55 planned components**