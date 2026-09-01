# Mobile Review

> One-handed usability, overflow, safe area, sticky elements.

---

## Checklist

### One-handed reach
- [ ] Primary action reachable at 60% screen height.
- [ ] Sticky CTA at thumb zone.
- [ ] Top app bar actions are secondary only.

### Overflow
- [ ] No horizontal overflow on standard widths.
- [ ] Long copy wraps; no clipping.
- [ ] Carousels show ≥ 2 visible items at standard width.

### Keyboard collision
- [ ] Inputs scroll into view before keyboard.
- [ ] Sticky CTA hides when keyboard open.
- [ ] Bottom nav hides when keyboard open.

### Safe area
- [ ] Top safe area respected on app bar.
- [ ] Bottom safe area respected on sticky CTA.
- [ ] Landscape orientation handled for select screens.

### Sticky elements
- [ ] Sticky CTA never collides with bottom nav.
- [ ] Sticky CTA never obscures last 24 dp of content.
- [ ] Bottom nav hidden when sticky CTA present.

### Touch interaction
- [ ] ≥ 44 dp touch targets everywhere.
- [ ] No accidental activations from adjacent targets.

### Viewport coverage
- [ ] 320 / 360 / 375 / 390 / 414 / 430 / tablet tested.

### Typography scaling
- [ ] Body 14 dp on phones, 16 dp on tablet.
- [ ] Display 24 dp on phones, 28 dp on tablet.

### Grid behaviour
- [ ] 2-col on phones, 3-col on tablet.

### Image sizing
- [ ] Card image scales with viewport.

## Per-screen verdict

Pending implementation.

## Decisions

- D-MR01 Sticky CTA and bottom nav are mutually exclusive.
- D-MR02 Primary action in thumb zone (60% screen height).
- D-MR03 Inputs scroll into view before keyboard.