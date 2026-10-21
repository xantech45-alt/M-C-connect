# Implementation Decision Log

> Implementation-side decisions only. Architectural ADRs live in `blueprint/21_DECISIONS.md`.

---

## IDI-001 - Stack choice
- **Status:** Accepted
- **Context:** No existing React project; we build from scratch.
- **Decision:** Vite + React 18 + TypeScript + React Router v6 + Lucide React + Recharts + Vitest.
- **Rationale:** Vite is the fastest modern dev server; React Router is the de-facto standard; Lucide matches the blueprint's outline icon requirement (1.5 px stroke); Recharts is the lightest accessible chart lib; Vitest pairs naturally with Vite.
- **Consequences:** Plain CSS (CSS variables + modules) instead of Tailwind to keep tokens authoritative.

## IDI-002 - Bottom-nav tab set
- **Status:** Accepted
- **Context:** Blueprint specifies 5 tabs.
- **Decision:** Routes `/(tabs)/home`, `/(tabs)/orders`, `/(tabs)/products`, `/(tabs)/messages`, `/(tabs)/profile`.
- **Consequences:** "Products" tab nests the catalog entry (categories + search + image search).

## IDI-003 - Mock data layer
- **Status:** Accepted
- **Context:** No backend.
- **Decision:** All async data flows through `src/data/mock/*` returning typed promises with simulated latency. Each provider has a single seam to swap for a real API client.
- **Consequences:** Zero backend coupling. UI is fully exercisable.

## IDI-004 - Localization seam
- **Status:** Accepted
- **Context:** Need a single seam for `fr-ML` / `en` / `bm`.
- **Decision:** `LocaleProvider` exposes `{ locale, setLocale, t }`; `t(key)` returns the string for the active locale and falls back to `fr` then `en`. Strings live in `src/i18n/strings/{fr-ML,en,bm}.ts`.
- **Consequences:** No screen reaches into raw strings; copy freeze is straightforward.

## IDI-005 - Image fallback policy
- **Status:** Accepted
- **Context:** Industrial photography gap.
- **Decision:** Use supplied photography where it fits; render a `PlaceholderImage` (clean neutral background + product silhouette icon) for missing industrial categories. UI never shows a broken-image icon.
- **Consequences:** Visual consistency preserved; queue industrial photography capture.

## IDI-006 - Sticky-bar component
- **Status:** Accepted
- **Context:** Spec mandates 72 dp + safe-area, mutually exclusive with bottom nav.
- **Decision:** `<StickyBar>` component handles safe-area inset and renders primary CTA + optional secondary. Layout wrappers (`TabsLayout`, `DetailLayout`) ensure mutual exclusion.
- **Consequences:** Predictable thumb-zone behaviour.

## IDI-007 - Status mapping (single source of truth)
- **Status:** Accepted
- **Context:** Order status is referenced across tracking, dashboard, orders list.
- **Decision:** `src/data/statusMap.ts` exports `ORDER_STATUS_META`, `PAYMENT_STATUS_META`, `QC_VERDICT_META` - each is `{ key, label, tone, icon }`. `StatusChip` consumes this.
- **Consequences:** No drift between screens; one place to add a status.

## IDI-008 - Gate A: mockups define visuals, B2B model defines information architecture
- **Status:** Accepted (Phase 0 sign-off)
- **Context:** `frontend desing and logic/` mockups depict a consumer marketplace (cart, buy-now, promo codes, flash sales, favourites, social sign-in). The codebase and `M^0C Connect.docx` describe a managed B2B sourcing platform (MOQ, RFQ, landed cost, HS codes, QC, no direct supplier contact) - already encoded in `blueprint/21_DECISIONS.md` D-005.
- **Decision:** Adopt mockup layout, spacing, card anatomy, chip rows, sticky action bars, bottom-nav treatment. Keep every B2B surface: MOQ on cards/PDP, `/product/:id/landed-cost`, `/compare`, `/rfq/new`, `/rfq/received`, `/orders/:id/qc`, `/dashboard`, `/profile-setup`. PDP sticky pair is "Ajouter au panier" + "Acheter maintenant", where "Acheter maintenant" routes to `/checkout/review` (not a direct-purchase flow). No supplier profiles, storefronts, or supplier chat; the mockup PDP "Boutique" icon is replaced with "Devis" → `/rfq/new`.
- **Consequences:** All new Phase 2+ screens (auth, profile, commerce) must be built B2B-first even where the mockup wording reads B2C. Supersedes nothing; reinforces D-005.

