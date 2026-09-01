# Web Research

> Mobile ecommerce UX patterns considered before each major surface. Used to inform - never override - the blueprint.

---

## Format

```
## RR-NN - <topic>
- **Sources:** …
- **Date accessed:** 2026-08-31
- **Pattern observed:** …
- **Why effective:** …
- **Relevance to M&C:** …
- **Verdict:** ADOPT | ADAPT | REJECT
- **Blueprint tie:** …
```

## RR-01 - Bottom-nav mobile e-commerce
- **Sources:** Amazon mobile, Jumia, Temu mobile, Alibaba mobile (visual reference #1).
- **Date:** 2026-08-31.
- **Pattern:** 4–5 fixed destinations; one dominant "Home"; the "Me / Profile" tab is always present; cart is usually a sub-route of "Home" or its own icon (Temu puts it centre).
- **Why effective:** Thumb-zone reach; predictable wayfinding.
- **Relevance to M&C:** Blueprint mandates 5 tabs. Adopted as-is.
- **Verdict:** ADOPT.
- **Blueprint tie:** `04_NAVIGATION_ARCHITECTURE.md` § 1.

## RR-02 - Search bar on Home
- **Sources:** Amazon, Jumia, 1688 mobile.
- **Pattern:** Always-visible search input at top, full-width on phone; voice + camera affordances next to it.
- **Why effective:** Reduces friction; search is the highest-conversion action.
- **Relevance to M&C:** Blueprint Home (04) lists search + image search at top. Adopt.
- **Verdict:** ADOPT.
- **Blueprint tie:** `03_INFORMATION_ARCHITECTURE.md` § 4.

## RR-03 - Image search entry
- **Sources:** 1688, Taobao, Temu.
- **Pattern:** Camera icon inside the search bar (right side); tap → full-screen capture flow.
- **Why effective:** Visible without burying the affordance; primary differentiator for product-finding.
- **Relevance to M&C:** Blueprint screen 09. Adopt - camera icon in the search input on Home and 06.
- **Verdict:** ADOPT.
- **Blueprint tie:** `screens/09_IMAGE_SEARCH.md`.

## RR-04 - Filter experience
- **Sources:** Baymard mobile-ecommerce research; Amazon; Jumia.
- **Pattern:** Mobile web uses **bottom sheet** (not sidebar). Sticky "Apply" CTA inside the sheet.
- **Why effective:** Reaches thumb; preserves context.
- **Relevance to M&C:** Blueprint § 30 of spec mandates bottom sheet. Adopt.
- **Verdict:** ADOPT.
- **Blueprint tie:** `06_LAYOUT_AND_SPACING_SYSTEM.md` § 9.

## RR-05 - Sticky CTA on PDP
- **Sources:** 1688, Alibaba mobile.
- **Pattern:** Bottom-fixed action bar with primary CTA + secondary "Message" / "Quote". Bar hides when keyboard open.
- **Why effective:** Always reachable for conversion.
- **Relevance to M&C:** Blueprint mandates sticky CTA at thumb zone on PDP. Adapt - "Demander un devis" + "Ajouter au panier" with keyboard handling.
- **Verdict:** ADAPT.
- **Blueprint tie:** `04_NAVIGATION_ARCHITECTURE.md` § 4 + `MOBILE_REVIEW.md` § D-MR03.

## RR-06 - Landed-cost transparency
- **Sources:** Maersk Spot, Flexport, ShipBob.
- **Pattern:** Itemised table; "Estimated" badge on uncertain rows; unit cost column.
- **Why effective:** Removes anxiety; differentiates from generic "free shipping" claims.
- **Relevance to M&C:** Blueprint screen 12 makes Coût rendu Bamako a **key differentiator**. Adopt.
- **Verdict:** ADOPT.
- **Blueprint tie:** `screens/12_LANDED_COST.md`.

## RR-07 - Order tracking timeline
- **Sources:** DHL, UPS, FedEx, AliExpress.
- **Pattern:** Vertical timeline; current step emphasised (filled icon); pending steps muted; completed steps checked; exception states shown inline.
- **Why effective:** Predictable; doesn't rely on colour alone.
- **Relevance to M&C:** Blueprint screen 21. Adopt with status-icon + label requirement.
- **Verdict:** ADOPT.
- **Blueprint tie:** `screens/21_ORDER_TRACKING.md`.

## RR-08 - Mobile dashboard density
- **Sources:** Shopify mobile, Square mobile, Jumia seller mobile.
- **Pattern:** 2-column KPI tiles on phone; period selector sticky on top; one trend chart; category mix as horizontal bars; 3–5 recent orders; one insight callout.
- **Why effective:** Scannable; avoids BI/desktop density.
- **Relevance to M&C:** Blueprint screen 24. Adopt.
- **Verdict:** ADOPT.
- **Blueprint tie:** `16_ANALYTICS_UI_PLAN.md` + `screens/24_BUSINESS_DASHBOARD.md`.

## RR-09 - Anti-patterns to avoid
- **Sources:** Baymard mobile UX.
- **Pattern:** Don't ship desktop multi-column filters; don't auto-rotate carousels aggressively; don't place the primary CTA above the fold if it requires scroll context.
- **Relevance to M&C:** Blueprint § 30 explicitly bans sidebar filters. Adopt.
- **Verdict:** ADOPT.
- **Blueprint tie:** spec section 29 / 30.

## RR-10 - Trust signals on B2B PDP
- **Sources:** Alibaba "Verified Supplier" badge; ThomasNet.
- **Pattern:** Verification badges, response rate, transaction history - all M&C-attributed (never supplier name).
- **Why effective:** Builds confidence without bypassing intermediary.
- **Relevance to M&C:** Blueprint § 5 of `15_FRONTEND_SECURITY_BOUNDARIES.md` allows "Vérifié par M&C Connect" / "Garantie M&C". Adopt.
- **Verdict:** ADOPT.
- **Blueprint tie:** `15_FRONTEND_SECURITY_BOUNDARIES.md` § 5.
