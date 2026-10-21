# 08 · Implementation changelog (21 Oct 2026)

**Baseline:** HEAD `0a21c46` plus **uncommitted owner work already in the tree** at session start (22 files: `new modification.pdf` changes to HomePage, PaymentPage, SearchResults, transport, SectionHeader, HeroCarousel, decision docs). That work was preserved and built on. Nothing was reverted. Nothing is committed.

## New files

| File | Purpose |
|---|---|
| `src/components/composite/DesktopNav.tsx` + `.module.css` | Desktop (≥1024) section nav: five anchors with `aria-current` and a Demande sur mesure button |
| `src/components/composite/SiteFooter.tsx` + `.module.css` | Desktop footer: link columns, payment-safety notice (MS-TRU-01), demonstration-data disclosure |
| `src/domain/format.ts` | `formatDateFr()`: customer dates in French (INV-8) |
| `src/domain/format.test.ts` | Tests for `formatDateFr` and the FCFA label |
| `src/layouts/TabsLayout.test.tsx` | Shell tests: phone (bottom nav, no footer) vs desktop (one nav, Demande sur mesure, footer) |

## Modified files (this session)

| File | Change | Finding |
|---|---|---|
| `src/styles/tokens.css` | Content-width tokens, `--commerce-header-h`, desktop gutter and section rhythm, `--warning` darkened, 414px gutter rule bounded to <600 | F-01, F-14, F-23 |
| `src/styles/globals.css` | Removed the duplicate 768px gutter override that masked the cascade bug | F-23 |
| `src/hooks/useMediaQuery.ts` | Shared `RAIL_QUERY`, `DESKTOP_QUERY`, `NO_BOTTOM_NAV_QUERY` | F-02 |
| `src/components/composite/CommerceHeader.tsx` + css | Grid-area header (three rows mobile / one row desktop), DesktopNav row, publishes its height | F-02 |
| `src/layouts/TabsLayout.tsx` + css | Three nav modes. Desktop centred outlet plus footer | F-01, F-02, F-10 |
| `src/layouts/PdpLayout.tsx` + css | Same modes. Global header on desktop. `overflow-x: clip` (sticky fix) | F-05 |
| `src/layouts/DetailLayout.tsx` + css | `width` prop (narrow 760). Static page heading on desktop. Pre-auth centred card. Sticky offset from the measured header | F-07, F-08 |
| `src/app/AppRouter.tsx` | `width="narrow"` on 19 form/reading routes | F-08 |
| `src/components/composite/StickyActionBar.tsx` + css | Shared query. Contained, right-aligned on desktop | F-05 |
| `src/components/composite/HeroCarousel.module.css` | Desktop 16:5 banner, radius token, larger type | F-03 |
| `src/pages/HomePage.tsx` + css + test | Eight-column categories, flash grid, French trust strip, real Suivi rapide order and deep link | F-03, F-04, F-21, F-22 |
| `src/pages/OnboardingPage.tsx` + css + test | Persist completion, `/` redirect, skip/finish → /home, sign-in link, tab/tabpanel, desktop two-column | F-11, F-12, F-13 |
| `src/i18n/strings.ts` | `onboarding.login` (FR/EN) | F-11 |
| `src/pages/SearchResultsPage.tsx` + css | Two-column desktop cards. Fabricated ratings removed | F-06, F-25 |
| `src/pages/ProductDetailPage.tsx` + css | Fabricated rating removed. Sticky offsets. Desktop action widths. Title row contained in the 1280 column (no negative-margin bleed) | F-05, F-25 |
| `src/layouts/DetailLayout.module.css` (gutter) | `.bare .bareContent > *` drops the page root's own horizontal gutter (was doubled on 18 routes) | F-24 |
| `src/pages/AllProductsPage.tsx` + css | Hidden h2 (heading order). Five columns ≥1280 | F-17 |
| `src/pages/ProfilePage.tsx` + css | aside/main wrappers. Desktop two-column | F-09 |
| `src/pages/BusinessProfilePage.tsx` | `htmlFor`/`id` and autocomplete on six inputs | F-15 |
| `src/pages/QualityControlPage.tsx` | `role="img"` on photo placeholders | F-16 |
| `src/pages/VerifyCodePage.module.css` | Fluid gap (320px overflow) | F-18 |
| `src/pages/OrdersPage.tsx`, `OrderTrackingPage.tsx` | French dates ("Arrivée estimée : 22 sept. 2026") | F-20 |
| `src/pages/OrderConfirmationPage.tsx` + test | Spec 4.2 wording, no fake ref | F-26 |
| `src/components/primitives/PriceDisplay.tsx`, `composite/ProductCard.tsx`, `domain/pricing.ts`, `state/coupons.ts`, `state/notifications.ts`, and the pages Addresses, Cart, Compare, Coupons, Dashboard, Filters, Home, Orders, OrderTracking, Payment, ProductDetail, RequestQuote, SearchResults, Settings | "XOF" → "FCFA" in customer-visible text only (types and field names unchanged) | F-19 |

## Not changed (deliberately)

The business workflows (payment plans, transport step, landed-cost removal) are left as they are, and so are the routes, the framework, and the dependencies. Mobile layouts below 900px are also unchanged, apart from the label/date/a11y fixes, which apply everywhere.
