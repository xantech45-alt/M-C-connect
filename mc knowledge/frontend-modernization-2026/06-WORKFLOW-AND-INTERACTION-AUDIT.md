# 06 · Workflow and interaction audit

Checked against the Master Spec §3 flow: Discover → Request → Quote → Accept → Pay (proof, 2 h verification) → Source → Receive → QC → Consolidate → Freight → Arrival/customs → Balance → Pickup/delivery → 7-day window → Completed.

## Customer journey, stage by stage

| Stage | Screen(s) | Status | Notes |
|---|---|---|---|
| Discover | /home, /categories, /products, /search, /search/results, /image-search | ✅ Works | Public browse is now reachable straight from onboarding (F-11). Desktop layouts improved |
| Product selection | /product/:id, /specs, /compare | ✅ with caveats | Shows "Coût total estimé … fret, douane et livraison inclus", labelled an estimate (MS-PRC-01 ✓). Itemised breakdown removed by owner decision (U-01). "En stock" shown, but spec §11 says no real-time stock (U-15) |
| Custom request | /rfq/new → /rfq/received | ✅ Front-end only | No photo upload or link field per MS-REQ-02 (U-14) |
| Quotation | (none) | ❌ Missing | No customer quote screen (devis/[id]): accept/reject with 72 h validity and FX-locked lines. Checkout goes straight from cart to payment, which is the generic e-commerce pattern the spec replaces (U-03) |
| Acceptance | /checkout/review | ⚠️ | A summary, not a quote acceptance |
| Payment instructions | /checkout/payment | ⚠️ | Three-step plan → transport → method (owner PDF). No merchant number, reference, amount/expiry instructions or proof upload (MS-PAY-02) (U-02, U-04) |
| Payment verification | /checkout/confirmation | ✅ **Fixed** | Was "Commande confirmée" with a hard-coded CMD-2024-0142. Now "Commande enregistrée — Paiement en cours de vérification, réponse sous 2 h" (spec 4.2 / INV-2) |
| Purchasing → QC → shipping → delivery | /orders, /orders/:id, /orders/:id/qc | ⚠️ | Timeline works and dates are now French. Stages are simplified (sourcing / production / qc / shipping / customs / delivery), not canonical 4.2. Three tabs instead of six (4.3) (U-03) |
| After-sales | /help, /contact, /messages | ⚠️ | No 7-day problem report with photos (MS-OPS-05). Returns were removed by owner decision |

## Supplier confidentiality (INV-1)

Searched all fixtures and pages for `supplier`, `1688`, `alibaba`, `taobao`, `tmall`, shop IDs and cost fields. **No supplier identity, upstream link, shop ID or cost price reaches the customer UI.** The only hit is a generic English i18n string ("every supplier is audited"). `domain/pricing.ts` exports only the customer total. Messages state "Vous ne traitez jamais directement avec un fournisseur chinois". **Real enforcement must happen server-side** (serializer tests, DB grants: MS-ID-03), because client-side hiding is not a control.

## Representations corrected

| ID | Issue | Fix |
|---|---|---|
| F-19 | Amounts as "XOF" | "FCFA" everywhere customers see money |
| F-20 | "ETA 2026-09-22" raw ISO | "Arrivée estimée : 22 sept. 2026". Timeline `<time dateTime>` |
| F-21 | Home "Suivi rapide" cited CMD-2024-0142 (no such order) and linked to the list | Uses the first in-flight fixture order (MC-000123 · Expédition) and deep-links to `/orders/MC-000123` |
| F-25 | Hash-generated 4.0-4.8★ ratings with review counts on the PDP and search | Removed. Spec MS-CAT-10: verified reviews after delivery, Phase 4 |
| F-26 | Confirmation claimed a confirmed order | Spec wording (see above) |

## Interactions

- **Onboarding:** keyboard arrows, dots (now proper tab/tabpanel with roving tabindex), swipe, skip, and persistent completion.
- **Navigation:** the desktop nav marks the active section with `aria-current="page"`, using the same match prefixes as the mobile tabs (`navTabs.ts`).
- **Forms:** `/profile-setup` labels are now programmatically associated, with autocomplete hints.
- **Demonstration honesty:** the desktop footer states that products, prices, orders and messages are fictitious and no payment is processed. Mobile has no footer, so a mobile disclosure is still open (U-16).

## Operator / admin workflows

Not auditable: **no admin routes exist** (U-08).
