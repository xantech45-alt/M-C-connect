# 08 - Frontend State Architecture

> State families and ownership rules. Backend schemas are out of scope.

---

## 1. State families

| Family | Scope | Persistence |
|--------|-------|-------------|
| Global UI | Theme, language, bottom-sheet open, current modal | Memory |
| Auth | Session, profile, company | Secure storage + refresh |
| Catalog | Categories, products, product detail | Server cache |
| Discovery | Recent searches, suggestions, filters | Memory + local persistence |
| Cart | Line items, MOQ, shipping option | Local persistence |
| RFQ | Open quotes, history | Server cache |
| Orders | List, detail, tracking, status | Server cache |
| Messages | Threads, unread, attachments | Server cache |
| Notifications | Alerts, system messages | Server cache |
| Analytics | Period, metrics, charts | Server cache |
| Localization | Locale, currency, units | Device preference |
| Form (ephemeral) | Drafts, validation, dirty flags | Memory |

---

## 2. State ownership rules

- **Auth state** is owned at app root and consumed by protected routes only.
- **Catalog state** is owned by a catalog feature store and exposed read-only to consumers.
- **Cart state** is owned by the cart feature store and never reaches beyond the commerce module.
- **Form state** is owned by the form component (ephemeral) and discarded on unmount unless draft persistence is requested.
- **Server-derived state** flows through a server-state library (e.g. cached async store); never duplicated into UI state.

## 3. Cross-feature communication

- Avoid cross-feature reads.
- Use the message thread (managed) to push notifications between features.
- Use deep links for navigation handoffs (e.g. PDP → Cart).

## 4. Server-derived state shapes (planned)

| State | Conceptual fields |
|-------|-------------------|
| Auth | `sessionToken`, `refreshToken`, `userId`, `companyId`, `expiresAt` |
| Company profile | `legalName`, `registrationNumber`, `taxId`, `address`, `industry`, `contactName`, `phone`, `email` |
| Category | `id`, `slug`, `name`, `iconKey`, `productCount` |
| Product summary | `id`, `title`, `category`, `price`, `currency`, `moq`, `imageUrl`, `verification`, `tierPricing` |
| Product detail | `id`, `title`, `description`, `gallery[]`, `specs[]`, `price`, `moq`, `tiers[]`, `verification`, `warranty`, `deliveryEstimate`, `similar[]` |
| Search | `query`, `filters`, `results[]`, `totalCount`, `sort` |
| Cart line | `productId`, `variantId`, `quantity`, `unitPrice`, `moqMet` |
| Cart | `lines[]`, `shipping`, `subtotal`, `totalEstimate` |
| RFQ | `id`, `productId`, `quantity`, `destination`, `notes`, `status`, `response` |
| Order | `id`, `placedAt`, `lines[]`, `status`, `tracking`, `qcReportId?`, `total` |
| Tracking | `orderId`, `currentState`, `timeline[]`, `eta` |
| QC report | `id`, `orderId`, `verdict`, `photos[]`, `notes`, `createdAt` |
| Message thread | `id`, `subject`, `lastMessage`, `unread`, `participants[]` |
| Message | `id`, `threadId`, `author`, `body`, `attachments`, `createdAt` |
| Notification | `id`, `kind`, `title`, `body`, `link`, `read` |
| Dashboard | `period`, `metrics{...}`, `series[]`, `categoryMix[]`, `recentOrders[]` |

## 5. Form state pattern

- Drafts auto-saved on blur for forms ≥ 4 fields (RFQ, business profile, payment setup).
- Validation strategy: validate on blur, re-validate on submit, never while typing unless required.
- Error display: text below field, never colour-only.
- Disabled submit until form is valid; primary CTA shows loading state during submit.

## 6. Offline / degraded state

- Order list, order tracking, messages: read cached values when offline.
- Cart: persists locally; offline submission is queued and synced on reconnect.
- Search and discovery: requires network; show offline banner when unavailable.
- Image search: requires network; show inline error if offline.
- Payment: requires network; never allow offline payment.

## 7. Ephemeral UI state

- Bottom sheet open/closed
- Modal open/closed
- Active filter chip
- Currently focused input
- Toast queue

These live in UI store only and never persist.

## 8. Decisions

- D-ST01 Server-derived state goes through a cache; UI state never duplicates it.
- D-ST02 Form drafts auto-save for forms with ≥ 4 fields.
- D-ST03 Offline reads are allowed for orders/tracking/messages; writes are queued.
- D-ST04 Auth state never leaves secure container.