## IDI-009 - Gate B: bottom nav keeps Set B (Accueil, Commandes, Produits, Messages, Profil)
- **Status:** Accepted (Phase 0 sign-off) - already implemented, confirmed not re-derived
- **Context:** Mockups contain two incompatible tab sets. `BottomNav.tsx` / `TabsLayout` and `blueprint/21_DECISIONS.md` D-020 already ship Set B.
- **Decision:** Keep Set B. Cart stays a persistent header badge (`CartButton.tsx`) rather than a tab. The "Produits" tab's active-match prefix array must keep covering `/cart`, `/checkout/*`, `/product/*`, `/rfq/*`.
- **Consequences:** No BottomNav changes required in Phase 0. Verify the match-prefix array when Phase 4/5 add new commerce routes.

## IDI-010 - Gate C: re-seed catalogue to match available photography
- **Status:** Accepted (Phase 0 sign-off) - execution deferred to Phase 1
- **Context:** Seeded catalogue (wax fabric, TVs, fridges, phones, mills) has no matching photography; available photography (39 product photos, 4 square) is fashion/footwear/watches/jewellery/sportswear/perfume/shampoo.
- **Decision:** Re-weight `src/state/catalog.ts` toward Textile & Mode, Beauté & Hygiène, and footwear/accessories under Textile & Mode, keeping the same 8 `CatalogCategory` records. Categories with no photography (Électronique, Maison, Machines, Téléphones, Auto, Industriel) keep the Lucide icon fallback with `imageUrl: undefined` - never a mislabelled photo.
- **Consequences:** Phase 1 must log every zero-photography category in `implementation/ASSET_IMPLEMENTATION_MAP.md` as a capture request.

## IDI-011 - Gate D: image budget allocated by product tier, zero duplicates
- **Status:** Accepted (Phase 0 sign-off) - execution deferred to Phase 1
- **Context:** 43 unique product-grade photos available; naive 19-products × 4-image gallery demands 76.
- **Decision:** Tier 1 (8 hero products): 4 unique gallery images each = 32. Tier 2 (11 products): 1 unique primary image each = 11. Total 43, exact budget, zero reuse. Any future increase in product count lowers Tier 1 gallery depth rather than reusing a file.
- **Consequences:** Phase 1's `registry.test.ts` enforces this as a build-breaking invariant, not a convention.

## IDI-012 - tsconfig `baseUrl` deprecation removed
- **Status:** Accepted
- **Context:** `tsc -b` warned that `baseUrl` is deprecated as of TS 6.0; the only alias in use is `@/*` → `src/*`.
- **Decision:** Removed `baseUrl` from `tsconfig.json` and made the `@/*` path mapping explicitly relative (`./src/*`), which TypeScript resolves against the tsconfig's own directory without `baseUrl`. Chosen over `"ignoreDeprecations": "6.0"` because it fixes the root cause instead of silencing it.
- **Consequences:** `tsc -b` now exits 0 with no warnings. No other code changes needed since `@/*` was already the only alias.

