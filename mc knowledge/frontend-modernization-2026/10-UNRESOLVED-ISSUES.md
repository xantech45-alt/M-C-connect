# 10 · Unresolved issues, deferred work and owner decisions

Severity: **H** high, **M** medium, **L** low. Type: **D** owner decision needed, **B** backend-dependent, **S** new scope (screen not built), **F** frontend follow-up.

| ID | Sev | Type | Issue | Evidence / source | Recommendation |
|---|---|---|---|---|---|
| U-01 | H | D | Itemised landed-cost breakdown removed (owner PDF, IDI-026), but Master Spec v1.0 (newer) requires it on PDP, basket and quote (MS-PRC-01/02, REQ-AMZ-UI-02, Overview G1) | `DECISION_LOG.md` IDI-026 vs spec §5.3 | Owner to confirm which source wins. If the spec wins, restore a `LandedPriceBlock` "Détail du prix" popover fed by the shared pricing engine |
| U-02 | H | D | Payment methods are Wave / Orange Money / Banque, plus 60% / 100% plans. Spec MVP is Orange Money, Moov Money, bank, cash at hub for the balance; Wave Later; deposit rule 70% for sea/large and 100% for new customers (MS-PAY-01/03) | `PaymentPage.tsx`, spec §5.5 | Owner decision, pending merchant accounts (spec P2) |
| U-03 | H | B/S | No customer quote screen (accept/reject, 72 h validity). Order stages are not the canonical 4.2 states. Commandes has 3 tabs, not 6 (4.3) | `state/orders.ts`, `OrdersPage.tsx` | Build `devis/[id]` and align `OrderStage` with 4.2 when the orders API exists. Keep the label table in one module |
| U-04 | H | B | Payment instructions lack merchant number, reference, amount, expiry, and proof upload (transaction id + screenshot) | spec MS-PAY-02 | Implement with the `/uploads` presigned flow. Until then, keep the "vérification sous 2 h" wording |
| U-05 | M | D | Auth UI is email/password plus Google/Apple. Spec is phone OTP only (WhatsApp first) | `LoginPage.tsx`, MS-ID-01 | Replace with the OTP screen when the auth API exists. Social sign-in is not in the spec |
| U-06 | M | B | Auth is a mock: any input signs in and there are no route guards | `AuthProvider.tsx` | Real JWT/refresh per MS-ID-02. Guard account routes |
| U-07 | M | D | Flash-sale countdown restarts on every visit (artificial urgency) | `HomePage.tsx useCountdown` | Remove, or drive it from a real campaign end date |
| U-08 | H | S | **Operator console (/admin) not implemented**: no dashboard, request/quote/payment queues, purchasing, QC, shipments, reports | spec §9, Blueprint §4 | Separate project phase. Desktop-first (sidebar, tables, attention panel MS-SRC-10). The new desktop shell tokens apply |
| U-09 | M | S | Public pages comment-ca-marche, tarifs and suivi/[ref] (public tracking by ref + last 4 phone digits) are missing | spec §9, MS-TRU-01 | Build with SSR when migrating, or as SPA pages now |
| U-10 | L | D | No dark mode (not an approved feature) | `tokens.css` `color-scheme: light` | Optional enhancement. The tokens are already centralised |
| U-11 | L | F | Pre-auth pages show the title twice (header h1 plus card h1 on Login, Register, VerifyCode, ResetPassword, BusinessProfile) | Desktop card screenshots | Make the `DetailCommerceHeader` title non-heading where the page owns its h1 |
| U-12 | L | F | Onboarding illustration contains English "Shop Now". The English slogan "MC Connect the Connection beyond Borders" in the hero is owner-requested and covered by a test | `assets/brand/onboarding-1.png`, `HomePage.test.tsx` | Replace the asset. Confirm the slogan language with the owner (INV-8) |
| U-13 | M | F | Desktop filters are still a separate `/filters` page (IDI-019), not a left facet rail | Amazon 02 §2.2 | Render `FiltersPage` content as a sidebar ≥1024px on search/products |
| U-14 | M | B | Custom request has no photo upload or 1688/Taobao/Alibaba link field | MS-REQ-02 | Add with the upload pipeline. Draft in IndexedDB |
| U-15 | L | D | PDP shows "En stock". Spec §11: no real-time stock, ranges only | PDP | Replace with an availability or delivery range |
| U-16 | M | F | Demo-data disclosure is visible only in the desktop footer | `SiteFooter.tsx` | Add a dismissible mobile notice, or show it on Profil |
| U-17 | M | B | Customer-facing "Recommandés pour vous" and "Récemment consultés" are static slices, not personalised | `HomePage.tsx` | Rename, or back with real history |
| U-18 | L | F | PaymentPage CTA reads "Confirmer et payer" although payment happens outside the app | `PaymentPage.tsx` | "J'ai compris, continuer" or "Envoyer la preuve de paiement" once proof upload exists |
| U-19 | M | D | Stack differs from MS-ENG-01 (Next.js, Tailwind, TanStack, next-intl) | `package.json` | Migration is a separate, approved decision (brief rule 9). The layout and token work here carries over |
| U-20 | L | F | The dev-only axe integration reported findings in the console only. It is not a CI gate | `App.tsx` | Add `@axe-core/playwright` to a Playwright suite in CI |
