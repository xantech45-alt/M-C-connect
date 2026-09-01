# Master Execution Plan

> The exact sequence, dependency graph, and acceptance gate for every phase.

---

## 1. Phase sequence (mirrors `blueprint/17_IMPLEMENTATION_ROADMAP.md`)

```
00  PROJECT AUDIT                ← audit complete; exit APPROVED
01  FOUNDATION                   ← bootstrap Vite + React + TS, scripts, lint
02  DESIGN SYSTEM                ← tokens, globals.css, typography, theme
03  APP SHELL                    ← router, layout, bottom nav, top app bar, safe areas
04  ACCESS                       ← screens 01–03 (onboarding, login, business profile)
05  DISCOVERY                    ← screens 04–09 (home, categories, search, filters, image)
06  PRODUCT DECISION             ← screens 10–14 (PDP, specs, landed cost, compare, RFQ)
07  COMMERCE                     ← screens 15–19 (cart, review, payment, confirm, quote)
08  FULFILLMENT                  ← screens 20–22 (orders, tracking, QC)
09  RELATIONSHIP                 ← screens 23–24 (messages, dashboard) + profile/settings
10  TABLET                       ← tablet adaptation (no desktop)
11  ACCESSIBILITY                ← WCAG 2.1 AA pass
12  PERFORMANCE                  ← Core Web Vitals, bundle, image lazy-loading
13  FINAL QA                     ← all reviews signed off
```

---

## 2. Dependency graph (textual)

```
00 ─▶ 01 ─▶ 02 ─▶ 03 ─▶ 04 ─▶ 05 ─▶ 06 ─▶ 07 ─▶ 08 ─▶ 09
                                              │
                                              ▼
                                             10 ─▶ 11 ─▶ 12 ─▶ 13
```

Each phase blocks the next. No skipping. No parallel shortcuts that violate the layer rule
(Feature N may depend on Composite N-1 and below; never upward).

---

## 3. Per-phase exit gate (template)

A phase is **APPROVED** only when:

1. Code complete against its `phases/PHASE_NN_*.md` checklist.
2. TypeScript checks pass (`tsc --noEmit`).
3. Lint passes (`npm run lint`).
4. Build succeeds (`npm run build`).
5. Dev server starts and renders the new screens.
6. No console errors.
7. Manual visual review at 320 / 360 / 390 / 414 / tablet widths.
8. The matching review document under `reviews/` is updated.
9. No BLOCKER or CRITICAL bug in `BUG_REGISTER.md` remains open for that phase.
10. Any unplanned work recorded in `DEVIATION_REGISTER.md`.

---

## 4. Quality scorecard (1–10) - applied per phase

| Criterion | Threshold |
|-----------|-----------|
| Blueprint accuracy | ≥ 8 |
| Visual fidelity (matches mobile reference + PPT) | ≥ 8 |
| React architecture (layer rules, no leaks) | ≥ 8 |
| Code quality (no duplication, no `any`, no `eslint-disable`) | ≥ 8 |
| Component reuse (canonical components only) | ≥ 8 |
| Mobile usability (thumb zone, sticky rules) | ≥ 8 |
| Tablet usability (graceful growth) | ≥ 8 |
| Accessibility (44dp, contrast, focus, ARIA) | ≥ 8 |
| Performance (no jank, no heavy lists, lazy images) | ≥ 8 |
| Localization (fr-ML primary, no mixed locales) | ≥ 8 |
| Business-model fidelity (no supplier contact) | ≥ 8 |

Any score < 8 returns the phase to its owning specialist for revision.

---

## 5. Risk register (carried from spec)

| Risk | Phase | Mitigation |
|------|-------|-----------|
| Bambara copy unavailable | 04 | Fall back to French; mark strings future-translation |
| Image-search model not ready | 05 | UI renders; mock returns empty set with friendly empty state |
| Payment provider not chosen | 07 | Mock payment option with M&C branding; visual only |
| Industrial photography gap | 05–06 | Neutral placeholder; queue industrial capture |
| Translation regression | 12 | String freeze before visual QA |

---

## 6. Definition of done (entire project)

A feature ships only when:

- All 24 screens implemented and visually reviewed.
- Bottom-nav hide rule enforced on every sticky-CTA screen.
- One primary red CTA per screen.
- Status never colour-only.
- All 4 state matrices (UI, form, order, data) applied.
- All 5 status-matrix overlays working in tracking and QC.
- Responsive matrix shows PASS at 320 / 360 / 390 / 414 / 600 / 768 / 1024.
- Lighthouse Performance ≥ 80 on mobile.
- No BLOCKER or CRITICAL bug open.
- All 8 review documents under `implementation/reviews/` signed off.
- Final blueprint compliance review passes.
