# Bug Register

> Append-only. Every defect surfaced during implementation.

---

## Format

```
## B-NNN - <short title>
- **Date:** YYYY-MM-DD
- **Screen:** route
- **Viewport:** width / device
- **Severity:** BLOCKER | CRITICAL | MAJOR | MINOR
- **Description:** …
- **Expected:** …
- **Actual:** …
- **Owner:** …
- **Status:** OPEN | IN_PROGRESS | FIXED | WONTFIX
- **Retest:** …
```

## Log

## B-001 - Dead link `/business-profile` (should be `/profile-setup`)
- **Date:** 2026-08-31
- **Screen:** `/profile`
- **Viewport:** all
- **Severity:** MAJOR
- **Description:** `ProfilePage.tsx` had 4 occurrences (1 `navigate()`, 3 `NavRow to=`) pointing at `/business-profile`, which has no matching route; all fell through to `NotFoundPage`.
- **Expected:** Navigate to the business-profile form, registered at `/profile-setup`.
- **Actual:** 404.
- **Owner:** Phase 0
- **Status:** FIXED
- **Retest:** Verified route exists in `AppRouter.tsx`; `tsc -b` and `npm run build` pass.

## B-002 - Dead link `/request-quote` (should be `/rfq/new`)
- **Date:** 2026-08-31
- **Screen:** `/search/results` (empty state)
- **Viewport:** all
- **Severity:** MAJOR
- **Description:** `SearchResultsPage.tsx` linked to `/request-quote`, which has no matching route.
- **Expected:** Navigate to the RFQ form, registered at `/rfq/new`.
- **Actual:** 404.
- **Owner:** Phase 0
- **Status:** FIXED
- **Retest:** Verified against `AppRouter.tsx`.

## B-003 - Dead link `/landed-cost/:id` (should be `/product/:id/landed-cost`)
- **Date:** 2026-08-31
- **Screen:** `/product/:id`
- **Viewport:** all
- **Severity:** MAJOR
- **Description:** `ProductDetailPage.tsx` linked to `/landed-cost/${product.id}`, which has no matching route.
- **Expected:** Navigate to `/product/:id/landed-cost`.
- **Actual:** 404.
- **Owner:** Phase 0
- **Status:** FIXED
- **Retest:** Verified against `AppRouter.tsx`.

## B-004 - Dead link `/quality-control/:id` (should be `/orders/:id/qc`)
- **Date:** 2026-08-31
- **Screen:** `/orders/:id`
- **Viewport:** all
- **Severity:** MAJOR
- **Description:** `OrderTrackingPage.tsx` linked to `/quality-control/${order.id}`, which has no matching route.
- **Expected:** Navigate to `/orders/:id/qc`.
- **Actual:** 404.
- **Owner:** Phase 0
- **Status:** FIXED
- **Retest:** Verified against `AppRouter.tsx`.

## B-005 - Dead link `/messages/:id` (thread view does not exist yet)
- **Date:** 2026-08-31
- **Screen:** `/messages`
- **Viewport:** all
- **Severity:** MAJOR
- **Description:** `MessagesPage.tsx` links each conversation row to `/messages/${c.id}`; no route or page exists for this yet.
- **Expected:** Navigate to a per-conversation thread view.
- **Actual:** 404.
- **Owner:** Phase 2 (Commerce and messaging gaps - `MessageThreadPage`)
- **Status:** OPEN - intentionally deferred, not a Phase 0 fix per the execution plan.
- **Retest:** N/A until Phase 2.

## B-006 - `tsc -b` deprecation warning on `baseUrl`
- **Date:** 2026-08-31
- **Screen:** N/A (build tooling)
- **Viewport:** N/A
- **Severity:** MINOR
- **Description:** `tsconfig.json` set `baseUrl: "."`, deprecated as of TypeScript 6.0.
- **Expected:** `npm run typecheck` exits 0 with no warnings.
- **Actual:** Deprecation warning on every run.
- **Owner:** Phase 0
- **Status:** FIXED - see IDI-012 in `DECISION_LOG.md`.
- **Retest:** `npx tsc -b --force` run clean, zero output.

## B-007 - `npm run lint` failed outright under ESLint 9
- **Date:** 2026-08-31
- **Screen:** N/A (build tooling)
- **Viewport:** N/A
- **Severity:** BLOCKER
- **Description:** `package.json` pins `eslint@^9`, which requires flat config (`eslint.config.js`) by default; only a legacy `.eslintrc.cjs` existed, so `npm run lint` exited with a hard "couldn't find eslint.config.js" error rather than a rule violation. This means the `npm run lint` quality gate had never actually passed under the installed toolchain.
- **Expected:** `npm run lint` runs and exits 0 at `--max-warnings=0`.
- **Actual:** Immediate crash, 0 rules evaluated.
- **Owner:** Phase 0
- **Status:** FIXED - see IDI-013 in `DECISION_LOG.md`.
- **Retest:** `npm run lint` exits 0.