## IDI-013 - ESLint migrated from `.eslintrc.cjs` to flat `eslint.config.js`
- **Status:** Accepted
- **Context:** `package.json` pins `eslint@^9`, which no longer reads legacy `.eslintrc.*` by default; `npm run lint` failed outright ("couldn't find eslint.config.js"), so the lint gate had never actually run green under ESLint 9. `typescript-eslint@8.68.0` (flat-config helper) and `@eslint/js` were already present in `node_modules` as transitive deps of `eslint`/`typescript-eslint`, so no new dependency was added.
- **Decision:** Added `eslint.config.js` (flat config, using `tseslint.config(...)`) preserving the exact same rule set as the old `.eslintrc.cjs`, then deleted `.eslintrc.cjs`. Also added targeted `eslint-disable-next-line react-refresh/only-export-components` comments (with inline justification) on the 6 provider/hook co-location exports (`AuthProvider`/`useAuth`, `CartProvider`/`useCart`, `LocaleProvider`/`useLocale`/`useT`, `OfflineProvider`/`useOffline`, `Toast`/`useToast`) and on `AppRouter`'s `router` export, since splitting each into a second file to satisfy fast-refresh would be an abstraction beyond what the codebase needs.
- **Consequences:** `npm run lint` now exits 0 at `--max-warnings=0`. Any new provider/hook pair added in later phases should follow the same disable-with-justification pattern rather than reintroducing warnings.

## IDI-014 - Baseline Vitest smoke test added
- **Status:** Accepted
- **Context:** `npm test` failed outright ("No test files found") - Vitest/Testing Library were configured but zero test files existed anywhere in the repo, so the `npm test` quality gate had never passed.
- **Decision:** Added `src/components/primitives/Button.test.tsx` (render + click) as a minimal passing baseline. Per-page render tests (heading + primary CTA) are added incrementally as each new route ships in Phases 2–4, and `registry.test.ts` lands in Phase 1, per §7 of the execution prompt.
- **Consequences:** `npm test` now exits 0. This is a floor, not the target coverage - do not treat it as satisfying the Phase 7 test-coverage requirement.

## IDI-015 - Phase 2 auth cluster scoping
- **Status:** Accepted
- **Context:** §4.1 of the execution prompt asks for a terms checkbox on `/register` "linking to
  CGU + privacy," but no CGU/privacy-policy route exists anywhere in the prompt's 21-screen list
  (§4.2–§4.3), and inventing one would violate the "zero dead internal links" Definition of Done.
- **Decision:** `RegisterPage`'s terms checkbox renders the required copy as plain text (not a
  link). Both `register` and `loginWithPassword`/`verifyOtp` success routes navigate to
  `/profile-setup`, mirroring the existing OTP flow's terminus, so the B2B business-profile step
  is never skipped regardless of which auth path was used.
- **Consequences:** If/when a CGU or privacy-policy screen is ever added, wire this checkbox's
  text into real links at that point - tracked here, not forgotten.

## IDI-016 - Phase 3 profile-cluster scoping
- **Status:** Accepted
- **Context:** §4.2 lists rows for "Préférences," "Notifications," "Langue," and "Devise" inside
  `/settings`, and a "Read + edit personal info" description for `/settings/personal` that
  overlaps with `/profile/edit`. No dedicated routes for Préférences/Notifications exist anywhere
  in the prompt's 21-screen list, and duplicating the personal-info form as two components would
  contradict "don't repeat yourself."
- **Decision:** Préférences and Notifications render as non-interactive `NavRow`s (no `to`, no
  chevron - `NavRow` renders a plain `<div>` in that case) rather than linking to non-existent
  routes. Langue/Devise render as display-only rows showing the current value. `/profile/edit`
  and `/settings/personal` both render the same shared `PersonalInfoForm` composite.
- **Consequences:** If Préférences/Notifications screens are added later, wire their `NavRow`s to
  real routes at that point.

## IDI-017 - Destructive address deletion uses `window.confirm`, not a bottom sheet
- **Status:** Accepted (interim)
- **Context:** `blueprint/21_DECISIONS.md` D-019 requires destructive actions to confirm via a
  bottom sheet, but no bottom-sheet primitive exists in this codebase yet. Building one now for a
  single delete button (`/addresses`) would be a disproportionate new-component investment for
  Phase 3.
