# M&C Connect: frontend audit, desktop modernization and implementation

**Date:** 21 Oct 2026 · **Scope:** customer web app at `http://localhost:5173` (Vite + React 18, frontend only, fixtures) · **Status:** implemented and verified; **not committed**.

Companion documents: [01 knowledge mapping](01-KNOWLEDGE-AND-REQUIREMENTS-MAPPING.md) · [02 inventory](02-ROUTE-AND-COMPONENT-INVENTORY.md) · [03 UI and color](03-UI-DESIGN-AND-COLOR.md) · [04 layout](04-LAYOUT-AND-SPACING.md) · [05 responsive](05-RESPONSIVE-BEHAVIOR.md) · [06 workflow](06-WORKFLOW-AND-INTERACTION-AUDIT.md) · [07 plan](07-IMPLEMENTATION-PLAN.md) · [08 changelog](08-IMPLEMENTATION-CHANGELOG.md) · [09 testing](09-TESTING-AND-VALIDATION.md) · [10 unresolved](10-UNRESOLVED-ISSUES.md) · evidence `evidence/before|after/<route>__<width>.png`

## 1. Executive summary

The app looked like a phone app on desktop for five measurable reasons: no content container (body lines up to 1714px wide), mobile chrome at every width (a three-row header and an 84px icon rail), a 4:3 hero that filled the whole first screen, single-column phone flows stretched horizontally, and no desktop page furniture.

These are fixed with a **responsive desktop shell, not a second app**. At 1024px and above there is a one-row header with a section nav and a "Demande sur mesure" button, content centred at 1280 / 760 / 440px, and a footer with the payment-safety notice and a demonstration-data disclosure. Page compositions were added for home, search, products, PDP, profile, auth and onboarding. Below 900px the mobile journey (bottom tab bar, sticky CTAs, mobile type) is unchanged.

The audit also found and fixed spec violations visible to customers:
- XOF instead of FCFA, and ISO dates (INV-8)
- a confirmation page that called an unverified payment "Commande confirmée" (spec 4.2 / INV-2)
- fabricated star ratings (MS-CAT-10)
- an onboarding flow that forced visitors to /login (spec 2.2: public browsing)
- a fake order reference on Home
- five accessibility defects reported by axe, and a 320px overflow

**Results:** 79/79 tests pass, type-check and lint are clean, the build passes, and 322 route × viewport loads show 0 overflow and 0 console errors (baseline: 1 overflow, 3-4 pages with axe errors per width).

Large gaps remain that belong to the owner or the backend: the operator console does not exist, quote, payment-proof and canonical-order-state flows are missing, and two spec-vs-owner conflicts are open (landed-cost breakdown, payment methods).

## 2. Project context

M&C Connect is a managed sourcing service: customers in Mali browse or request products and receive an XOF quote. The operator in China buys, runs QC, consolidates, ships and delivers, and is the single accountable party (suppliers are never exposed). The customer surface is French, mobile-first, and built for Android on 3G.

## 3. Knowledge reviewed

The Master Spec v1.0, Technical Blueprint v1.2 and Project Overview v1.1 were read in full. From the Amazon study, reports 01, 02 and 03 were read in full. The other study folders were indexed and their content taken from the Master Spec consolidation. Local `blueprint/` and `implementation/DECISION_LOG.md` were also read. Details are in [01](01-KNOWLEDGE-AND-REQUIREMENTS-MAPPING.md).

## 4. Existing implementation assessment

- **Stack:** Vite 5, React 18, React Router 6, TypeScript, CSS Modules, lucide-react, swiper, recharts. It is not the Next.js stack in the spec, and no migration was done.
- **Coverage:** 46 customer routes, with mock auth, localStorage cart/favorites/addresses and fixture orders/messages.
- **Missing:** the admin console, public trust pages, a quote screen, and payment-proof upload.
- **Uncommitted owner work** from `new modification.pdf` was in the tree at the start. It was preserved.

## 5. Route inventory

See [02](02-ROUTE-AND-COMPONENT-INVENTORY.md): 46 routes, 5 layouts, and the desktop width assigned to each.

## 6. Verified findings (page by page)

Severity: C critical · H high · M medium · L low. Verification: **A** = automated audit or unit test, **V** = screenshot reviewed. All findings below are **Fixed**.

