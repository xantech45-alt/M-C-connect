# Component Hierarchy

> Layer dependency rules and architectural relationships.

---

## 1. Layer model

```
Layer 1 - Primitives
   │
Layer 2 - UI components
   │
Layer 3 - Composite
   │
Layer 4 - Feature
```

A component in Layer N may depend on:
- Itself.
- Components in Layer N.
- Components in any layer below N (N-1, N-2, ...).

A component in Layer N may NOT depend on:
- Components in any layer above N (N+1, ...).

## 2. Primitives (Layer 1)

Pure visual atoms. No business meaning.

| Primitive | Notes |
|-----------|-------|
| `Icon` | Renders an icon at size + colour token |
| `Text` | Renders typography variants |
| `Divider` | Hairline |
| `Surface` | Background |
| `Box` | Layout primitive |
| `Stack` | Layout primitive |
| `Spacer` | Space primitive |
| `Badge` | Coloured tag |

## 3. UI (Layer 2)

Interaction atoms.

| UI | Depends on |
|----|-----------|
| `Button` | `Box`, `Text`, `Icon` |
| `TextField` | `Box`, `Text`, `Icon` |
| `Chip` | `Box`, `Text`, `Icon` |
| `Switch` | `Box` |
| `Checkbox` | `Box`, `Icon` |
| `Radio` | `Box`, `Icon` |
| `Avatar` | `Box`, `Image` (planned) |
| `Toast` | `Surface`, `Text`, `Icon` |
| `Skeleton` | `Box`, `Surface` |
| `Tabs` | `Box`, `Text` |
| `Badge` | `Box`, `Text` |
| `BottomSheet` | `Surface`, `Box` |
| `Modal` | `Surface`, `Box` |
| `Tooltip` | `Surface`, `Text` |
| `Spinner` | `Icon` |
| `ProgressBar` | `Box` |
| `QuantitySelector` | `Button`, `TextField` |
| `Image` | `Box`, `Skeleton` |

## 4. Composite (Layer 3)

Multi-purpose business patterns.

| Composite | Depends on |
|-----------|-----------|
| `ProductCard` | `Box`, `Text`, `Image`, `StatusChip`, `QuantitySelector`, `Badge` |
| `SearchBar` | `TextField`, `Icon`, `Button` |
| `OrderCard` | `Image`, `Text`, `StatusChip`, `Stack` |
| `CostBreakdown` | `Box`, `Text`, `Divider` |
| `PriceTierTable` | `Box`, `Text`, `Divider` |
| `StatusChip` | `Box`, `Text`, `Icon` |
| `CategoryTile` | `Icon`, `Text`, `Badge` |
| `NotificationItem` | `Icon`, `Text`, `Box` |
| `KPIValue` | `Text`, `Box`, `Stack` |
| `AddressCard` | `Text`, `Box`, `Icon` |
| `PaymentOption` | `Image`, `Text`, `Radio` |
| `MessageThread` | `Avatar`, `Text`, `Box`, `Badge` |
| `EmptyState` | `Box`, `Text`, `Button`, `Image` |
| `LanguageOption` | `Text`, `Box`, `Radio` |
| `Rating` | `Icon`, `Text` |

## 5. Feature (Layer 4)

Screen-bound compositions.

| Feature | Depends on |
|---------|-----------|
| `ProductGallery` | `Image`, `Stack`, `Button` |
| `LandedCostPanel` | `CostBreakdown`, `Text`, `Box` |
| `RFQForm` | `TextField`, `QuantitySelector`, `Select`, `DatePicker`, `Button` |
| `CheckoutSummary` | `OrderCard`, `CostBreakdown`, `AddressCard`, `Radio` |
| `OrderTrackingTimeline` | `StatusChip`, `Stack`, `Text` |
| `QualityInspectionPanel` | `Image`, `Stack`, `StatusChip`, `Rating` |
| `AnalyticsSummary` | `KPIValue`, `OrderCard`, `Box` |
| `OnboardingCarousel` | `Image`, `Text`, `Button`, `LanguageOption` |
| `OTPForm` | `TextField`, `Button`, `TextLink` |
| `BusinessProfileForm` | `TextField`, `Select`, `Chip`, `Stepper`, `Button` |
| `FilterSheet` | `Chip`, `RangeSlider`, `Switch`, `Radio`, `Button` |
| `ImageSearchCapture` | `Image`, `Button`, `Modal` |
| `ComparisonTable` | `Box`, `Text`, `ProductCard`, `Stack` |
| `QuoteResponse` | `CostBreakdown`, `OrderCard`, `Button` |
| `OrderConfirmation` | `OrderCard`, `Stack`, `Button` |

## 6. Anti-patterns

| Anti-pattern | Why |
|--------------|-----|
| Layer-2 importing from Layer-3 | Architectural drift |
| Feature component reused across screens | Promote to composite first |
| Composite rendering raw HTML strings | Use Text |
| Multiple `ProductCard` variants in different files | Single source of truth |
| Custom button styling per screen | Use Button variants |

## 7. Migration rules

If during review a feature component is needed in a second screen:
1. Promote to composite.
2. Refactor original screen to use composite.
3. Update dependency rules.

If during review a composite is needed in many places:
1. Promote features that fit cleanly to a shared composite.
2. Avoid promoting stateful logic.

## 8. Decisions

- D-CH01 Layer N depends only on Layer N and below.
- D-CH02 Components promote upward only when reused.
- D-CH03 Single source of truth per component.