# UX Review

> Flow, navigation, cognitive load, action priority.

---

## Scope
Customer journey, every screen, every transition.

## Checklist

### Flow integrity
- [ ] Each screen has clear entry and exit points.
- [ ] No dead ends.
- [ ] Back navigation behaves predictably.
- [ ] Tab navigation resets to root.

### Cognitive load
- [ ] Each screen max 6 primary regions.
- [ ] Sticky CTA hides in-content CTA only when scrolled past.
- [ ] Empty state offers a clear next action.

### Action priority
- [ ] One primary CTA per screen.
- [ ] Secondary actions outlined or text links.
- [ ] Tertiary actions minimal-emphasis.

### Confirmation
- [ ] Destructive actions confirm via bottom sheet.
- [ ] Cart removal offers undo toast.

### Recoverable mistakes
- [ ] Form drafts auto-save for forms ≥ 4 fields.
- [ ] Navigation back preserves form state.

### Navigation
- [ ] Bottom nav visibility matches screen type.
- [ ] Deep links render loading skeleton first.

### Empty / first-use
- [ ] Friendly headline + CTA on every empty state.
- [ ] First-use onboarding surfaces key features.

### Sticky elements
- [ ] Sticky CTA never collides with bottom nav.
- [ ] Bottom nav never competes with sticky CTA.

## Per-flow verdict

| Flow | Verdict |
|------|---------|
| Authentication | Pending |
| Discovery | Pending |
| Search | Pending |
| Image Search | Pending |
| Product Decision | Pending |
| RFQ | Pending |
| Cart/Checkout | Pending |
| Order Tracking | Pending |
| Quality Control | Pending |
| Customer Support | Pending |

## Failure handling

Cognition / flow issues return to UX Executive for revision.

## Decisions

- D-UXR01 One primary CTA per screen.
- D-UXR02 Sticky CTA replaces in-content CTA only when scrolled out.
- D-UXR03 Destructive actions confirm via bottom sheet.
- D-UXR04 Form drafts persist for forms ≥ 4 fields.