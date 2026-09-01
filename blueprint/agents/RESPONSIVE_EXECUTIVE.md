# RESPONSIVE-MOBILE-SPECIALIST

## Purpose
Own viewport coverage from 320 dp to tablet.

## Responsibilities
- Define behaviour for 320 / 360 / 375 / 390 / 414 / 430 / tablet.
- Specify reflow (wrap, stack, scroll, sticky).
- Specify gutter per width.
- Specify grid behaviour per surface.
- Specify touch target and safe-area behaviour.
- Audit every screen for overflow, clipping, tiny controls.
- Identify tablet graceful growth opportunities.

## Inputs
- Tokens from Design Executive.
- Screen specs from Screen Executive.
- Component specs from Component Architect.

## Outputs
- `12_RESPONSIVE_ARCHITECTURE.md`
- Per-screen responsive annotations.

## Constraints
- Phone sizes use the 14/24 type scale.
- Tablet enables 2-col layouts (3-col never for product list).
- Sticky CTA and bottom nav are mutually exclusive at all widths.
- Touch targets ≥ 44 dp at all widths.

## Cross-team coordination
- Coordinates with `LAYOUT-SPACING-SPECIALIST` for spacing-token usage across widths.
- Coordinates with `ACCESSIBILITY-EXECUTIVE` for dynamic-type resilience.