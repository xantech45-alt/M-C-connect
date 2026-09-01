# 11 - Accessibility Plan

> WCAG-aligned baseline for M&C Connect mobile.

---

## 1. Standards target

- WCAG 2.1 Level AA baseline.
- Some AAA-level contrast where it costs nothing (e.g. body text).
- Native mobile platform conventions respected (Apple HIG, Material 3).

## 2. Touch targets

- Minimum 44 × 44 dp on all interactive elements.
- Recommended 48 × 48 dp for primary actions.
- Adjacent touch targets separated by ≥ 8 dp.

## 3. Contrast

| Surface | Foreground | Ratio |
|---------|-----------|-------|
| White | `--ink` | 16:1 (AAA) |
| White | `--slate` | 6.5:1 (AA Large + AAA Normal) |
| White | `--mc-red` | 5.4:1 (AA Normal) |
| `--mc-red-tint` | `--mc-red-deep` | 9.2:1 (AAA) |
| `--mc-red` | White | 5.4:1 (AA Normal) |
| `--surface` | `--ink` | 15.5:1 (AAA) |

All status tones paired with icon + label to satisfy "1.4.1 Use of Color".

## 4. Focus order

- Logical, top-to-bottom, left-to-right.
- Visible focus ring: 2 px `--mc-red` outline at 2 px offset.
- Skip-to-content links only on tabbed screens (e.g. order list with tabs).

## 5. Semantic structure

- Every screen has a single `<h1>` (page title).
- Sections use `<h2>` / `<h3>`.
- Lists use semantic `<ul>` / `<li>`.
- Forms use `<form>` with labelled inputs.
- Buttons are `<button>`, links are `<a>`.

## 6. Form labels

- Every input has a visible label above the field.
- Helper text below the field for guidance.
- Error text below the field, with `aria-describedby` linking to the input.
- Required fields marked with `aria-required="true"` and a visible asterisk in label.

## 7. Error association

- Error message is associated via `aria-describedby`.
- Error icon included for non-sighted users.
- Error is announced via live region when it appears.

## 8. Image alt strategy

| Image | Alt |
|-------|-----|
| Product photo | product name + category |
| Category icon | category name |
| Decorative illustration | empty `alt=""` |
| Status icon | status label |
| Logo | "M&C Connect" |

## 9. Status indicators

- Never rely on colour alone. Every status combines: colour + icon + label.
- Order status uses `StatusChip` (icon + label + colour tone).

## 10. Reduced motion

- Respect `prefers-reduced-motion: reduce`.
- Disable parallax, large transitions, carousels auto-advance.
- Keep transitions < 200 ms when reduced.
- Skeletons and progress indicators remain.

## 11. Dynamic type

- All text scales with user font-size setting (iOS Dynamic Type, Android Font Scale).
- Layout reflows up to 200% scale without overflow.
- Buttons expand vertically; cards expand height; product grids reflow to a single column at extreme scales.

## 12. Keyboard / external input

- Visible focus ring everywhere.
- Logical tab order.
- Esc closes modals and bottom sheets.
- Enter submits forms.

## 13. Screen reader

- VoiceOver / TalkBack tested for: Home, Search, PDP, Cart, Checkout, Tracking.
- Live regions for: form errors, toast, status changes, order updates.

## 14. Colour independence

- Never use colour alone for: status, validation, selected state, current step.
- Selected filters show check icon + red colour.
- Order current state uses filled node + label, not just colour.

## 15. Decisions

- D-A01 Touch targets ≥ 44 dp.
- D-A02 Contrast ≥ AA across the system.
- D-A03 No colour-only meaning.
- D-A04 Respect `prefers-reduced-motion`.
- D-A05 Support up to 200% dynamic type.