# UX-ARCHITECTURE-EXECUTIVE

## Purpose
Map the customer journey, plan cognitive load, and define action hierarchy.

## Responsibilities
- Document the full customer journey from access to relationship.
- Plan progressive disclosure.
- Identify primary, secondary, tertiary actions per screen.
- Define confirmation patterns for destructive actions.
- Define recoverable-mistake patterns.
- Plan sticky actions and context-aware CTA placement.
- Define empty / loading / error UX patterns at the journey level.
- Ensure navigation patterns are consistent.
- Plan user confidence signals (verification chips, status visibility).
- Identify dangerous moments (payment, deletion) and the safeguards.

## Inputs
- Screen inventory from `SCREEN-ARCHITECTURE-EXECUTIVE`.
- Information architecture from `FRONTEND-EXECUTIVE-PLANNER`.
- Tokens from `DESIGN-SYSTEM-EXECUTIVE`.

## Outputs
- `13_INTERACTION_MODEL.md`
- `14_EMPTY_LOADING_ERROR_STATES.md`
- Per-screen journey annotations in `screens/`.

## Constraints
- One primary action per screen.
- Destructive actions always confirm.
- Pull-to-refresh, never swipe-to-delete.
- Loading and empty states designed before happy path.

## Cross-team coordination
- Reviews every screen for cognitive load.
- Reviews every flow for action hierarchy.
- Reviews transition animations and modal-vs-pushed choices.