| ID | Route(s) | Sev | Evidence (before) | Fix | Source refs | Verification (after) |
|---|---|---|---|---|---|---|
| F-01 | all desktop | C | Body lines up to 1714px at 1920 (median 1234 at 1440). Login inputs 1344px | `--content-max/narrow/form`. Centred outlet. `DetailLayout width` | `TabsLayout.module.css`, `PdpLayout.module.css`, `DetailLayout.*`, `tokens.css` | Median 697 (footer). Forms 438-760. **A, V** |
| F-02 | all desktop | H | Three-row mobile header plus 84px icon rail at 1440 (`evidence/before/orders__1440.png`) | Grid-area header, `DesktopNav`, rail limited to 900-1023 | `CommerceHeader.*`, `DesktopNav.*`, `useMediaQuery.ts` | One nav landmark per page at all widths. **A** (unit + audit), **V** |
| F-03 | /home | H | Hero 4:3 = 960px tall at 1280. Products below the fold | Desktop hero 16:5 | `HeroCarousel.module.css` | Hero, Suivi rapide and categories above the fold at 1440. **V** |
| F-04 | /home | M | 4×2 small tiles. Flash offers hidden in a horizontal scroller | Eight-column categories, six-column flash grid | `HomePage.module.css` | **V** |
| F-05 | /product/:id | M | No global header on desktop. Full-bleed phone CTA bar. Sticky row disabled by `overflow-x: hidden` | Global shell. `overflow-x: clip`. Contained right-aligned actions | `PdpLayout.*`, `StickyActionBar.*`, `ProductDetailPage.module.css` | **V** |
| F-06 | /search/results | M | One phone list column at 1440 | Two-column result cards | `SearchResultsPage.module.css` | **V** (1440, 1024) |
| F-07 | auth (7 routes) | H | Full-width forms | 440px centred card | `DetailLayout.module.css` | Paragraph 1344 → 438. **A, V** |
| F-08 | 19 form/reading routes | M | Forms and text at 1280+ | `width="narrow"` (760) | `AppRouter.tsx` | 1308 → 760. **A** |
| F-09 | /profile | M | 1280px-wide CTA and rows | Sticky summary column plus menus column | `ProfilePage.*` | **V** |
| F-10 | all desktop | M | No footer, legal or safety notice. No demo disclosure | `SiteFooter` | `SiteFooter.*` | Unit test asserts the disclosure. **A** |
| F-11 | /, /onboarding | H | Mandatory every visit. Skip → /login, which blocked public discovery (spec 2.2) | Skip/finish → /home. `mc.onboarding.done`. `/` redirect. Sign-in link | `OnboardingPage.tsx` | 3 unit tests. **A** |
| F-12 | / desktop | M | Phone column. 1344px button | Two-column 1040px panel | `OnboardingPage.module.css` | **V** |
| F-13 | / | L | `role="tab"` without tabpanel or aria-controls; all dots tabbable | tabpanel, aria-controls, roving tabindex | `OnboardingPage.tsx` | Unit test asserts the tabpanel. **A** |
| F-14 | /orders, /orders/:id/qc | M | axe: contrast 3.46:1 on status pills | `--warning #8f5500` | `tokens.css` | axe 0. **A** |
| F-15 | /profile-setup | H | axe: six inputs without labels | `htmlFor`/`id` plus autocomplete | `BusinessProfilePage.tsx` | axe 0. **A** |
| F-16 | /orders/:id/qc | L | axe: `aria-label` on a div without a role | `role="img"` | `QualityControlPage.tsx` | axe 0. **A** |
| F-17 | /products | L | axe: heading order h1 → h3 | Hidden h2 | `AllProductsPage.tsx` | axe 0. **A** |
| F-18 | /verify-code @320 | M | Overflow 328 > 320 | Fluid gap | `VerifyCodePage.module.css` | 0 overflow. **A** |
| F-19 | all prices | M | "XOF" (INV-8 requires "125 000 FCFA") | FCFA labels | 20 files (see 08) | Unit test on `formatXof`. **A** |
| F-20 | /orders, /orders/:id | M | "ETA 2026-09-22" | `formatDateFr` | `format.ts`, order pages | Unit tests. **A** |
| F-21 | /home | M | Suivi rapide "CMD-2024-0142" (not a real order) linked to the list | Real fixture order plus deep link | `HomePage.tsx` | Unit test. **A** |
| F-22 | /home | M | English trust strip ("M&C Quality Control") | French labels | `HomePage.tsx` | Unit test. **A** |
| F-23 | tablet | L | 414px gutter rule overrode 600px (cascade), masked by a duplicate | Bounded rule. Duplicate removed | `tokens.css`, `globals.css` | Gutter 24 at 768 (computed). **A** |
| F-24 | 18 nested routes | M | Double gutter (32px phone / 64px desktop), misaligned with the back button | Layout owns the gutter | `DetailLayout.module.css` | Content at x = gutter (16px @390). **A** (JS measure) |
| F-25 | /product/:id, /search/results | H | Hash-generated ratings shown as real reviews | Removed from the customer UI | PDP, SearchResults | **V** |
| F-26 | /checkout/confirmation | H | "Commande confirmée" plus fake ref, while payment is unverified | Spec 4.2 wording | `OrderConfirmationPage.tsx` | Unit test. **A** |

