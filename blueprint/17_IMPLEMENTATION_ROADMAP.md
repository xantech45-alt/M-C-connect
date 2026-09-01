# 17 - Implementation Roadmap

> Phase 0 → 13 plan with explicit acceptance gates.

---

## Phase 0 - Project audit
- **Objective:** confirm tokens, dependencies, design-asset inventory, supported targets.
- **Dependencies:** none.
- **Screens:** none.
- **Components:** none.
- **Risks:** missing assets, ambiguous tokens.
- **Acceptance gate:** `02_SOURCE_AUDIT.md` complete, all decisions in `21_DECISIONS.md` ratified.

## Phase 1 - Design tokens
- **Objective:** codify colour, type, spacing, radius, elevation, icon, image tokens.
- **Dependencies:** Phase 0.
- **Acceptance gate:** tokens reviewed against `05_DESIGN_SYSTEM.md` and `06_LAYOUT_AND_SPACING_SYSTEM.md`.

## Phase 2 - Core primitives
- **Objective:** build Layer 1 primitives.
- **Dependencies:** Phase 1.
- **Acceptance gate:** primitives usable in isolation; visual audit passes.

## Phase 3 - Navigation & application shell
- **Objective:** bottom nav, top app bar, sticky action bar, sheet, modal.
- **Dependencies:** Phase 2.
- **Acceptance gate:** shell renders all 5 tabs; back behaviour correct; safe areas respected.

## Phase 4 - Auth & onboarding
- **Objective:** screens 01, 02, 03.
- **Dependencies:** Phase 3.
- **Acceptance gate:** language picker → OTP → profile flow works end-to-end with mock data.

## Phase 5 - Discovery
- **Objective:** screens 04–09.
- **Dependencies:** Phase 4.
- **Acceptance gate:** home renders, search returns mock results, filters apply, image search screen renders.

## Phase 6 - Product experience
- **Objective:** screens 10–14.
- **Dependencies:** Phase 5.
- **Acceptance gate:** PDP loads, tier pricing table renders, landed cost panel renders, comparison works, RFQ submits to mock.

## Phase 7 - Quote / cart / checkout
- **Objective:** screens 15–19.
- **Dependencies:** Phase 6.
- **Acceptance gate:** cart updates, checkout flow completes to confirmation, RFQ response screen renders.

## Phase 8 - Orders / tracking
- **Objective:** screens 20–22.
- **Dependencies:** Phase 7.
- **Acceptance gate:** order list loads, tracking timeline renders, QC report screen renders.

## Phase 9 - Messages / dashboard / profile
- **Objective:** screens 23, 24, profile/settings/support.
- **Dependencies:** Phase 8.
- **Acceptance gate:** messaging threads load, dashboard renders with mock data, profile settings complete.

## Phase 10 - Responsive hardening
- **Objective:** validate 320 / 360 / 375 / 390 / 414 / 430 / tablet.
- **Dependencies:** Phase 9.
- **Acceptance gate:** QA matrix shows no overflow, no clipping, correct grids, correct gutters.

## Phase 11 - Accessibility hardening
- **Objective:** WCAG 2.1 AA compliance.
- **Dependencies:** Phase 10.
- **Acceptance gate:** screen reader walk-throughs succeed, contrast audit passes, focus order audited, dynamic type scales correctly.

## Phase 12 - Visual QA
- **Objective:** consistency, polish, brand fidelity.
- **Dependencies:** Phase 11.
- **Acceptance gate:** every screen scored ≥ 8 in `19_QA_ACCEPTANCE_MATRIX.md`; reviewers sign off.

## Phase 13 - Integration readiness
- **Objective:** connect to backend contracts; remove mock data; performance tune.
- **Dependencies:** Phase 12.
- **Acceptance gate:** integration test suite passes; Lighthouse ≥ 80; first-meaningful-paint ≤ 2.5 s on mid-range Android.

---

## Risk register

| Risk | Phase | Mitigation |
|------|-------|-----------|
| Bambara copy unavailable | 4 | Fall back to French; mark strings as future-translation. |
| Image-search model not ready | 5 | Build UI; show "Recherche par image bientôt disponible". |
| Payment provider not chosen | 7 | Mock payment screen; integrate later. |
| Real product photography gaps in non-fashion | 5–6 | Use neutral placeholder photography; queue industrial photography capture. |
| Translation regression | 12 | Lock string freeze before this phase. |