# 01 - Product Scope

> What is in and out of the M&C Connect frontend.

---

## 1. Product statement

**M&C Connect** is a managed B2B digital sourcing and import platform that connects Malian businesses with verified Chinese manufacturing capabilities. M&C Connect owns every step between product discovery and last-mile delivery inside Mali.

**Tagline (French primary):** *« Vous choisissez ce dont vous avez besoin ; M&C Connect s'occupe du reste. »*

---

## 2. Primary user

- Malian SME owner, buyer, or operations manager.
- Sources products from China but cannot navigate supplier discovery, negotiation, MOQ, customs, or shipping alone.
- Speaks French primarily; some English; limited Bambara literacy.
- Wants to feel they are working with one trusted partner (M&C), not with a marketplace.

## 3. Core business principles

1. **One commercial touchpoint** - M&C is always the counterparty. Customer never interacts with Chinese suppliers.
2. **Transparent landed cost** - every fee shown individually; estimated vs confirmed always distinct.
3. **Managed operations** - sourcing, QC, shipping, customs, delivery, support all owned by M&C.
4. **Professional voice** - copy speaks like a B2B advisor, not a consumer marketplace.
5. **African-market appropriate** - XOF currency, French-first copy, mobile-first context.

---

## 4. Frontend scope - IN

### Functional
- Onboarding, language selection, login (phone + OTP), business profile
- Product discovery: home, categories, search, image search, filters, recommendations
- Product decision: gallery, specifications, MOQ/tier pricing, landed cost, comparison, RFQ
- Commerce: cart, order review, payment, confirmation, quote received
- Fulfillment: order list, tracking, quality inspection report
- Relationship: managed messages, business dashboard
- Notifications, settings, profile management, language switching, support entry

### Non-functional
- Mobile-first responsive (320 → tablet)
- French-primary localization with English + Bambara
- Accessibility baseline (44 px targets, 4.5:1 contrast, no colour-only meaning)
- 7 viewport widths covered
- Offline awareness for orders and tracking
- Reduced-motion respect
- Light theme as baseline; dark theme is future work

---

## 5. Frontend scope - OUT (handled by other systems)

| Out of scope | Owner |
|--------------|-------|
| Supplier sourcing logic | Backend service |
| Supplier KYC / verification | Backend service |
| Supplier communication channel | M&C operations team |
| Price negotiation engine | Backend service |
| Customs / HS-code / duty calculation | Backend service |
| Payment processing & KYC | Payment provider |
| Logistics carrier integration | Backend service |
| Quality inspection report authoring | M&C operations |
| AI image-search model | ML team |
| Push notification delivery | Backend service |
| Analytics warehouse | Data team |
| Backend schema / API contract | Backend team |
| Native iOS / Android shell | Future native teams |
| Desktop browser support | Future |
| Dark theme | Future |

---

## 6. Frontend scope - NEVER EXPOSE

The frontend **must never** render:

- Supplier phone number
- Supplier email
- Supplier WhatsApp / WeChat handle
- Factory address
- Direct supplier URL
- Supplier-side chat window
- Direct supplier payment info

All supplier-side touch is mediated by M&C. See `15_FRONTEND_SECURITY_BOUNDARIES.md`.

---

## 7. Success metrics the UI must support

| Metric | UI surface |
|--------|-----------|
| Time-to-first-RFQ | Onboarding → RFQ funnel |
| RFQ-to-quote response time | Notifications, messages |
| Cart abandonment | Cart UX, payment friction |
| Order tracking engagement | Tracking screen depth |
| Repeat-purchase rate | Home recommendations, recent orders |
| Support ticket volume | Messages, status clarity |
| Mobile crash-free sessions | Engineering (not design) |
| Localization defect rate | French/Bambara regression suite |

---

## 8. Explicit non-goals

- No consumer-grade discovery (no social feed, no reels).
- No gamification (no streaks, no badges for buying).
- No "AI-generated" decorative graphics.
- No glassmorphism or neon styling.
- No supplier-side rating system visible to buyer (reputation is internal).
- No direct supplier call-to-action under any circumstance.

---

## 9. Frontend boundary diagram

```
┌─────────────────────────────────────────────────────────────┐
│  M&C Connect Mobile App (this blueprint)                    │
│  ─────────────────────────────────────────────────────────  │
│  Onboarding · Discovery · Decision · Commerce · Fulfillment  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ via future REST/GraphQL contracts
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Backend services (out of scope here)                       │
│  ─────────────────────────────────────────────────────────  │
│  Auth · Catalog · Quote · Order · Tracking · QC · Messaging │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
            M&C operations · Suppliers · Logistics · Customs
```

---

## 10. Decisions

See `21_DECISIONS.md` for the full log. Notable early entries:

- D-001 Mobile-first is mandatory; tablet is graceful growth, desktop is not in scope.
- D-002 French (Mali) is the canonical locale for copy and content design.
- D-003 Red is an accent only; target ≤12% screen area.
- D-004 One dominant red CTA per screen.