# M&C Connect - Frontend Blueprint

> **Planning-only deliverable.** No React source, JSX, TSX, CSS, or backend is produced by this blueprint. It is an implementation-ready specification that a future React engineering team can follow.

---

## What is this?

This `/blueprint` directory is the **complete frontend architecture** for **M&C Connect Enterprise** - a managed B2B sourcing and import platform connecting Malian businesses with Chinese manufacturing capabilities.

The customer never negotiates with Chinese suppliers directly. M&C Connect handles every commercial step from sourcing to delivery. The frontend must communicate **trust, control, transparency, professionalism, simplicity, import expertise, and business reliability.**

---

## Document Index

| # | File | Purpose |
|---|------|---------|
| 00 | `00_MASTER_FRONTEND_BLUEPRINT.md` | Single-page executive overview of the entire frontend |
| 01 | `01_PRODUCT_SCOPE.md` | Product scope, business boundaries, what is in/out |
| 02 | `02_SOURCE_AUDIT.md` | Inventory of every supplied source asset and reference |
| 03 | `03_INFORMATION_ARCHITECTURE.md` | IA - modules, sections, content grouping |
| 04 | `04_NAVIGATION_ARCHITECTURE.md` | Global navigation, stacks, deep links, bottom nav rules |
| 05 | `05_DESIGN_SYSTEM.md` | Tokens (color, type, radius, elevation, icon, image) |
| 06 | `06_LAYOUT_AND_SPACING_SYSTEM.md` | Gutter, section gap, sticky rules, safe areas |
| 07 | `07_COMPONENT_ARCHITECTURE.md` | Primitive → UI → Composite → Feature component layers |
| 08 | `08_FRONTEND_STATE_ARCHITECTURE.md` | UI state, form state, server-derived, ephemeral |
| 09 | `09_ASSET_AND_IMAGE_STRATEGY.md` | Photography rules, ratios, empty-state imagery |
| 10 | `10_LOCALIZATION_STRATEGY.md` | French (Mali), English, Bambara, XOF, dates, plurals |
| 11 | `11_ACCESSIBILITY_PLAN.md` | Contrast, targets, focus, screen reader, motion |
| 12 | `12_RESPONSIVE_ARCHITECTURE.md` | 320–430 + tablet; wrap, stack, scroll, sticky behavior |
| 13 | `13_INTERACTION_MODEL.md` | Primary vs secondary actions, destructive safeguards |
| 14 | `14_EMPTY_LOADING_ERROR_STATES.md` | Universal state matrix |
| 15 | `15_FRONTEND_SECURITY_BOUNDARIES.md` | What must never be exposed (supplier contact, etc.) |
| 16 | `16_ANALYTICS_UI_PLAN.md` | Screen 24 dashboard design plan |
| 17 | `17_IMPLEMENTATION_ROADMAP.md` | Phase 0 → 13 plan with acceptance gates |
| 18 | `18_FRONTEND_TODO_MASTER.md` | Aggregated checklist of every screen task |
| 19 | `19_QA_ACCEPTANCE_MATRIX.md` | Quality scorecard per screen |
| 20 | `20_TRACEABILITY_MATRIX.md` | Requirement → flow → screen → component → state → AC |
| 21 | `21_DECISIONS.md` | Living ADR log of architectural decisions |

### Agents
- `agents/ORCHESTRATOR.md`
- `agents/EXECUTIVE_PLANNER.md`
- `agents/DESIGN_EXECUTIVE.md`
- `agents/UX_EXECUTIVE.md`
- `agents/SCREEN_EXECUTIVE.md`
- `agents/COMPONENT_EXECUTIVE.md`
- `agents/RESPONSIVE_EXECUTIVE.md`
- `agents/QUALITY_EXECUTIVE.md`
- `agents/AGENT_REGISTRY.md`

### Screens (24)
`01_ONBOARDING_LANGUAGE.md` … `24_BUSINESS_DASHBOARD.md`

### Flows (10)
`AUTHENTICATION_FLOW.md`, `DISCOVERY_FLOW.md`, `SEARCH_FLOW.md`, `IMAGE_SEARCH_FLOW.md`, `PRODUCT_DECISION_FLOW.md`, `RFQ_FLOW.md`, `CART_CHECKOUT_FLOW.md`, `ORDER_TRACKING_FLOW.md`, `QUALITY_CONTROL_FLOW.md`, `CUSTOMER_SUPPORT_FLOW.md`

### Components
`COMPONENT_INVENTORY.md`, `COMPONENT_HIERARCHY.md`, `COMPONENT_VARIANTS.md`, `COMPONENT_REUSE_MATRIX.md`

### States
`UI_STATE_MATRIX.md`, `FORM_STATE_MATRIX.md`, `ORDER_STATUS_MATRIX.md`, `DATA_STATE_MATRIX.md`

### Reviews
`DESIGN_REVIEW.md`, `UX_REVIEW.md`, `CONSISTENCY_REVIEW.md`, `ACCESSIBILITY_REVIEW.md`, `MOBILE_REVIEW.md`, `FINAL_GATE_REVIEW.md`

---

## Quick facts

- **24 screens** planned, all covered
- **10 user flows** planned
- **4 component layers** (Primitive → UI → Composite → Feature)
- **3 languages** planned (French-primary, English, Bambara)
- **7 viewport widths** covered (320 / 360 / 375 / 390 / 414 / 430 / tablet)
- **1 design system** based on existing M&C tokens (Red #C4122F + Inter)
- **0 React files** generated - this is a planning deliverable

---

## How to use this blueprint

1. A React team reads `00_MASTER_FRONTEND_BLUEPRINT.md` for the executive view.
2. Per-screen engineers read `screens/` for their owned screens.
3. Designers validate against `05_DESIGN_SYSTEM.md` and `06_LAYOUT_AND_SPACING_SYSTEM.md`.
4. QA validates against `19_QA_ACCEPTANCE_MATRIX.md` and `14_EMPTY_LOADING_ERROR_STATES.md`.
5. PMs validate against `20_TRACEABILITY_MATRIX.md` and `17_IMPLEMENTATION_ROADMAP.md`.

No code is committed from this blueprint. Implementation lives in the future React project root.