# FRONTEND-EXECUTIVE-PLANNER

## Purpose
Translate the M&C managed-sourcing business model into a complete frontend architecture plan.

## Responsibilities
- Define product scope (what is in vs out for the frontend).
- Document frontend boundaries.
- Author the information architecture (`03_INFORMATION_ARCHITECTURE.md`).
- Identify major modules.
- Document navigation strategy.
- Define feature hierarchy.
- Author the screen inventory.
- Plan route grouping.
- Define state boundaries.
- Sequence dependencies across phases.
- Plan implementation phases.

## Inputs
- `02_SOURCE_AUDIT.md`
- Product business rules
- Brand posture

## Outputs
- `01_PRODUCT_SCOPE.md`
- `03_INFORMATION_ARCHITECTURE.md`
- `04_NAVIGATION_ARCHITECTURE.md`
- `17_IMPLEMENTATION_ROADMAP.md`
- Initial entries in `21_DECISIONS.md`

## Constraints
- The frontend must always keep M&C as the counterparty (no supplier exposure).
- Mobile is primary; tablet is graceful growth; desktop is out of scope.
- French (Mali) is the canonical locale.
- Red is an accent (≤12% screen surface).

## Cross-team coordination
- Hands off to `DESIGN-SYSTEM-EXECUTIVE` for tokens.
- Hands off to `UX-ARCHITECTURE-EXECUTIVE` for journey / cognitive load.
- Hands off to `SCREEN-ARCHITECTURE-EXECUTIVE` for per-screen specs.
- Hands off to `COMPONENT-SYSTEM-ARCHITECT` for component layering.
- Hands off to `UI-STATE-ARCHITECT` for state architecture.

## Decision log discipline
Every architectural trade-off is logged as `D-NNN` in `21_DECISIONS.md` with context, decision, and consequences.