## B-008 - `npm test` failed outright, zero test files in repo
- **Date:** 2026-08-31
- **Screen:** N/A (build tooling)
- **Viewport:** N/A
- **Severity:** BLOCKER
- **Description:** Vitest/Testing Library were configured but no `*.test.tsx` files existed anywhere in `src/`, so `vitest run` exited 1 ("No test files found").
- **Expected:** `npm test` exits 0.
- **Actual:** Hard failure, 0 tests run.
- **Owner:** Phase 0 (baseline); full per-page coverage is Phases 2–4 and 7
- **Status:** FIXED (baseline) - see IDI-014 in `DECISION_LOG.md`.
- **Retest:** `npm test` exits 0, 1 file / 2 tests passing.

## B-009 - Nested interactive elements: `<Link>` wrapping `<Button>` (invalid HTML + broken keyboard/screen-reader semantics)
- **Date:** 2026-08-31
- **Screen:** `/orders/:id` (OrderTrackingPage), `/search/results` (SearchResultsPage)
- **Viewport:** all
- **Severity:** MAJOR
- **Description:** Both pages wrapped a `<Button>` (renders `<button>`) inside a react-router `<Link>` (renders `<a>`), producing `<a><button>...</button></a>` - invalid HTML5 (interactive content nested inside interactive content) and unreliable keyboard/screen-reader activation. Found via a repo-wide grep for the pattern while fixing the same bug I introduced in two of my own new Phase 3 files (`ProfilePage`, `HelpPage`) before catching and fixing those in-place.
- **Expected:** A single interactive element per control; navigation-only buttons use `useNavigate()` + `onClick` instead of nesting.
- **Actual:** Nested `<a>`/`<button>`.
- **Owner:** Phase 3 (found opportunistically while working in this exact code pattern; pre-dated Phase 3, not introduced by it)
- **Status:** FIXED
- **Retest:** `npm run typecheck`, `npm run lint`, `npm test`, `npm run build` all pass after the fix.

## B-010 - SearchResultsPage's filter icon button did nothing (dead control) + mislabeled
- **Date:** 2026-08-31
- **Screen:** `/search/results`
- **Viewport:** all
- **Severity:** MAJOR
- **Description:** The `SlidersHorizontal` icon button in the results header had no `onClick` at all, and its `aria-label` read "Ouviller les filtres" (typo - not a French word). Clicking it was a complete no-op. Pre-dated Phase 4, surfaced while wiring the new `/filters` screen to this button.
- **Expected:** Opens `/filters` carrying the current query string so filters can be applied and returned.
- **Actual:** Nothing happened on click; mislabeled for assistive tech.
- **Owner:** Phase 4
- **Status:** FIXED - now navigates to `/filters` with `state: { returnTo: '/search/results', search: params.toString() }`; label corrected to "Ouvrir les filtres".
- **Retest:** Manually verified in-browser: opens the sheet, applying filters returns to results with the query string updated and results actually narrowed.

## B-011 - Own bug: `AllProductsPage` ignored the `cat`/`verified`/price/MOQ params `/filters` sends back
- **Date:** 2026-08-31
- **Screen:** `/products`
- **Viewport:** all
- **Severity:** MAJOR
- **Description:** Introduced in this phase. `AllProductsPage`'s category and sort state were seeded only from local defaults (`cat` never read `params.get('cat')` at all); `verified`/price/MOQ params were never read or applied. Selecting "Électronique" + "Vérifié M&C" in the filter sheet and hitting "Appliquer" landed back on `/products` with the URL correctly updated but the grid still showing all 25 unfiltered products.
- **Expected:** Landing with `?cat=electronics&verified=1` filters the grid to matching, verified Electronics products.
- **Actual:** No filtering applied; category chip row didn't reflect the incoming selection either.
- **Owner:** Phase 4 (caught via live browser verification, not caught by the render-test suite since it only asserts heading/CTA presence, not query-param behavior)
- **Status:** FIXED - `cat`/`verified`/`priceMin`/`priceMax`/`moqMin`/`moqMax` now seed state / apply directly, mirroring `SearchResultsPage`'s existing pattern.
- **Retest:** Manually verified in-browser: `/products?cat=electronics&verified=1` now shows exactly the 1 matching verified product with "Électronique" highlighted in the chip row.

