# 01 · Knowledge and requirements mapping

Date: 21 Oct 2026. The Google Drive knowledge base was read directly through the Drive connector. No local synced copy exists, and none was needed.

## 1. Documents read

| # | Document (Drive) | Version / date | Read | Used for |
|---|---|---|---|---|
| 1 | 06 - MC Connect Master Specification | v1.0, 21 Oct 2026 | Full | Authority #1: invariants INV-1..9, order states 4.2, Commandes tabs 4.3, MS-* register, screens §9, "Do not copy" §11 |
| 2 | 04 - MC Connect Technical Blueprint (folder 03) | v1.2 addenda, 21 Oct 2026 | Full | Authority #2: stack (Next.js planned), frontend §9 budgets, UX copy rules, admin route list |
| 3 | 01 - MC Connect Project Overview | v1.1, 21 Oct 2026 | Full | Business model, actors, lifecycle, gaps G1-G10, mockup reading |
| 4 | 02 Amazon Study / 01 Sitemap and Information Architecture | v2.1 | Full | Persistent anchors, public browse, checkout funnel, account hub |
| 5 | 02 Amazon Study / 02 Page Layouts and UI Components | v2 | Full | Desktop page zones (header, left facet rail, PDP columns, cart summary), component map |
| 6 | 02 Amazon Study / 03 Frontend Architecture and Workflow | v1.1 | Full | Rendering per page, budgets, URL-as-state |
| 7 | 02 Amazon Study / 00, 04-11 | v2.1 | Index only | Consolidated into the Master Spec (spec §1 states it replaces their requirement tables) |
| 8 | 03 Engineering Knowledge / 01-03, schema SQL v1/v2/v3.1 | v1.1 | Index only | Backend-only. Nothing in them applies to frontend presentation |
| 9 | 04 Alibaba.com Study (folder) | v1.1 | Folder listed. Content read through Master Spec consolidation | B2B tiers, RFQ, supplier trust (operator-side) |
| 10 | 05 1688 Study / 00-04 + schema v3.1 | v1.1 | Listed. Content read through Master Spec | Operator sourcing playbook (admin only, zh locale) |

**Not read in full:** the eight remaining Amazon reports, the three engineering docs, the Alibaba and 1688 reports, and the SQL files. The Master Spec explicitly consolidates all of them and wins on any conflict, so their requirements were taken from the spec. Nothing here is inferred beyond what the spec states.

**Local project knowledge also read:** `blueprint/` (00-21, screens 01-24), `implementation/DECISION_LOG.md` (IDI-001..027), and `README.md`. The owner change requests `MODIFICATION FOR THE APP.pdf` and `new modification.pdf` were known only through IDI-026 and IDI-027. The PDFs themselves were not opened.

## 2. Authority hierarchy applied

1. Master Specification v1.0 → 2. Technical Blueprint v1.2 → 3. study addenda → 4. Project Overview → 5. source code (implementation state only).

**Conflict found:** the local owner PDFs from September 2026 (IDI-026/027) removed the landed-cost breakdown and returns, and use Wave / Orange Money / Banque. The Master Spec (21 Oct 2026, newer) requires an itemised landed-cost quote (MS-PRC-01/02, G1) and lists Wave as Later (MS-PAY-01). These are business-workflow reversals, not presentation fixes. They were **not** re-implemented and are logged as decisions for the owner (U-01, U-02 in `10-UNRESOLVED-ISSUES.md`).

## 3. Requirements that drove the implementation

| Requirement (source) | What it says | How the frontend now meets it |
|---|---|---|
| MS-CAT-01 | Five permanent anchors: Accueil, Commandes, Produits, Messages, Profil. Demande sur mesure on Accueil and in Produits | Desktop header nav keeps the five anchors and adds a **Demande sur mesure** button (`DesktopNav`). Mobile bottom bar is unchanged |
| REQ-AMZ-IA-01 | Persistent global anchors on every screen | The PDP now has the global header on desktop (`PdpLayout`) |
| Spec 2.2 (Visitor: catalog, no auth) + AMZ IA open question 1 ("public browse, login at request/checkout") | The catalog is public | Onboarding "Passer" / "Commencer" go to `/home`, not `/login`. `/` remembers completion |
| INV-8 | French UI. Amounts shown as "125 000 FCFA". No technical state names | All customer amounts relabelled FCFA. ISO dates replaced with French dates. English trust strip translated |
| INV-2 + spec 4.2 | Nothing is bought before payment is verified. After proof the order is PAYMENT_VERIFYING ("Paiement en cours de vérification, réponse sous 2 h") | Confirmation page no longer says "Commande confirmée" with a fake ref. It uses the spec wording |
| MS-CAT-10 + brief rule "no fabricated reviews" | Verified reviews only from delivered orders, Phase 4 | Hash-generated star ratings removed from the PDP and search results |
| MS-TRU-01 | "Nous ne demandons jamais votre code" safety notice | Footer safety notice on desktop |
| Blueprint §9 budgets (first catalog page < 500 KB, Slow 3G) | Mobile-first weight | No new runtime dependency. Shell changes are CSS plus one small component. Images untouched |
| Blueprint §9 UX copy + spec §9 Home | Home follows the mockup: hero, services, Suivi rapide with status and ref, product rails | Suivi rapide now shows a real fixture order (MC-000123, status, French ETA) and deep-links to its tracking page |
| WCAG 2.2 AA (brief) | Contrast, labels, structure | Warning token contrast, form labels, carousel tab semantics, heading order, QC image role |

## 4. Requirements not addressable in the frontend now

These are recorded in `10-UNRESOLVED-ISSUES.md`:

- **Operator console (/admin, spec §9):** not implemented in the codebase.
- **Public pages** comment-ca-marche, tarifs, suivi/[ref]: not implemented.
- **Canonical order state machine (4.2) and six Commandes tabs (4.3):** the fixtures use nine simplified stages and three tabs.
- **OTP-only auth (MS-ID-01):** the UI offers email/password and Google/Apple.
- **Next.js / Tailwind / TanStack stack (MS-ENG-01):** the repo is Vite + React Router + CSS Modules. No migration was done (brief rule 9).
