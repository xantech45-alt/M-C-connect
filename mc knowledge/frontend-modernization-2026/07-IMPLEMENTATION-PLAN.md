# 07 · Implementation plan (prioritised)

Prioritised from the verified findings in `00-MASTER-AUDIT-AND-IMPLEMENTATION.md`. Status at the close of this session: ✅ done, ⏳ deferred (see `10-UNRESOLVED-ISSUES.md`).

## P0: desktop shell (root cause of the mobile look)

1. ✅ Content width tokens (`--content-max/narrow/form`) and the desktop gutter (32px). Fix the gutter cascade bug.
2. ✅ CommerceHeader: one-row desktop grid plus `DesktopNav` (five anchors and Demande sur mesure). Rail limited to 900-1023px.
3. ✅ TabsLayout / PdpLayout desktop mode: centred outlet and `SiteFooter`. PDP gets the global header.
4. ✅ DetailLayout: `width="narrow"` for form/reading routes, a centred card for pre-auth pages, and a static page heading on desktop.
5. ✅ Sticky offsets read the measured header height. PDP `overflow-x: clip` so its sticky row works again.

## P1: customer pages and spec compliance

6. ✅ Onboarding: public skip, persistence, desktop two-column panel, tab/tabpanel semantics.
7. ✅ Home: banner hero, eight-column categories, flash grid, French trust strip, real Suivi rapide order.
8. ✅ Search results two-column cards. Products five columns ≥1280. Profile two columns. Auth card.
9. ✅ INV-8: FCFA labels and French dates. ✅ Confirmation wording per spec 4.2. ✅ Removed fabricated ratings.

## P2: accessibility

10. ✅ Warning contrast, form labels (`/profile-setup`), QC image role, heading order (`/products`), 320px OTP overflow.

## P3: deferred (needs owner input, backend or new scope)

11. ⏳ U-01/U-02 owner decisions (landed-cost breakdown, payment methods).
12. ⏳ U-03/U-04 quote screen, canonical states, proof upload (with backend).
13. ⏳ U-08 operator console. U-09 public pages.
14. ⏳ U-13 desktop filter sidebar. U-11 duplicate auth titles. U-16 mobile demo notice.

## Change control applied

- Each change was checked against the spec before implementation (`01-KNOWLEDGE-AND-REQUIREMENTS-MAPPING.md` §3).
- No framework migration and no new runtime dependencies. Playwright was used only from a scratch directory outside the repo.
- No business workflow was re-designed. The spec-vs-owner conflicts were logged, not resolved unilaterally.
- Mobile markup and behaviour are preserved: desktop is additive (CSS grid areas and media-query-gated components).