- **Decision:** `AddressesPage`'s "Supprimer" action uses `window.confirm()` as a pragmatic
  stand-in.
- **Consequences:** Revisit once a bottom-sheet primitive is built for some other screen (D-019
  applies to every destructive action app-wide, not just this one) - swap this call for it then,
  rather than building the primitive speculatively here.

## IDI-018 - `NavRow`/`NavRowList` extracted from `ProfilePage` into a shared composite
- **Status:** Accepted
- **Context:** The icon+label+value+chevron row pattern was previously local to `ProfilePage.tsx`.
  Phase 3 reuses it verbatim across `ProfilePage`, `SettingsPage`, and would have duplicated it in
  `AddressesPage`/`PaymentMethodsPage` had it stayed private.
- **Decision:** Moved to `src/components/composite/NavRow.tsx`, extended with a `danger` variant
  (red "Se déconnecter"/"Déconnexion" rows) and a non-interactive display mode (no `to`/`onClick`
  → renders a `<div>`, no chevron) for rows like "Langue : Français" that have no target screen.
- **Consequences:** Any future account/settings-style list should reuse `NavRow` rather than
  hand-rolling another row component.

## IDI-019 - `/filters` implemented as a top-level route, not a true overlay
- **Status:** Accepted
- **Context:** `blueprint/screens/08_FILTERS.md` specifies a `BottomSheet` component (`role="dialog"`,
  focus-trapped, Esc closes) layered over the calling screen. This router (`createBrowserRouter`,
  single `<Outlet>`, no parallel/modal routes) has no mechanism to render a route "on top of"
  another route still mounted underneath.
- **Decision:** `/filters` is a full top-level route (sibling of `/login`), styled to read as a
  bottom sheet (rounded top corners, drag handle, half-width centered card at ≥900px per the
  spec's tablet behavior) with `role="dialog" aria-modal="true"`. State (which filters, where to
  return) travels via `navigate(..., { state })` and the return trip via URL query params - not a
  true overlay, but the calling screen's `CommerceHeader`/`BottomNav` are simply absent rather than
  incorrectly visible behind a non-functional sheet.
- **Consequences:** No focus-trap or Esc-to-close yet (both listed in the blueprint's Accessibility
  section) - the close (X) button and native browser back both work as escape hatches today.
  Revisit if/when a true modal-route pattern is needed elsewhere.

## IDI-020 - `Switch` extracted as a shared primitive
- **Status:** Accepted
- **Context:** Phase 3's `SettingsSecurityPage` (2FA toggle) and Phase 4's `FiltersPage` (Vérifié
  M&C toggle) both need an accessible on/off switch; no such primitive existed.
- **Decision:** Added `src/components/primitives/Switch.tsx` (`role="switch"`, `aria-checked`,
  required `aria-label`) and refactored `SettingsSecurityPage` to use it instead of its inline
  button+CSS.
- **Consequences:** Any future toggle (Notifications settings, etc.) should reuse `Switch`.

## IDI-021 - Product rating/review-count is a deterministic hash of the product id, not hand-seeded
- **Status:** Accepted
- **Context:** Phase 5 fidelity (`SearchResultsPage` list rows, `ProductDetailPage` head block)
  needs a star rating + review count per product, matching mockups `94e294e7`/`8522b234`. No
  review system or rating field exists on `CatalogProduct`, and hand-seeding 19 products would be
  19 near-duplicate manual edits for purely decorative demo data.
- **Decision:** `src/state/rating.ts` exports `getRating(productId)`, deriving a stable
  3.8-4.9 / 18-327 pair from a simple string hash of the id. Same product always shows the same
  rating across screens; no backend or seed-data change needed.
- **Consequences:** Not real review data - if/when a review system ships, replace this with
  actual aggregates; the call sites (`getRating(product.id)`) are the only places to change.

