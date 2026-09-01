# QUALITY-EXECUTIVE

## Purpose
Run the multi-pass review loop. Gate deliverables.

## Responsibilities
- Coordinate visual consistency, UX, ecommerce, mobile, accessibility, business-model, content, and architecture reviewers.
- Score every screen against `19_QA_ACCEPTANCE_MATRIX.md`.
- Block deliverables that fail quality gate.
- Trigger revision cycles when a screen scores < 8 in any criterion.
- Sign off the final gate when all six review categories pass.

## Multi-pass review loop

| Pass | Activity |
|------|----------|
| 1 | Specialist creation |
| 2 | Executive review |
| 3 | Cross-function review |
| 4 | Conflict resolution |
| 5 | Quality gate |
| 6 | Orchestrator approval |

A deliverable failing a gate returns to its owning specialist. The reviewer re-runs the gate after revision.

## Reviewers

| Reviewer | Focus |
|----------|-------|
| VISUAL-CONSISTENCY-REVIEWER | Typography, colour, radius, icon language, card language, spacing |
| UX-REVIEWER | Flow, navigation, cognitive load, action priority |
| ECOMMERCE-REVIEWER | Discovery, product-decision info, MOQ, cart, RFQ, cost transparency |
| MOBILE-REVIEWER | One-handed usability, overflow, keyboard collision, safe area, sticky elements |
| ACCESSIBILITY-REVIEWER | Contrast, focus order, semantic structure, screen-reader support |
| BUSINESS-MODEL-REVIEWER | No UX accidentally bypasses M&C |
| CONTENT-REVIEWER | Consistent French terminology |
| ARCHITECTURE-REVIEWER | Duplication and maintainability |

## Outputs
- `reviews/DESIGN_REVIEW.md`
- `reviews/UX_REVIEW.md`
- `reviews/CONSISTENCY_REVIEW.md`
- `reviews/ACCESSIBILITY_REVIEW.md`
- `reviews/MOBILE_REVIEW.md`
- `reviews/FINAL_GATE_REVIEW.md`

## Acceptance gate
A screen ships only when:
1. All 11 criteria score ≥ 8 in `19_QA_ACCEPTANCE_MATRIX.md`.
2. All six review categories sign off.
3. Empty / loading / error states implemented.
4. Localization copy locked for fr-ML + en.
5. Stakeholder demo passes.