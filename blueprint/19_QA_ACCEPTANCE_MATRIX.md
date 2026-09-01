# 19 - QA Acceptance Matrix

> Per-screen quality scorecard. Any score < 8 triggers revision.

---

## 1. Scoring rubric (1–10)

| Criterion | 10 = excellent | 5 = needs work | 1 = fail |
|-----------|----------------|----------------|---------|
| Visual hierarchy | Clear, scannable | Mixed | Confusing |
| Spacing consistency | All tokens | Some ad-hoc | Arbitrary |
| Navigation clarity | One obvious next step | Two competing | None |
| Business relevance | Directly supports import workflow | Tangential | Off-topic |
| Conversion clarity | CTA obvious | CTA hidden | None |
| Mobile usability | One-handed reach | Awkward | Overflow |
| Accessibility | AA + extras | AA only | Fails |
| State completeness | All states covered | Some missing | Critical missing |
| Component reuse | All canonical | Some custom | Many custom |
| Localization readiness | fr + en + bm ready | fr + en | fr only |
| Brand consistency | Perfect M&C voice | Mostly | Off-brand |

## 2. Per-screen scores (planned targets)

All screens targeted at ≥ 8 across all 11 criteria. Exceptions noted below.

| # | Screen | Target score |
|---|--------|--------------|
| 01 | Onboarding & language | 9 |
| 02 | Connexion | 9 |
| 03 | Profil entreprise | 8 |
| 04 | Accueil | 9 |
| 05 | Catégories | 9 |
| 06 | Recherche active | 9 |
| 07 | Résultats de recherche | 9 |
| 08 | Filtres | 8 |
| 09 | Recherche par image | 8 |
| 10 | Fiche produit | 10 |
| 11 | Spécifications & paliers | 9 |
| 12 | Coût rendu Bamako | 10 |
| 13 | Comparer | 8 |
| 14 | Demander un devis | 9 |
| 15 | Panier | 9 |
| 16 | Récapitulatif | 9 |
| 17 | Paiement | 9 |
| 18 | Commande confirmée | 9 |
| 19 | Devis reçu | 9 |
| 20 | Mes commandes | 9 |
| 21 | Suivi de commande | 10 |
| 22 | Rapport QC | 9 |
| 23 | Messages | 9 |
| 24 | Tableau de bord entreprise | 9 |

## 3. Acceptance gates per screen

A screen ships only when:

1. All 11 criteria score ≥ 8.
2. Reviewer agents (visual, UX, mobile, accessibility, business-model, content, architecture) sign off.
3. Empty / loading / error states implemented.
4. Localization copy locked for fr-ML + en.
5. Stakeholder demo passes.

## 4. Failure handling

A screen that scores < 8 in any criterion returns to its owning specialist. The specialist revises; the reviewer re-runs. Cycle continues until gate passes.

## 5. Final review gate

Before release:
- Visual consistency review
- UX review
- Cross-screen consistency review
- Accessibility review
- Mobile review
- Business-model safety review

All six must sign off.