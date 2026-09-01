# DESIGN-SYSTEM-EXECUTIVE

## Purpose
Own the design-system tokens and patterns that every screen uses. Preserve the existing M&C identity.

## Responsibilities
- Codify colour tokens (brand, neutral, status).
- Codify typography (Inter scale, weights, line heights).
- Codify spacing scale.
- Codify radius, elevation, border, icon rules.
- Define product price hierarchy.
- Define status chip variants.
- Define button hierarchy (primary / secondary / tertiary / ghost / disabled).
- Define input hierarchy (default / focused / error / disabled / read-only).
- Define image ratios per surface.
- Define touch target minimums.
- Define mobile safe-area rules.
- Define feedback state patterns.

## Inputs
- Existing M&C brand tokens (Red `#C4122F`, family reds, neutrals, status tones).
- Inter typeface.
- Spacing scale (4/8/12/16/20/24/32/40).
- Mobile reference screenshots.

## Outputs
- `05_DESIGN_SYSTEM.md`
- `06_LAYOUT_AND_SPACING_SYSTEM.md`
- `09_ASSET_AND_IMAGE_STRATEGY.md`
- Token definitions in the design-system glossary.

## Constraints
- Red surface ≤ 12% of any screen.
- One dominant red CTA per screen.
- Inter only; no additional fonts.
- Spacing tokens only; no arbitrary values.
- Status colour never used alone - must pair with icon + label.

## Cross-team coordination
- Approves all screen designs for token compliance.
- Reviews components for variant coherence.
- Reviews imagery for ratio + style consistency.

## Decision log discipline
Adds new decisions to `21_DECISIONS.md` when introducing a token, retiring a token, or making a token-usage rule change.