## IDI-022 - `swiper` added as a runtime dependency (Home hero carousel)
- **Status:** Accepted
- **Context:** Added by the concurrent session working this same project directory in parallel
  during Phase 5, replacing a hand-rolled `useState` + pointer-event swipe hero (the kind already
  used for `OnboardingPage` and the product-gallery dots) with `swiper` in
  `src/components/composite/HeroCarousel.tsx`. Hard rule #2 requires a one-line justification for
  any new runtime dependency; none had been logged, so recording it now rather than after the
  fact next session.
- **Decision:** Keep it. `swiper` provides autoplay (paused under `prefers-reduced-motion`),
  touch swipe, keyboard nav, and accessible pagination/`a11y` roles out of the box - meaningfully
  more robust than hand-rolling the same for one carousel, and it's already wired, tested (typecheck/lint/build all green), and working.
- **Consequences:** One more dependency to keep patched. If a second carousel is ever needed
  elsewhere (e.g. PDP gallery), reuse `HeroCarousel`'s pattern rather than hand-rolling again,
  now that the library is already a dependency.

## IDI-023 - Tablet-landscape left rail nav replaces bottom tab bar at >=900px
- **Status:** Accepted
- **Context:** Phase 6 (responsive mobile + tablet). The fixed bottom tab bar (Gate B, Set B)
  works fine through tablet-portrait widths but wastes significant horizontal space once a
  device is wide enough to show it as a full-width strip (tablet landscape, 900px+). The
  master plan's own definition of done requires the responsive matrix to pass through 1024px
  and calls this range "tablet adaptation (no desktop)".
- **Decision:** Extracted the Set-B tab list to `src/components/composite/navTabs.ts` (shared by
  both), added `LeftRailNav` (fixed left rail, same 5 routes/icons/labels) and a
  `useMediaQuery` hook (`src/hooks/useMediaQuery.ts`, `useSyncExternalStore`-based, SSR/jsdom
  safe). `TabsLayout` and `PdpLayout` swap `BottomNav` for `LeftRailNav` at `>=900px`;
  `StickyActionBar` drops its bottom-nav-height offset in the same range so it sits flush with
  the viewport bottom instead of floating above an empty gap.
- **Consequences:** No new runtime dependency. Any future `TabsLayout`/`PdpLayout` screen gets
  the rail swap for free; a screen that needs its own bottom-nav-aware spacing should follow
  `StickyActionBar`'s pattern (check `useMediaQuery('(min-width: 900px)')` rather than hardcoding
  `--bottom-nav-height`).

## IDI-024 - PDP gallery/details split (>=768px) and Cart items/summary split (>=1024px)
- **Status:** Accepted
- **Context:** Same Phase 6 tablet pass. On `ProductDetailPage` and `CartPage`, the mobile
  layout stacks content that would otherwise leave a lot of unused horizontal space at tablet
  widths (gallery above details; items above the totals summary).
- **Decision:** Wrapped the gallery+details sections on `ProductDetailPage` in a `.splitRow`
  grid (`grid-template-columns: 1fr 1fr` at `>=768px`, gallery pinned via `position: sticky`),
  and the items list + summary card on `CartPage` in a `.splitRow` grid
  (`grid-template-columns: 2fr 1fr` at `>=1024px`, summary pinned). Both stay single-column
  below their breakpoint - no JSX branching, pure CSS grid reflow of the same markup. The
  bottom `StickyActionBar` checkout CTA is left as-is in both cases (not moved into the sidebar)
  to avoid restructuring a working interaction pattern for a tablet-only width range.
- **Consequences:** Live-verified in-browser at 390 / 768 / 834 / 1024 / 1200px (see
  `RESPONSIVE_MATRIX.md` Phase 6 note). Other screens with similarly "stackable" sections
  (e.g. Order Review, RFQ) could adopt the same `.splitRow` pattern later if a tablet-usability
  gap is found for them - none was flagged this phase.