## B-012 - Own bug: invalid `aria-label` on bare `<span>` (no role) - axe "serious" violation, app-wide
- **Date:** 2026-08-31
- **Screen:** Every screen using `Brand` or a verified-badge `ProductCard` (pre-existing, app-wide); `NotificationsPage` (new, Phase 4)
- **Viewport:** all
- **Severity:** MAJOR
- **Description:** `aria-label` on a `<span>` with no ARIA `role` is dropped by assistive tech (a `<span>` has no implicit role, so the attribute has nothing to attach to) - flagged by the app's own dev-mode `@axe-core/react` integration as a "serious" `aria-prohibited-attr` violation. Found in `Brand.tsx` (pre-existing, renders on literally every screen with a header) and `ProductCard.tsx`'s verified badge (pre-existing, renders on most product cards), plus a new unread-dot indicator I added in `NotificationsPage.tsx`.
- **Expected:** Zero axe violations in dev console (per §7 Accessibility / Definition of Done).
- **Actual:** 2+ "serious" axe violations logged on every page rendering `Brand` or a verified `ProductCard`.
- **Owner:** Phase 4 (found via live browser console check while verifying `/notifications`; two of the three instances pre-dated Phase 4)
- **Status:** FIXED - added `role="img"` to all three spans (the established pattern already used correctly in `ReviewsPage`'s star rating).
- **Retest:** Reloaded `/notifications`, `/products`, `/home` with dev-mode axe active - zero "New axe issues" logged on any of them (previously 2 serious + 1 moderate on `/notifications` alone).

## B-013 - Own bug: `NotificationsPage`'s section landmark collided with the global Toast region, both labeled "Notifications"
- **Date:** 2026-08-31
- **Screen:** `/notifications`
- **Viewport:** all
- **Severity:** MINOR
- **Description:** `<Section ariaLabel="Notifications">` (the page's own list region) and `ToastProvider`'s always-mounted `<div role="region" aria-live="polite" aria-label="Notifications">` (pre-existing, global) produced two same-named landmarks on the same page - an axe "moderate" `landmark-unique` violation.
- **Expected:** Every landmark has a name that's unique among landmarks of the same role.
- **Actual:** Both named "Notifications", ambiguous to screen-reader landmark navigation.
- **Owner:** Phase 4
- **Status:** FIXED - renamed the page's section to "Liste des notifications".
- **Retest:** Confirmed via dev-mode axe - no landmark-unique violation on reload.

## B-014 - `catalog.ts` assigned marketing/editorial images as product photos for the 6 unphotographed products (Gate C violation)
- **Date:** 2026-08-31
- **Screen:** Anywhere `p-001`…`p-006` render (Home, all-products, search, PDP)
- **Viewport:** all
- **Severity:** CRITICAL (business-model / trust rule, not just cosmetic)
- **Description:** A concurrent session (`mc-project-b5`, working the same project directory in parallel) set `imageUrl` on `p-001` (Téléviseur) → `editorial-1`, `p-002` (Réfrigérateur) → `editorial-2`, `p-003` (Smartphone) → `editorial-3`, `p-004` (Moulin à grain) → `editorial-4`, `p-005` (Pneus auto) → `category-strip-electronics-1`, `p-006` (Ligne d'emballage) → `category-strip-electronics-2`. These are blog/banner marketing images (people/lifestyle editorial shots, wide category-strip banners) with no relation to the actual products - exactly the "don't label `watch-3.jpg` as a refrigerator" fabrication Gate C (`implementation/DECISION_LOG.md` IDI-010) forbids. Caught via the harness's concurrent-file-change notice, not by any test (the uniqueness test only checks for *duplicate* keys across product slots, not for *mismatched* ones - a real gap, noted below).
- **Expected:** Products with no real photography keep `imageUrl` unset and render the Lucide icon fallback.
- **Actual:** Six products showed unrelated marketing imagery as if it were product photography.
- **Owner:** Phase 5 (introduced by the peer session, not by this session's own Phase 0–4 work)
- **Status:** FIXED - removed the six `imageUrl` lines; confirmed by user before fixing. Left every other peer-session change (`HeroCarousel`, "Voir plus" grid pagination) untouched.
- **Retest:** `npm run typecheck` passes; `grep` confirms no `editorial-`/`category-strip-` reference remains in `catalog.ts`.
- **Follow-up (not fixed here):** `src/assets/registry.test.ts` only catches *duplicate* asset keys across product slots - it would not have caught this *mismatched* assignment, since `editorial-1`/`category-strip-electronics-1` weren't used anywhere else. A stronger test would need a category→asset-pool allowlist to catch "real photo, wrong subject" mistakes; out of scope to add unprompted mid-Phase-5.
