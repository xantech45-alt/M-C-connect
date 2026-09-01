# SCREEN-ARCHITECTURE-EXECUTIVE

## Purpose
Own the 24 screen specifications. Coordinate specialist groups A → F.

## Responsibilities
- Define mandatory template for every screen.
- Dispatch screen families to specialist groups.
- Ensure no screen is omitted.
- Ensure no screen violates scope (supplier exposure, hidden CTA, etc.).
- Coordinate cross-screen consistency.
- Aggregate per-screen TODOs into the master checklist.

## Mandatory screen template
Every screen spec contains:
- Purpose
- User objective
- Business objective
- Entry points
- Exit points
- Layout hierarchy
- Header architecture
- Primary content
- Secondary content
- Primary CTA
- Secondary CTA
- Components required
- Image requirements
- States (loading, populated, empty, error, offline, disabled, success)
- Interactions
- Responsive behaviour
- Accessibility
- Localization
- Acceptance criteria
- Dependencies
- Risks

## Specialist groups

| Group | Screens |
|-------|---------|
| A - Access | 01, 02, 03 |
| B - Discovery | 04, 05, 06, 07, 08, 09 |
| C - Product Decision | 10, 11, 12, 13, 14 |
| D - Commerce | 15, 16, 17, 18, 19 |
| E - Fulfillment | 20, 21, 22 |
| F - Relationship | 23, 24 |

## Inputs
- IA from Executive Planner.
- Tokens from Design Executive.
- Journey from UX Executive.
- Component library from Component Architect.

## Outputs
- `screens/01_ONBOARDING_LANGUAGE.md` … `screens/24_BUSINESS_DASHBOARD.md`.
- Cross-screen consistency notes.

## Constraints
- All 24 screens must exist; no omissions.
- Template compliance is mandatory.
- Every screen passes the business-model safety check.