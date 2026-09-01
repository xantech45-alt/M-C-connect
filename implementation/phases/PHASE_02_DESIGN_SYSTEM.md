# Phase 02 - Design system

**Objective:** Codify colour, typography, spacing, radius, elevation, icon, image tokens.
**Dependencies:** Phase 01.

## Checklist

- [ ] `src/styles/tokens.css` declares every token from `blueprint/05_DESIGN_SYSTEM.md`.
- [ ] `src/styles/globals.css` applies typography defaults to `:root` and `body`.
- [ ] `src/styles/reset.css` removes default UA margins/padding without affecting a11y tree.
- [ ] Light theme baseline only (per D-001 + D-007).
- [ ] Inter loaded with `font-display: swap`; system fallback declared.
- [ ] `prefers-reduced-motion` honoured globally.
- [ ] `:focus-visible` ring uses 2 px `--mc-red` at 2 px offset.
- [ ] `@media (min-width: 600px)` raises body to 16 px (tablet).
- [ ] CSS custom properties only - no hardcoded colour / spacing inside feature code.
- [ ] `safe-area-inset-*` utilities available for top / bottom padding.

## Mapping (must match)

| Token | Value |
|-------|-------|
| `--mc-red` | `#C4122F` |
| `--mc-red-deep` | `#8E0B22` |
| `--mc-red-tint` | `#FBEAEC` |
| `--ink` | `#14181D` |
| `--slate` | `#5C6673` |
| `--border` | `#E4E7EB` |
| `--surface` | `#F5F6F8` |
| `--white` | `#FFFFFF` |
| `--success` | `#1F7A4D` |
| `--warning` | `#B4700E` |
| `--info` | `#1B4E7A` |

## Exit gate

- Lighthouse accessibility contrast checker passes on a sample page using these tokens.
- No hard-coded colour hex / spacing px inside `src/components/*` (verified by `grep -E '#[0-9A-Fa-f]{6}' src/components` returning only token-file imports).
