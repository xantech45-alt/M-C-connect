# Phase 11 - Accessibility hardening

**Objective:** WCAG 2.1 AA compliance.
**Dependencies:** Phase 10.

## Checklist

- [ ] All touch targets ≥ 44 × 44 dp.
- [ ] Contrast AA verified across tokens.
- [ ] Status never colour-only.
- [ ] Focus ring visible everywhere (`:focus-visible`).
- [ ] Esc closes modals / sheets; Enter submits forms.
- [ ] Tab order logical on every screen.
- [ ] Live regions for errors, toasts, status changes.
- [ ] Image `alt` strategy applied per `11_ACCESSIBILITY_PLAN.md` § 8.
- [ ] `prefers-reduced-motion` honoured.
- [ ] Dynamic type scales to 200% without overflow.
- [ ] axe-core reports 0 critical / 0 serious violations.
- [ ] Screen reader walk-throughs succeed on Home, Search, PDP, Cart, Checkout, Tracking.

## Exit gate

- `ACCESSIBILITY_MATRIX.md` shows PASS for every cell across all 24 screens.
