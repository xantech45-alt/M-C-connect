# Accessibility Review

> WCAG 2.1 AA baseline.

---

## Checklist

### Touch targets
- [ ] ≥ 44 × 44 dp on every interactive element.
- [ ] ≥ 48 dp on primary actions.
- [ ] ≥ 8 dp spacing between adjacent targets.

### Contrast
- [ ] Body text ≥ 4.5:1.
- [ ] Large text ≥ 3:1.
- [ ] Status colour pairs with icon + label.
- [ ] White-on-red passes AA.

### Focus order
- [ ] Top-to-bottom, left-to-right.
- [ ] Visible focus ring everywhere.
- [ ] Skip-to-content on tabbed screens.

### Semantic structure
- [ ] Single h1 per screen.
- [ ] Lists use ul/li.
- [ ] Forms use form + label.
- [ ] Buttons are buttons; links are links.

### Form labels
- [ ] Visible label above each input.
- [ ] Helper text below.
- [ ] Errors associated via aria-describedby.
- [ ] Required fields marked.

### Image alt
- [ ] Product photo: product name + category.
- [ ] Decorative: empty alt.
- [ ] Status icon: status label.

### Status indicators
- [ ] Icon + label + colour.
- [ ] Never colour-only.

### Reduced motion
- [ ] Parallax disabled when reduced.
- [ ] Auto-advance carousels paused.
- [ ] Transitions ≤ 200 ms.

### Dynamic type
- [ ] Layout reflows at 200%.
- [ ] No overflow.
- [ ] Grids reflow to single column.

### Keyboard / external input
- [ ] Visible focus ring.
- [ ] Logical tab order.
- [ ] Esc closes modals/sheets.
- [ ] Enter submits forms.

### Screen reader
- [ ] VoiceOver / TalkBack walk-throughs succeed on critical screens.
- [ ] Live regions for errors, toasts, status changes.

### Colour independence
- [ ] No colour-only state.

## Per-screen verdict

Pending implementation.

## Decisions

- D-AR01 WCAG 2.1 AA is the minimum.
- D-AR02 Status colour never sole signal.
- D-AR03 Dynamic type scales to 200%.