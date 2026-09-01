# State Implementation Map

> How each blueprint state family is implemented in React.

---

| Family | Source | Implementation | Persistence |
|--------|--------|----------------|-------------|
| Auth | `08_FRONTEND_STATE_ARCHITECTURE.md` § 1 | `AuthProvider` context: `{ session, company, login(phone), verifyOtp(code), logout() }` | `localStorage` (`mc.auth`) |
| Catalog | § 1 | `useCatalog` hooks (read-only) backed by `src/data/mock/catalog.ts` | in-memory + `localStorage` cache |
| Discovery | § 1 | `DiscoveryProvider` context: `{ recent, suggestions, filters }` | `localStorage` (`mc.discovery`) |
| Cart | § 1 | `CartProvider` context: `{ lines, add, update, remove, clear, totals }` | `localStorage` (`mc.cart`) |
| RFQ | § 1 | `RFQProvider` context: `{ items, submit, getById }` | in-memory (RFQs resolve via mock) |
| Orders | § 1 | `OrdersProvider` context + `useOrders()` hook backed by mock | `localStorage` (`mc.orders`) |
| Messages | § 1 | `MessagesProvider` context: `{ threads, send, markRead }` | `localStorage` (`mc.messages`) |
| Notifications | § 1 | `NotificationsProvider` context | `localStorage` (`mc.notifications`) |
| Analytics | § 1 | `AnalyticsProvider` context: derived from orders | derived |
| Localization | § 1 | `LocaleProvider` context: `{ locale, setLocale, t }` | `localStorage` (`mc.locale`) |
| UI (ephemeral) | § 1 | Local component state + small Contexts (sheet open, modal open, current focus) | - |
| Form (ephemeral) | § 1 | `useFormDraft` hook for ≥ 4-field forms (profile, RFQ, payment) | `sessionStorage` per route |

## Server-state boundary

Per D-015: server-derived state is **never** duplicated into UI state. Components read from
contexts; contexts read from mocks. When backend lands, mocks are replaced by API clients; UI does
not change.

## Offline behaviour

Per D-016:

- **Reads** (orders, tracking, messages): read from `localStorage` when offline.
- **Writes** (cart, form drafts): persist locally; queue sync when online.
- **Search**: requires network; banner shown when offline.
- **Image search**: requires network; inline error.
- **Payment**: requires network; never allow offline payment.

Offline detection via `navigator.onLine` + `online`/`offline` events in `OfflineProvider`.