## IDI-026 - `MODIFICATION FOR THE APP.pdf` implementation (supersedes conflicting Phase 0-13 output)
- **Status:** Accepted
- **Context:** A later modification specification (`MODIFICATION FOR THE APP.pdf`) was delivered
  after the initial 13-phase build and treated as the new highest-priority source of truth (see
  `blueprint/21_DECISIONS.md` D-021). It conflicted with several already-shipped screens: the
  business-profile screen collected `legalName`/RCCM/NIF; `AuthProvider`'s `CompanyProfile`
  modeled the same fields; the hero carousel showed "Nouveau · Programme Sourcing" over Western
  fashion imagery and a 3-item trust strip; `LandedCostPage` and `OrderReviewPage` exposed a full
  freight/insurance/duty/VAT/service-fee breakdown; `ProductDetailPage` advertised a 7-day returns
  window and a `/product/:id/landed-cost` CTA; a full `/returns` feature existed; product/PDP/help
  copy claimed a single maritime-only 28-45 day delivery window; `PaymentPage` exposed four flat
  payment methods (COD, Wave, Orange, bank) with no plan/transport distinction.
- **Decision:** Implemented every requirement from the PDF as a real code change, not a
  recommendation-only pass: `CompanyProfile.name` replaces `legalName`/`registrationNumber`/`taxId`
  (`src/state/AuthProvider.tsx`); a new `src/domain/pricing.ts` is the single customer-facing total
  abstraction (`getProductCustomerTotal`/`getCartCustomerTotal`, internal freight/duty/VAT/service
  math never exported); a new `src/domain/transport.ts` defines `TransportMode`, per-mode timing
  (air 2 weeks-1 month, sea 3-4 months, 10,000 XOF/kg air rate - informational only, never
  multiplied by an invented weight) and `getCommonTransportModes` for multi-product cart
  compatibility; `CatalogProduct.transportModes` is now data-driven per product; `CatalogCategory`
  gained `imageUrl` for the Categories-page photo grid; a new `CheckoutProvider`
  (`src/state/CheckoutProvider.tsx`) holds `{paymentPlan, transportMode, paymentMethod}` shared
  between `PaymentPage` and `OrderConfirmationPage`; `PaymentPage` was rebuilt as a 3-step
  progressive-disclosure flow (plan → transport → Wave/Orange Money/Banque); `LandedCostPage` and
  the entire `/returns` feature (`ReturnsPage`, `src/state/returns.ts`, the Profile nav link, the
  `/product/:id/landed-cost` route) were deleted outright, not just hidden.
- **Consequences:** `screens/12_LANDED_COST.md`, the RCCM/NIF business-profile spec in
  `screens/03_BUSINESS_PROFILE.md`, and any returns-related content in `screens/10_PRODUCT_DETAIL.md`
  are superseded per D-021 - left in place as historical record, not deleted, not authoritative.
  Any future screen work must read the PDF requirements (mirrored in the PR/session description)
  and this entry before re-deriving business rules from the pre-PDF blueprint screens. Onboarding
  and hero imagery still need real photography sourced/commissioned - no image-generation or
  -sourcing tool was available in this session, so the existing asset files remain in place under
  their current registry keys pending replacement (see the session's final report for the exact
  list).

