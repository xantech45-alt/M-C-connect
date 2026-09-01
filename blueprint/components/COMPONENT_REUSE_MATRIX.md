# Component Reuse Matrix

> Where each canonical component is used. Implementation must respect this matrix.

---

| Component | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | 09 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 |
|-----------|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
| `Button` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `TextField` |   | ✓ | ✓ |   |   | ✓ |   |   |   |   |   |   |   | ✓ |   |   |   |   |   |   |   |   |   |   |
| `Chip` |   |   | ✓ |   |   | ✓ | ✓ | ✓ |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
| `Switch` |   |   |   |   |   |   |   | ✓ |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
| `Checkbox` |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   | ✓ |   |   |   |   |   |   |   |   |
| `Radio` | ✓ |   |   |   |   |   |   | ✓ |   |   |   |   |   |   |   | ✓ |   |   |   |   |   |   |   |   |
| `Avatar` |   |   |   | ✓ |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   | ✓ | ✓ |
| `Toast` |   |   |   | ✓ |   |   |   |   |   | ✓ |   |   |   | ✓ | ✓ | ✓ | ✓ |   |   |   |   |   |   |   |
| `Skeleton` |   |   |   | ✓ | ✓ | ✓ | ✓ |   |   | ✓ | ✓ | ✓ | ✓ |   | ✓ | ✓ |   |   |   | ✓ | ✓ | ✓ | ✓ | ✓ |
| `Tabs` |   |   | ✓ |   |   |   |   |   |   |   | ✓ |   |   |   |   |   |   |   |   | ✓ |   |   |   |   |
| `Badge` |   |   |   | ✓ |   |   |   |   |   | ✓ |   |   |   |   |   |   |   |   |   |   |   |   | ✓ |   |
| `BottomSheet` |   | ✓ |   |   |   |   | ✓ | ✓ |   |   |   |   |   |   |   | ✓ | ✓ |   |   |   |   |   |   |   |
| `Modal` |   | ✓ |   |   |   |   |   |   | ✓ |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
| `Tooltip` | ✓ |   |   |   |   |   |   |   |   | ✓ |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
| `Spinner` |   | ✓ |   |   |   | ✓ |   |   | ✓ |   |   |   |   | ✓ |   |   | ✓ |   |   |   |   |   |   |   |
| `ProgressBar` |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   | ✓ |   |   |   |
| `QuantitySelector` |   |   |   |   |   |   |   |   |   | ✓ | ✓ | ✓ |   | ✓ | ✓ |   |   |   |   |   |   |   |   |   |
| `Image` | ✓ |   |   | ✓ |   |   | ✓ |   | ✓ | ✓ |   |   | ✓ |   | ✓ |   |   |   |   | ✓ |   | ✓ |   |   |
| `ProductCard` |   |   |   | ✓ |   |   | ✓ |   | ✓ |   |   |   | ✓ |   |   |   |   |   | ✓ |   |   |   |   |   |
| `SearchBar` |   |   |   | ✓ |   | ✓ |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
| `OrderCard` |   |   |   | ✓ |   |   |   |   |   |   |   |   |   |   |   | ✓ |   | ✓ |   | ✓ |   |   |   |   |
| `CostBreakdown` |   |   |   |   |   |   |   |   |   | ✓ |   | ✓ |   |   | ✓ | ✓ |   |   | ✓ |   |   |   |   |   |
| `PriceTierTable` |   |   |   |   |   |   |   |   |   | ✓ | ✓ |   |   |   |   |   |   |   |   |   |   |   |   |   |
| `StatusChip` |   |   |   | ✓ |   |   |   |   |   | ✓ | ✓ |   |   | ✓ |   | ✓ |   | ✓ | ✓ | ✓ | ✓ | ✓ |   |   |
| `CategoryTile` |   |   |   | ✓ | ✓ |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
| `NotificationItem` |   |   |   | ✓ |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
| `KPIValue` |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   | ✓ |
| `AddressCard` |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   | ✓ |   |   |   |   |   |   |   |   |
| `PaymentOption` |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   | ✓ |   |   |   |   |   |   |   |
| `MessageThread` |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   | ✓ |   |
| `EmptyState` |   |   |   | ✓ |   |   | ✓ |   |   |   |   |   | ✓ |   | ✓ |   |   |   |   | ✓ | ✓ |   | ✓ | ✓ |
| `LanguageOption` | ✓ |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
| `Rating` |   |   |   |   |   |   |   |   |   | ✓ |   |   |   |   |   |   |   |   |   |   |   | ✓ |   |   |

---

## Coverage summary

| Component | Screens using it |
|-----------|------------------|
| Button | 24 (universal) |
| Skeleton | 13 |
| ProductCard | 5 |
| StatusChip | 10 |
| EmptyState | 7 |
| OrderCard | 5 |
| CostBreakdown | 5 |
| QuantitySelector | 5 |
| Tabs | 3 |
| Avatar | 4 |
| Image | 7 |
| Chip | 4 |
| TextField | 4 |
| Toast | 5 |
| BottomSheet | 5 |
| Radio | 4 |
| Modal | 2 |

## Decisions

- D-RM01 Universal primitives (Button, Skeleton, Image, EmptyState) appear on virtually every screen.
- D-RM02 Composite reuse enforced - ad-hoc product/order presentation is forbidden.
- D-RM03 Where coverage is sparse, consider whether the component is needed at all.