# Final Audit

> Final-pass checklist. Run after Phase 13 closes.

---

## Source-of-truth checks

- [ ] `/blueprint` unchanged.
- [ ] `/implementation` complete with all control docs.
- [ ] No file in `/src` references supplier identity, contact, or location.
- [ ] No file in `/src` embeds an external chat widget.
- [ ] No file in `/src` links to alibaba.com, aliexpress.com, globalsources.com, or any direct supplier URL.
- [ ] All payment screens reference M&C-managed options only.

## Build / quality

- [ ] `npm run build` exits 0.
- [ ] `npm run typecheck` (alias for `tsc --noEmit`) exits 0.
- [ ] `npm run lint` exits 0.
- [ ] `npm run test` passes; coverage meets targets in `TEST_MATRIX.md`.
- [ ] No `any` types in `/src` (TypeScript `noImplicitAny`).
- [ ] No `eslint-disable` comments except explicitly justified.
- [ ] No console errors or warnings in dev or production build.
- [ ] No `@ts-ignore` outside of declared externals.

## Responsive

- [ ] `RESPONSIVE_MATRIX.md` fully populated; no FAIL cells.

## Accessibility

- [ ] `ACCESSIBILITY_MATRIX.md` fully populated.
- [ ] axe-core reports 0 critical / 0 serious violations on every screen.

## Performance

- [ ] `PERFORMANCE_REPORT.md` populated; Lighthouse mobile ≥ 80.

## Reviews

- [ ] `reviews/BLUEPRINT_COMPLIANCE.md` signed off.
- [ ] `reviews/CODE_REVIEW.md` signed off.
- [ ] `reviews/DESIGN_REVIEW.md` signed off.
- [ ] `reviews/VISUAL_REFERENCE_REVIEW.md` signed off.
- [ ] `reviews/MOBILE_QA.md` signed off.
- [ ] `reviews/TABLET_QA.md` signed off.
- [ ] `reviews/ACCESSIBILITY_REVIEW.md` signed off.
- [ ] `reviews/PERFORMANCE_REVIEW.md` signed off.
- [ ] `reviews/FINAL_ACCEPTANCE.md` signed off.

## Business-model safety

- [ ] Supplier exposure grep returns 0 matches for: phone, email, whatsapp, wechat, factory, seller chat, supplier payment.

## Acceptance

All boxes ticked → Implementation is APPROVED for hand-off.
