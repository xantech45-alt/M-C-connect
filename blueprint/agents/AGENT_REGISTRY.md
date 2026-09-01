# Agent Registry

> All planning agents and their responsibilities for the M&C Connect frontend blueprint.

---

## 1. Master Orchestrator

| Agent | Responsibility |
|-------|----------------|
| `MASTER-FRONTEND-ORCHESTRATOR` | Coordinates the entire planning effort. Sets sequence. Resolves conflicts. Maintains `21_DECISIONS.md`. Approves final blueprint. |

## 2. Executive Planners

| Agent | Responsibility |
|-------|----------------|
| `FRONTEND-EXECUTIVE-PLANNER` | Translates M&C business model into frontend architecture. Owns IA, modules, navigation, screen inventory, route grouping, state boundaries, dependency planning. |
| `DESIGN-SYSTEM-EXECUTIVE` | Owns tokens, type scale, spacing, radius, elevation, iconography, imagery ratios, button hierarchy, status chips, product price hierarchy, mobile safe-area rules. |
| `UX-ARCHITECTURE-EXECUTIVE` | Owns customer journey, cognitive load planning, action hierarchy, sticky actions, confirmation patterns, recoverable mistakes. |
| `SCREEN-ARCHITECTURE-EXECUTIVE` | Owns the 24 screen specifications. Coordinates specialist groups A → F. |

## 3. Specialist Executives

| Agent | Responsibility |
|-------|----------------|
| `COMPONENT-SYSTEM-ARCHITECT` | Owns the 4-layer component hierarchy. Defines variants, props concepts, states, accessibility, usage, prohibited misuse, reuse. |
| `REACT-STRUCTURE-PLANNER` | Owns the conceptual `src/` folder plan (planning only). Does not create folders. |
| `NAVIGATION-ARCHITECT` | Owns bottom nav, top app bar, sticky action, modal/sheet, deep-link, back-navigation rules. |
| `LAYOUT-SPACING-SPECIALIST` | Audits every screen for gutter, alignment, grid consistency, visual rhythm, sticky collision. |
| `PRODUCT-EXPERIENCE-SPECIALIST` | Owns product imagery, card patterns, gallery, MOQ display, tier pricing. |
| `LANDED-COST-SPECIALIST` | Owns the landed-cost transparency pattern. |
| `ORDER-TRACKING-SPECIALIST` | Owns the multi-stage tracking system. |
| `IMAGE-ASSET-STRATEGIST` | Owns photography principles, ratios, anti-patterns, status icons. |
| `LOCALIZATION-SPECIALIST` | Owns locale rules, currency, dates, plurals. |
| `RESPONSIVE-MOBILE-SPECIALIST` | Owns viewport coverage, reflow, touch targets. |
| `UI-STATE-ARCHITECT` | Owns state families, ownership, server-derived state. |
| `FORM-EXPERIENCE-SPECIALIST` | Owns form fields, validation, draft, destructive-action safeguards. |
| `ANALYTICS-DASHBOARD-SPECIALIST` | Owns the business dashboard screen 24. |
| `ACCESSIBILITY-EXECUTIVE` | Owns a11y baseline, touch targets, contrast, focus, screen-reader support. |

## 4. Specialist Screen Groups

| Group | Owns screens |
|-------|--------------|
| **A - Access** | 01, 02, 03 |
| **B - Discovery** | 04, 05, 06, 07, 08, 09 |
| **C - Product Decision** | 10, 11, 12, 13, 14 |
| **D - Commerce** | 15, 16, 17, 18, 19 |
| **E - Fulfillment** | 20, 21, 22 |
| **F - Relationship** | 23, 24 |

## 5. Reviewers

| Reviewer | Responsibility |
|----------|----------------|
| `VISUAL-CONSISTENCY-REVIEWER` | Typography, colour, radius, icon language, card language, spacing. |
| `UX-REVIEWER` | Flow, navigation, cognitive load, action priority. |
| `ECOMMERCE-REVIEWER` | Discovery, product-decision info, MOQ, cart, RFQ, cost transparency. |
| `MOBILE-REVIEWER` | One-handed usability, overflow, keyboard collision, safe area, sticky elements. |
| `ACCESSIBILITY-REVIEWER` | Contrast, focus order, semantic structure, screen-reader support. |
| `BUSINESS-MODEL-REVIEWER` | Ensures no UX bypasses M&C. |
| `CONTENT-REVIEWER` | Consistent French terminology. |
| `ARCHITECTURE-REVIEWER` | Duplication, maintainability. |

## 6. Multi-pass review loop

```
PASS 1 - Specialist creation
PASS 2 - Executive review
PASS 3 - Cross-function review
PASS 4 - Conflict resolution
PASS 5 - Quality gate
PASS 6 - Orchestrator approval
```

A deliverable failing a gate returns to its owning specialist.