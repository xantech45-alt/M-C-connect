# 20 - Traceability Matrix

> Maps every business requirement to its user flow, screen, component, state, and acceptance criteria.

---

## 1. Matrix format

```
Business Requirement
        ↓
User Flow
        ↓
Screen
        ↓
Component
        ↓
State
        ↓
Acceptance Criteria
```

---

## 2. Business requirements

### BR-01 - Customer can sign up and create a company profile
- **Flow:** AUTHENTICATION_FLOW
- **Screens:** 01, 02, 03
- **Components:** OnboardingCarousel, OTPForm, BusinessProfileForm
- **State:** auth + company profile
- **Acceptance:** language picker → phone OTP → company profile → home, with all fields validated

### BR-02 - Customer can search by text
- **Flow:** SEARCH_FLOW
- **Screens:** 04, 06, 07
- **Components:** SearchBar, ProductCard, EmptyState
- **State:** search (query, filters, results)
- **Acceptance:** typing returns results within 500 ms of keystroke, filters apply, empty state renders when no results

### BR-03 - Customer can search by image
- **Flow:** IMAGE_SEARCH_FLOW
- **Screens:** 09
- **Components:** ImageSearchCapture, ProductCard
- **State:** image upload + search results
- **Acceptance:** camera or upload triggers analysis, results render or empty state appears

### BR-04 - Customer can browse categories
- **Flow:** DISCOVERY_FLOW
- **Screens:** 04, 05
- **Components:** CategoryTile, CategoryStrip
- **State:** categories
- **Acceptance:** tapping a category loads that category's products

### BR-05 - Customer can inspect a product
- **Flow:** PRODUCT_DECISION_FLOW
- **Screens:** 10, 11
- **Components:** ProductGallery, PriceTierTable, SpecificationRow
- **State:** product detail
- **Acceptance:** gallery swipes, specs render, tier pricing table renders, MOQ visible

### BR-06 - Customer can see landed cost
- **Flow:** PRODUCT_DECISION_FLOW
- **Screens:** 12
- **Components:** LandedCostPanel
- **State:** landed cost (estimated/confirmed)
- **Acceptance:** every fee visible, estimated vs confirmed distinguished, unit cost computed

### BR-07 - Customer can compare products
- **Flow:** PRODUCT_DECISION_FLOW
- **Screens:** 13
- **Components:** ComparisonTable
- **State:** comparison set
- **Acceptance:** up to 3 products, side-by-side, attributes aligned

### BR-08 - Customer can request a quote
- **Flow:** RFQ_FLOW
- **Screens:** 14
- **Components:** RFQForm
- **State:** RFQ draft
- **Acceptance:** form validates, submits to M&C, success state shown, ETA communicated

### BR-09 - Customer can add to cart and check out
- **Flow:** CART_CHECKOUT_FLOW
- **Screens:** 15, 16, 17, 18
- **Components:** CartLine, CheckoutSummary, PaymentOption
- **State:** cart + checkout
- **Acceptance:** MOQ met, summary accurate, payment option selectable, order placed, confirmation visible

### BR-10 - Customer can see their orders
- **Flow:** ORDER_TRACKING_FLOW
- **Screens:** 20
- **Components:** OrderCard
- **State:** orders list
- **Acceptance:** orders sorted by recency, status chips correct, tap to detail

### BR-11 - Customer can track an order
- **Flow:** ORDER_TRACKING_FLOW
- **Screens:** 21
- **Components:** ShipmentTimeline
- **State:** tracking
- **Acceptance:** current step emphasised, completed steps marked, ETA visible

### BR-12 - Customer can view quality inspection report
- **Flow:** QUALITY_CONTROL_FLOW
- **Screens:** 22
- **Components:** QualityInspectionPanel
- **State:** QC report
- **Acceptance:** verdict visible, photos render, M&C attribution present

### BR-13 - Customer can message M&C
- **Flow:** CUSTOMER_SUPPORT_FLOW
- **Screens:** 23
- **Components:** MessageThread, MessageItem
- **State:** messages
- **Acceptance:** threads load, messages send, unread count visible, attachments supportable

### BR-14 - Customer can see business dashboard
- **Flow:** n/a (consumption)
- **Screens:** 24
- **Components:** AnalyticsSummary, KPIValue
- **State:** analytics
- **Acceptance:** KPIs render, trend chart renders, recent orders visible

### BR-15 - Customer can manage profile and settings
- **Flow:** AUTHENTICATION_FLOW
- **Screens:** 03, profile settings
- **Components:** ProfileForm, LanguageOption, NotificationSettings
- **State:** profile + preferences
- **Acceptance:** edit profile, change language, manage notifications, logout confirm

---

## 3. Component-to-screen coverage

| Component | Used on screens |
|-----------|-----------------|
| OnboardingCarousel | 01 |
| OTPForm | 02 |
| BusinessProfileForm | 03 |
| SearchBar | 04, 06, 09 |
| CategoryTile | 04, 05 |
| ProductCard | 04, 07, 09, 13 |
| OrderCard | 04, 20 |
| KPIValue | 24 |
| ProductGallery | 10 |
| PriceTierTable | 10, 11 |
| LandedCostPanel | 10, 12 |
| ComparisonTable | 13 |
| RFQForm | 14 |
| CartLine | 15 |
| CheckoutSummary | 15, 16 |
| PaymentOption | 17 |
| StatusChip | 10, 11, 20, 21, 22 |
| ShipmentTimeline | 21 |
| QualityInspectionPanel | 22 |
| MessageThread | 23 |
| AnalyticsSummary | 24 |

## 4. Decisions

- D-TR01 Every business requirement must have a complete traceability entry.
- D-TR02 Coverage gaps (component unused on its intended screen) trigger review.