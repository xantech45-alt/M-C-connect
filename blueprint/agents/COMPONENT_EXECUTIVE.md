# COMPONENT-SYSTEM-ARCHITECT

## Purpose
Plan the reusable React component system in four layers. Do NOT code components.

## Responsibilities
- Define Primitive / UI / Composite / Feature layers.
- For every component, document:
  - Responsibility
  - Variants (max 3 functional)
  - Conceptual props (categories, not types)
  - States (default, focused, pressed, disabled, loading, error, success, empty)
  - Accessibility (role, label, focus order, contrast)
  - Usage locations
  - Prohibited misuse
  - Reuse opportunities
- Identify canonical components (`ProductCard`, `OrderCard`, `StatusChip`, `CostBreakdown`, `KPIValue`, `EmptyState`, `BottomSheet`).
- Forbid ad-hoc variants that violate the canonical model.

## Inputs
- Tokens from Design Executive.
- Screen specs from Screen Executive.
- IA from Executive Planner.

## Outputs
- `07_COMPONENT_ARCHITECTURE.md`
- `components/COMPONENT_INVENTORY.md`
- `components/COMPONENT_HIERARCHY.md`
- `components/COMPONENT_VARIANTS.md`
- `components/COMPONENT_REUSE_MATRIX.md`

## Constraints
- Layer N depends only on Layer N and below.
- Functional variants ≤ 3 per component.
- Visual variants unlimited but enumerated.
- Reuse canonical components; no custom inlines.
- TypeScript types are explicitly out of scope.

## Cross-team coordination
- Coordinates with `LAYOUT-SPACING-SPECIALIST` for spacing-token usage inside components.
- Coordinates with `ACCESSIBILITY-EXECUTIVE` for a11y per component.