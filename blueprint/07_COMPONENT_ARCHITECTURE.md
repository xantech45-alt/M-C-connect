# 07 - Component Architecture

> The four-layer component hierarchy planned for M&C Connect.

---

## 1. Layer model

```
Layer 1: Primitives       →  Token-driven visual atoms (no business meaning)
Layer 2: UI Components    →  Interaction atoms (buttons, inputs, chips)
Layer 3: Composite        →  Multi-purpose business patterns (ProductCard, OrderCard)
Layer 4: Feature          →  Screen-bound compositions (ProductGallery, CheckoutSummary)
```

Rules:

- Layer N may depend on Layer N and below only.
- Feature components never leak into Layer 1–3.
- Composite components never reach into Feature.
- Primitives must remain themable without breaking higher layers.

---

## 2. Layer 1 - Primitives

| Primitive | Responsibility |
|-----------|----------------|
| `Icon` | Renders an icon at a given size and colour token |
| `Text` | Typography variant + weight + colour; supports truncation/clamp |
| `Divider` | Hairline horizontal or vertical |
| `Surface` | Background surface with optional elevation |
| `Box` | Layout primitive with spacing tokens |
| `Stack` | Vertical/horizontal layout with gap token |
| `Spacer` | Fixed vertical or horizontal space |
| `Badge` | Coloured tag (status, count) |

---

## 3. Layer 2 - UI Components

| Component | Variants | States | Notes |
|-----------|----------|--------|-------|
| `Button` | primary · secondary · tertiary · ghost · icon-only | default · pressed · focused · disabled · loading | sm 36 · md 44 · lg 52 |
| `TextField` | default · with-icon · numeric · OTP · search | default · focused · error · disabled · read-only | label + helper + error stack |
| `Chip` | filter · category · tag · status | default · selected · disabled | radius-full |
| `Switch` | on · off | disabled | accessible label |
| `Checkbox` | checked · unchecked · indeterminate | disabled | accessible label |
| `Radio` | selected · unselected | disabled | group container |
| `Avatar` | photo · initials · placeholder | – | radius-full |
| `Toast` | success · error · info · warning | – | auto-dismiss |
| `Skeleton` | block · text · circle · product-card | – | loading state |
| `Tabs` | underline · pill | – | horizontal scroll when overflow |
| `Badge` | count · dot | – | top-right of an icon |
| `BottomSheet` | collapsed · half · full | – | drag handle + scrim |
| `Modal` | default · full-screen | – | close affordance |
| `Tooltip` | top · bottom | – | dismissible |
| `Spinner` | sm · md · lg | – | neutral colour |
| `ProgressBar` | linear | indeterminate · determinate | for order tracking |
| `QuantitySelector` | – | disabled | used in cart and PDP |
| `Image` | aspect-ratio locked | loading · error · placeholder | remote + local |

---

## 4. Layer 3 - Composite

| Component | Responsibility | Variants |
|-----------|----------------|----------|
| `ProductCard` | Image + title + price + MOQ + verification + favorite | grid · list · horizontal · compact |
| `SearchBar` | Input + voice + camera + cancel | default · focused |
| `OrderCard` | Product thumbnail + status chip + ETA + amount | active · past · QC-available |
| `CostBreakdown` | Itemised lines + subtotal + total | estimated · confirmed |
| `PriceTierTable` | Quantity tier rows + highlight current | compact · expanded |
| `StatusChip` | Status with icon + label + colour tone | success · warning · info · error · neutral |
| `CategoryTile` | Icon + label + count | grid · list |
| `NotificationItem` | Icon + title + body + timestamp | unread · read |
| `KPIValue` | Big number + label + delta | success · warning · info |
| `AddressCard` | Address lines + default + actions | default · selectable |
| `PaymentOption` | Logo + label + selected indicator | selected · unselected |
| `MessageThread` | Avatar + name + snippet + time + unread | unread · read |
| `EmptyState` | Illustration + headline + body + CTA | standard |
| `LanguageOption` | Flag + name + selected indicator | – |
| `Rating` | Star rating + count | static |

---

## 5. Layer 4 - Feature

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

## 6. Component responsibility template

For every component the blueprint defines (at minimum):

- **Responsibility**
- **Variants**
- **Conceptual props** (categories, not types)
- **States** (default, focused, pressed, disabled, loading, error, success, empty)
- **Accessibility** (role, label, focus order, contrast)
- **Usage locations**
- **Prohibited misuse**
- **Reuse opportunities**

---

## 7. Reuse rules

- `ProductCard` is the canonical product presentation. Any screen showing products must use it.
- `StatusChip` is the canonical status indicator. No screen may inline a custom coloured label.
- `CostBreakdown` is the canonical money summary. Variants exist (estimated/confirmed) but the structure is identical.
- `EmptyState` is canonical for empty screens.
- `KPIValue` is canonical for any numeric metric.

## 8. Variant guidance

A component may have **at most 3 functional variants**. If more are needed, the component is doing too much - split it.

Visual variants (size, colour tone, density) are unlimited but must be enumerated in `COMPONENT_VARIANTS.md`.

## 9. Decisions

- D-CA01 Four-layer hierarchy is mandatory.
- D-CA02 Layer N depends on Layer N and below.
- D-CA03 Reuse canonical components; no custom inlines.