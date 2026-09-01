# Amazon UI Audit - M&C Connect Frontend Restructure

> Source-of-truth for the Amazon-inspired restructure of the M&C Connect
> mobile + tablet web frontend. Patterns distilled from Amazon Mobile
> App, Amazon Mobile Web, and Baymard Institute research (2024).

This is a *pattern* reference. Nothing about Amazon branding (orange,
dark navy, fonts, logos, copy) is to be copied.

---

## 1. Methodology

| Source | Purpose |
|---|---|
| Amazon Mobile App (iOS / Android) | Header, search prominence, cart badge, sticky buy box, order-aware home |
| Amazon Mobile Web | PDP gallery, autocomplete, sort/filter bar, breadcrumbs |
| Baymard Institute checkout research | Form minimization, single-page flow, inline validation, input modes |
| Internal blueprint (`/blueprint`) | Business model, M&C branding, supplier isolation, French-Mali locale |
| Existing source code | Foundation not to be rebuilt |

---

## 2. Pattern Adoption Table

| Pattern | Amazon purpose | M&C relevance | Verdict | Implementation target |
|---|---|---|---|---|
| **Global commerce header with brand + actions + cart badge** | Persistent orientation; one-tap to commerce actions | M&C needs brand presence, search entry, cart badge, delivery context | **ADAPT** | `CommerceHeader` on `TabsLayout` |
| **Delivery/location context in header** | Users know fulfillment zone before browsing | M&C computes landed cost per destination - surface early | **ADAPT** (M&C: "Livraison : Bamako", tap → profile/address) | `DeliveryContext` in `CommerceHeader` |
| **Prominent global search bar (always visible)** | Search is the primary discovery mode | Same - long-tail Mali importers search by SKU/category | **ADOPT** | `SearchBar` variant `home` and `compact` |
| **Camera / visual search entry on search bar** | Visual discovery | M&C blueprint already supports image search | **ADOPT** | `SearchBar` trailing camera icon → `/image-search` |
| **Cart badge with live count** | One-tap access to cart from anywhere | Existing `CartProvider` already drives it | **ADAPT** | `CartButton` shows count; hides badge at 0 |
| **Order-aware home (active order card)** | Reduces support load; increases perceived value | M&C has multi-week imports - order status is highly relevant | **ADAPT** | `ActiveOrderCard` component on Home |
| **Tabbed/sectioned Orders page** | Filter at-a-glance | M&C has 9-stage workflow | **ADAPT** | `OrderStatusTabs` on Orders |
| **Vertical tracking timeline** | Highly visible stage progress | M&C has 8 stages + ETA | **ADOPT** | `TrackingTimeline` already exists; enhance visuals |
| **Sticky buy box with quantity + primary CTA** | Persistent purchase affordance | Same; M&C adds MOQ + quote request | **ADAPT** | `StickyActionBar` already exists; ensure MOQ visibility |
| **Inline form validation** | Mobile reduces error recovery cost | Same | **ADAPT** | `Input` component supports `error` prop; add on-the-fly validation |
| **Localized input modes (`inputmode`)** | Correct mobile keyboard | Same | **ADOPT** | Verify on every `Input` - tel/numeric/email already in use |
| **Card-based summary only where it earns its space** | Information density | Blueprint says "professional density ≠ clutter" | **ADAPT** | Restrict cards to product/order/financial/summary |
| **Search autocomplete with structured suggestions** | Faster query completion | Mali users may search in fr-ML or romanized Bambara | **ADAPT** | `AutocompletePanel` triggered on focus |
| **No-results recovery with related suggestions + CTA** | Avoid dead-end | M&C can offer "Demander un sourcing M&C" | **ADOPT** | Update `SearchResults` empty state |
| **Sort/filter chips bar** | Discoverability of controls | Already in `SearchResultsPage`; refine | **ADAPT** | Convert counts to chips; add applied-filter strip |
| **Image gallery with counter + swipe** | PDP visual evaluation | Same; M&C has 1-N supplier images | **ADAPT** | `ProductGallery` with `<picture>` + aspect ratio |
| **Landed cost preview entry on PDP** | Buyers want total cost up front | **M&C differentiator** vs Amazon | **AMPLIFY** | "Voir le coût total rendu" link from PDP |
| **Recharts for dashboard** | Maintain visual maturity | Recharts already in deps | **ADOPT** | Use existing lib; restrain color palette to 2-3 hues |
| **Structured account sections** | Mature ecommerce accounts | M&C has enterprise fields | **ADOPT** | Profile rows nav: Entreprise, Coordonnées, Adresses, Préférences, Langue, Sécurité, Notifications, Support, À propos |
| **M&C-only messaging** (never supplier chat) | Business model isolation | Hard constraint in blueprint | **AMPLIFY** | Strengthen copy: "Toute conversation passe par M&C Connect" |
| **Inter font + reduced red ≤ 12 % + 1 dominant CTA per screen** | Already in blueprint | Brand discipline | **ADOPT** | Verified in tokens |

---

## 3. Patterns to REJECT

| Pattern | Why rejected |
|---|---|
| Amazon orange / dark navy | Brand conflict |
| "Contact seller" / "Chat with supplier" | Blueprint forbids supplier exposure |
| Open marketplace seller profile | M&C is sole commercial counterparty |
| Multi-column desktop checkout | Mobile-first constraint |
| Aggressive auto-rotating hero banner | Spec §17 forbids |
| Multi-product cross-sell rails on PDP before buy-box intent | Adds friction |
| Voice search | Blueprint has no approval |
| Social notification clutter | Off-message |

---

## 4. Phase Routing (mapped to Phase R* in tasks)

| Phase | Output |
|---|---|
| R0 | This audit + gap analysis (this doc) |
| R1 | `CommerceHeader`, `DetailCommerceHeader`, `DeliveryContext`, `NotificationButton`, `CartButton`, sticky behavior |
| R2 | Token refinement (surface layers, spacing rhythm, semantic sizes) |
| R3 | Home: hero, active order, 6-category rail, recommended, recently viewed, trust |
| R4 | Categories + Search + Filters + Autocomplete + Recovery |
| R5 | ProductCard (single family), PDP gallery, trust, delivery, landed-cost entry, related |
| R6 | RFQ + LandedCost polish |
| R7 | Cart + Checkout (single-page, inline validation, inputmode, sticky CTA) |
| R8 | Orders + Tracking + QC |
| R9 | Messages + Profile sections |
| R10 | Dashboard with date range, 4 KPIs, trend, distribution, active, recent |
| R11 | Phone QA 320–430 |
| R12 | Tablet QA 600–1024 |
| R13 | A11y + perf hardening |
| R14 | Final consistency + acceptance |

---

## 5. Design System Updates Driven by Audit

- **Surface layers**: primary `#F5F6F8` (page bg) → content `#FFFFFF` (cards) → tint `#FBEAEC` (red-tint chips only).
- **Type scale**: keep Inter, add explicit `font-size-display-md` (24 px) for section titles; price uses `title-md` (18 px).
- **Spacing**: `--space-2` (8 px) becomes the rhythm unit; section gaps use `--space-5` (20 px).
- **Borders**: `1 px solid var(--border)`; no shadows on informational cards; `elev-1` only on overlays.
- **Red usage**: limited to primary CTA, active nav state, selected filter chip, key accent border on verified-supplier chip.
