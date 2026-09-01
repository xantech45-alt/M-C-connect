# Design Review

> Visual consistency, brand fidelity, token compliance.

---

## Scope
Every screen, every component, every visual artefact.

## Checklist

### Typography
- [ ] Inter only - no other fonts.
- [ ] Weights 400 / 500 / 600 / 700 only.
- [ ] Line length 60–72 chars max in body.
- [ ] Numeric strings right-aligned in tables only.

### Colour
- [ ] Red surface ≤ 12% per screen.
- [ ] One dominant red CTA per screen.
- [ ] Status colour paired with icon + label.
- [ ] No gradients / glassmorphism / neon.

### Spacing
- [ ] Tokens only: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 56 / 72.
- [ ] Section gap 24 dp baseline.
- [ ] Card padding 16 dp default.

### Radius
- [ ] 4 / 8 / 12 / 16 / 999 only.
- [ ] Cards 12 dp.
- [ ] Pills 999 dp.

### Iconography
- [ ] Lucide / Phosphor line, 1.5 px stroke.
- [ ] Default 24 px.
- [ ] Colour from token.

### Imagery
- [ ] Real photography.
- [ ] Predictable ratios per surface.
- [ ] Centered, generous breathing room.

### Card language
- [ ] `radius-lg` (12 dp).
- [ ] 16 dp internal padding.
- [ ] `elev-1`.

### Status chip language
- [ ] Icon + label + colour tone.
- [ ] No colour-only meaning.

### Touch targets
- [ ] ≥ 44 dp.

### Safe area
- [ ] Top respects status bar.
- [ ] Bottom respects home indicator / gesture bar.

## Per-screen verdict

| Screen | Token compliance | Brand fidelity | Verdict |
|--------|------------------|----------------|---------|
| 01–24 | TBD at implementation | TBD at implementation | Pending |

## Failure handling

Any criterion failing triggers revision by owning specialist. Re-review.

## Decisions

- D-DR01 Token-only enforcement.
- D-DR02 One dominant red CTA per screen.
- D-DR03 Inter family only.
- D-DR04 Real photography only.