# 09 · Testing and validation

All results below come from commands actually run on 21 Oct 2026 against `http://localhost:5173` (Vite dev server) and the repo's own tooling.

## 1. Project checks

| Check | Command | Result |
|---|---|---|
| Type-check | `npx tsc -b` | **Passed** (0 errors) |
| Lint | `npx eslint . --max-warnings=0` | **Passed** (0 warnings) |
| Unit/component tests | `npx vitest run` | **Passed**: 40 files, **79 tests** (baseline 38 files / 67 tests). +12 new tests (below) |
| Production build | `npm run build` | **Passed** (built in 12.7 s). Chunk sizes unchanged in shape: largest is `charts` 411 kB / 111 kB gzip, from the existing recharts dependency on `/dashboard` |

New tests: `domain/format.test.ts` (4), `layouts/TabsLayout.test.tsx` (2: phone vs desktop shell), `OnboardingPage.test.tsx` (+3: skip → /home and persist; returning visitor redirect; /onboarding replay), `HomePage.test.tsx` (+2: real Suivi rapide order and link; French trust strip), `OrderConfirmationPage.test.tsx` (+1: never "Commande confirmée" before verification).

## 2. Viewport × route audit (Playwright 1.56, Chromium, scripted)

The script is in the session scratchpad and not committed. 46 routes × 7 widths = **322 page loads**. At widths below 768px it emulates touch and mobile. For each load it measured horizontal overflow (`scrollWidth > clientWidth`), offending elements, console errors (including the dev-only **axe-core** reports), the widest `<p>` inside `<main>`, and page height, then saved a screenshot.

| Width | Routes | Horizontal overflow (before → after) | Pages with console a11y/runtime errors (before → after) | Median widest paragraph px (before → after) |
|---|---|---|---|---|
| 1920 | 46 | 0 → 0 | 3 → **0** | 1714 → **697** |
| 1440 | 46 | 0 → 0 | 3 → **0** | 1234 → **697** |
| 1280 | 46 | 0 → 0 | 4 → **0** | 1074 → **697** |
| 1024 | 46 | 0 → 0 | 4 → **0** | 818 → **697** |
| 768 | 46 | 0 → 0 | 3 → **0** | 646 → 672 |
| 390 | 46 | 0 → 0 | 3 → **0** | 320 → 332 |
| 320 | 46 | **1 → 0** | 3 → **0** | 272 → 272 |

The after run used a shorter settle wait. To rule out axe simply not having reported yet, the 10 previously failing or key routes were re-run at 1440, 390 and 320px with `networkidle` plus a 3 s wait: **0 overflow and 0 console errors on all 30 loads.**

**Reading the paragraph metric:** 697px is the footer tagline (44ch), which is now the widest paragraph on most desktop pages. Desktop body text previously ran to 1234-1714px lines. Pages still at about 1250-1280px (`/home`, `/categories`, `/messages`, `/dashboard`, `/coupons`, `/reviews`, `/orders/:id/qc`, `/image-search`) contain one-line notes or banners spanning the content width, not body copy. Page heights on desktop grew by about 380px because of the new footer.

**Per-route 1440px detail** (widest paragraph, before → after): `/login`, `/register` and `/verify-code` went from 1344 to 438 (card). `/rfq/new`, `/checkout/review` and `/checkout/payment` went from 1308 to 760. `/orders/MC-000123` went from 1260 to 712. `/help`, `/addresses` and `/contact` went from about 1240 to about 740. The full table is in `evidence/after/results.json` and `evidence/before/results.json`.

Evidence: `evidence/before/*.png` and `evidence/after/*.png` (`<route>__<width>.png`, 322 each).

## 3. Verification checklist (brief §11)

| Check | Result | How |
|---|---|---|
| No broken routes | **Passed** | 46/46 routes loaded with an h1 at all 7 widths. The 404 renders for unknown paths |
| No unintended horizontal scrolling | **Passed** | 0/322 after (was 1/322: `/verify-code` at 320) |
| No inaccessible navigation controls | **Passed** | Exactly one `nav[aria-label="Navigation principale"]` per page at every width (unit test plus audit). `aria-current` on the active item |
| No misplaced cards / cut-off text | **Passed (visual sample)** | Screenshots reviewed for home, orders, PDP, search, cart, profile, messages, login and onboarding at 1440. Home, cart and settings at 390. Search at 1024. Not every one of the 644 screenshots was opened by eye |
| No overlapping modals | **Not tested** | The app has no modal dialogs (confirmations use `window.confirm`, IDI-017). The search suggestion panel was not exercised |
| No inaccessible form controls | **Passed** for axe-detected issues | `/profile-setup` labels fixed. axe reports 0. A manual screen-reader pass was **not** done |
| No incorrect customer-facing language | **Partially passed** | FCFA, French dates and the French trust strip are fixed. English slogan and onboarding image text remain (U-12) |
| No unintended supplier disclosure | **Passed (client)** | Code search (see 06). Server-side enforcement is **not testable** without a backend |
| No unexplained workflow changes | **Passed** | The only workflow-visible changes are onboarding → /home (spec 2.2), the confirmation wording (spec 4.2) and removed fake ratings (MS-CAT-10), each logged with its source |
| No visual regressions on mobile | **Passed (sample)** | 390px home, cart and settings. The bottom nav, hero and grids are unchanged. Nested pages now sit on the 16px gutter instead of 32px (intended fix) |
| No new build/runtime errors | **Passed** | Build, tests, and 0 console errors across 322 loads |
| Keyboard: onboarding carousel | **Passed (unit plus code)** | Arrow keys, roving tabindex on tabs, `aria-controls` → tabpanel |
| Reduced motion | **Unchanged** | The global `prefers-reduced-motion` rule exists. No new animation was added |
| Slow 3G / LCP budget | **Not tested** | No throttled Lighthouse run this session. No assets were added and desktop-only components are not rendered on mobile |
| Admin role flows | **Blocked** | No admin routes exist (U-08) |
