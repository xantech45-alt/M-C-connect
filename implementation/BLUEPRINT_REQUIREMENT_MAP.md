# Blueprint Requirement Map

> Requirement → Source → Screen → Component → Code → Test → Status. Lives throughout implementation.

---

## Convention

Every blueprint business requirement (BR-NN in `blueprint/20_TRACEABILITY_MATRIX.md`) and every
phase-acceptance gate gets one row here. When code lands, the row is updated.

## Map (initial - all rows start PENDING)

| ID | Requirement | Source | Screen / Route | Component | Code path | Test path | Status |
|----|-------------|--------|----------------|-----------|-----------|-----------|--------|
| BR-01 | Sign-up + company profile | `20_TRACEABILITY_MATRIX.md` § 2 | 01, 02, 03 | OnboardingCarousel, OTPForm, BusinessProfileForm | `src/routes/{Onboarding,Login,BusinessProfile}.tsx` | `src/__tests__/access.test.tsx` | PENDING |
| BR-02 | Text search | `20_TRACEABILITY_MATRIX.md` § 2 | 04, 06, 07 | SearchBar, ProductCard | `src/features/search/*` | `src/__tests__/search.test.tsx` | PENDING |
| BR-03 | Image search | `20_TRACEABILITY_MATRIX.md` § 2 | 09 | ImageSearchCapture | `src/features/image-search/*` | manual visual | PENDING |
| BR-04 | Category browse | `20_TRACEABILITY_MATRIX.md` § 2 | 04, 05 | CategoryTile, CategoryStrip | `src/features/categories/*` | `src/__tests__/categories.test.tsx` | PENDING |
| BR-05 | Product inspection | `20_TRACEABILITY_MATRIX.md` § 2 | 10, 11 | ProductGallery, PriceTierTable, SpecificationRow | `src/features/product/*` | `src/__tests__/product.test.tsx` | PENDING |
| BR-06 | Landed cost | `20_TRACEABILITY_MATRIX.md` § 2 | 12 | LandedCostPanel | `src/features/product/LandedCost.tsx` | `src/__tests__/landedCost.test.tsx` | PENDING |
| BR-07 | Compare | `20_TRACEABILITY_MATRIX.md` § 2 | 13 | ComparisonTable | `src/features/compare/*` | manual visual | PENDING |
| BR-08 | RFQ | `20_TRACEABILITY_MATRIX.md` § 2 | 14 | RFQForm | `src/features/rfq/*` | `src/__tests__/rfq.test.tsx` | PENDING |
| BR-09 | Cart + checkout | `20_TRACEABILITY_MATRIX.md` § 2 | 15, 16, 17, 18 | CartLine, CheckoutSummary, PaymentOption | `src/features/cart/*`, `src/features/checkout/*` | `src/__tests__/cart.test.tsx` | PENDING |
| BR-10 | Orders list | `20_TRACEABILITY_MATRIX.md` § 2 | 20 | OrderCard | `src/features/orders/Orders.tsx` | `src/__tests__/orders.test.tsx` | PENDING |
| BR-11 | Tracking | `20_TRACEABILITY_MATRIX.md` § 2 | 21 | ShipmentTimeline | `src/features/orders/Tracking.tsx` | manual visual | PENDING |
| BR-12 | QC report | `20_TRACEABILITY_MATRIX.md` § 2 | 22 | QualityInspectionPanel | `src/features/quality/*` | manual visual | PENDING |
| BR-13 | Messaging | `20_TRACEABILITY_MATRIX.md` § 2 | 23 | MessageThread, MessageItem | `src/features/messages/*` | `src/__tests__/messages.test.tsx` | PENDING |
| BR-14 | Dashboard | `20_TRACEABILITY_MATRIX.md` § 2 | 24 | AnalyticsSummary, KPIValue | `src/features/dashboard/*` | `src/__tests__/dashboard.test.tsx` | PENDING |
| BR-15 | Profile + settings | `20_TRACEABILITY_MATRIX.md` § 2 | 03 + profile | ProfileForm, LanguageOption | `src/features/profile/*` | `src/__tests__/profile.test.tsx` | PENDING |

## How this map is updated

When a phase completes:

1. Locate every row whose Screen route or Component lives in that phase.
2. Set the Code path and Test path.
3. Set Status to **DONE** only when:
   - Implementation merged.
   - Unit/snapshot test added.
   - Visual review at 320 / 360 / 390 / 414 / tablet passes.
   - Accessibility review (touch targets + contrast) passes.
   - No bug assigned to this row is BLOCKER/CRITICAL open.
4. Any gap is recorded in `DEVIATION_REGISTER.md` with rationale.