## 7. Desktop UX problems

F-01 to F-10, F-12 and F-24. Root-cause analysis is in [04](04-LAYOUT-AND-SPACING.md).

## 8. Mobile and tablet problems

Mobile was largely sound. Fixed: the 320px OTP overflow (F-18), the double gutter on nested pages (F-24), and the tablet gutter cascade bug (F-23). Not changed: a mobile demonstration notice is missing (U-16).

## 9. Visual design findings

The brand red and neutrals are preserved. Tokens were added for content widths and the header height, and the warning contrast was fixed. There is no dark mode, and none was added. See [03](03-UI-DESIGN-AND-COLOR.md).

## 10. Workflow inconsistencies

F-11, F-21, F-25 and F-26 are fixed. Open items are U-01 to U-07 and U-14 to U-18: quote acceptance, payment instructions and proof, canonical states and tabs, OTP auth, landed-cost breakdown, and payment methods. Supplier confidentiality passes on the client side. See [06](06-WORKFLOW-AND-INTERACTION-AUDIT.md).

## 11. Accessibility and performance

All five axe-detected issues are fixed, and axe reports 0 across 322 loads. The carousel ARIA is corrected. No manual screen-reader or Slow-3G Lighthouse run was done. Bundle shape is unchanged, no runtime dependency was added, and desktop-only components are not rendered on mobile.

## 12. Prioritised fixes

See [07](07-IMPLEMENTATION-PLAN.md). P0 shell → P1 pages and spec compliance → P2 a11y are complete. P3 is deferred.

## 13. Implementation details

- **Breakpoints:** `<900` bottom nav · `900-1023` rail · `≥1024` desktop shell (constants in `useMediaQuery.ts`).
- **Header:** one component whose CSS grid areas reflow it between three rows (mobile) and one row (desktop). It measures itself into `--commerce-header-h`, so nested sticky rows never slide under it.
- **Layouts:** page widths are set per route in the router (`width="narrow"`) rather than per page. The pre-auth card and the gutter ownership are handled in `DetailLayout`.
- **Behaviour changes:** onboarding persistence uses localStorage behind `try/catch` (private mode just shows onboarding again). French formatting is centralised in `domain/format.ts`.

## 14. Exact files modified

See [08](08-IMPLEMENTATION-CHANGELOG.md): 7 new files (including 2 tests) and about 45 modified source files. Run `git status` for the authoritative list; the uncommitted owner work is listed separately there.

## 15. Before / after evidence

`evidence/before/` and `evidence/after/` hold 322 PNGs each plus `results.json`. Key pairs:
- `orders__1440.png` (rail + 3-row header → desktop nav)
- `home__1440.png` (poster hero → banner)
- `login__1440.png` (1344px form → card)
- `root__1440.png` (phone onboarding → two-column)
- `search_results_q_chaussure__1440.png` (list → two-column cards)
- `verify-code__320.png` (overflow → none)

## 16. Validation outcomes

| Check | Result |
|---|---|
| Type-check | Passed |
| Lint | Passed |
| Tests | 79/79 passed |
| Build | Passed |
| Viewport audit | 322/322 with no overflow and no console errors |

Full matrix, including what was **Not tested** and **Blocked**, is in [09](09-TESTING-AND-VALIDATION.md).

## 17. Remaining issues

20 items in [10](10-UNRESOLVED-ISSUES.md). The highest are:
- U-01 and U-02: owner decisions on the landed-cost breakdown and payment methods
- U-03 and U-04: quote screen, canonical states, and payment proof (with backend)
- U-08: operator console not built

## 18. Final recommendations and readiness

1. **Owner:** decide U-01, U-02 and U-05. The Master Spec (21 Oct) and the September change requests disagree on pricing transparency, payment rails and auth.
2. **Next frontend work:**
   - customer quote screen (`devis/[id]`)
   - payment instructions plus proof upload
   - align `OrderStage` with spec 4.2 and the six Commandes tabs
   - desktop filter sidebar
3. **Operator console:** treat it as its own phase. It is desktop-first, and the shell tokens built here apply.
4. **Readiness:**
   - The **customer frontend is in good shape to continue against a real API.** Layouts are responsive and token-driven, there are no layout regressions across 7 widths, and tests and lint are green.
   - It is **not production-ready as a system.** There is no backend and no real authentication or authorization. Payments, orders and messages are fixtures, there is no admin console, and supplier confidentiality is enforced only by what the client chooses to render.