## IDI-027 - `new modification.pdf`: two-choice transport step + dense two-row Home categories
- **Status:** Accepted
- **Context:** The latest change request (`new modification.pdf`, supersedes `MODIFICATION FOR THE APP.pdf` where they conflict - see `blueprint/21_DECISIONS.md` D-022) flagged two issues on the live build: with a sea-only cart, `PaymentPage` step 2 showed a single "Bateau" card, so the customer never saw a choice; and the Home category rail (4 icon chips + "Plus") plus stacked section padding left large gaps between the active-order card, categories and Offres flash.
- **Decision:**
  - `src/domain/transport.ts` gained `getTransportOptions(lines)`, which always returns both modes (Avion, Bateau) with `available` and a customer-facing `reason` naming the blocking product(s). `PaymentPage` renders both as mutually exclusive radio cards; an ineligible mode is `disabled` with the reason wired via `aria-describedby`. No mode is preselected. An incompatible cart shows both disabled plus a `role="alert"` split-order message, and step 3 stays hidden.
  - `HomePage` wraps hero → active order → categories → Offres flash in a `.topStack` sharing one local token, `--home-stack-gap` (16px); those sections use `spacing="none"` and a new `SectionHeader compact` option, so the page-level `--section-gap` no longer stacks with section padding there. Lower Home sections keep the global rhythm.
  - Categories are a curated 8-item (`HOME_CATEGORY_COUNT`) 4×2 photo grid driven by `CatalogCategory.imageUrl`; photos are capped at 96px so tablet tiles don't balloon; "Voir tout" links to `/categories`. `industrial` keeps the documented icon fallback (no matching photo exists).
  - PDP "Livraison rapide" replaced by "Livraison suivie par M&C" (sea freight is 3-4 months, "rapide" was misleading).
- **Consequences:** Verified two rows and no horizontal overflow at 320/360/390/414/600/768/1024px. Tests: `transport.test.ts` (option/reason logic), `PaymentPage.test.tsx` (two choices, exclusivity, disabled-with-reason, air-only, incompatible cart), `HomePage.test.tsx` (2×4 grid, stack order, no section padding in the stack).

## IDI-025 - Route-transition Suspense fallback: `Spinner` primitive instead of `null`
- **Status:** Accepted
- **Context:** Every lazy-loaded route (`withSuspense` in `AppRouter.tsx`) fell back to `null` while its
  chunk loaded, so slower connections would see a blank flash between screens.
- **Decision:** Added `src/components/primitives/Spinner.tsx` (accessible `role="status"`, brand-red
  ring, `prefers-reduced-motion`-aware - static ring instead of spin) and used it as the `withSuspense`
  fallback (`<Spinner fullSection />`, `min-height: 60vh` so it doesn't collapse the layout mid-transition).
- **Consequences:** No new dependency. Reusable for any other async-loading state that needs a spinner.

## IDI-028 - Desktop shell (>=1024px) and spec-compliance pass against Master Spec v1.0
- **Status:** Accepted
- **Context:** On desktop the app read as a phone app: no content container (body lines up to 1714px), a three-row mobile header plus the 84px rail from IDI-023, a 4:3 hero about 960px tall, and single-column flows stretched horizontally. A Drive knowledge-base audit (Master Spec v1.0, 21 Oct 2026) also found customer-visible violations: XOF instead of FCFA and ISO dates (INV-8), "Commande confirmée" before payment verification (spec 4.2 / INV-2), hash-generated ratings shown as reviews (MS-CAT-10), and onboarding forcing /login (spec 2.2 public browsing).
- **Decision:** Three nav modes from shared queries in `useMediaQuery.ts`: bottom bar <900, rail 900-1023 (IDI-023 narrowed), and desktop shell >=1024 (one-row `CommerceHeader` grid plus `DesktopNav` plus `SiteFooter`, content centred at `--content-max` 1280). `DetailLayout` gains `width="narrow"` (760) for 19 routes, renders a 440 card for pre-auth pages, and owns the horizontal gutter for nested pages. Onboarding persists `mc.onboarding.done`, and skip/finish go to /home. FCFA labels and `domain/format.ts` dates. Confirmation wording per spec 4.2. Ratings removed from the PDP and search.
- **Consequences:** Mobile below 900px is unchanged apart from label, date and a11y fixes and the corrected nested-page gutter. Spec-vs-owner conflicts (landed-cost breakdown removed in IDI-026, payment methods, OTP-only auth) were **not** resolved and are logged for an owner decision. Full audit, evidence and test results: `mc knowledge/frontend-modernization-2026/00-MASTER-AUDIT-AND-IMPLEMENTATION.md`.
