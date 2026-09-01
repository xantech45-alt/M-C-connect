# Responsive Matrix

> One row per screen, one column per validated width. Initial state: all PENDING.

---

| # | Screen | 320 | 360 | 375 | 390 | 414 | 430 | 600 | 768 | 834 | 1024 |
|---|--------|-----|-----|-----|-----|-----|-----|-----|-----|-----|------|
| 01 | Onboarding | · | · | · | · | · | · | · | · | · | · |
| 02 | Connexion | · | · | · | · | · | · | · | · | · | · |
| 03 | Profil entreprise | · | · | · | · | · | · | · | · | · | · |
| 04 | Accueil | · | · | · | · | · | · | · | · | · | P |
| 05 | Toutes les catégories | · | · | · | · | · | · | · | · | · | · |
| 06 | Recherche active | · | · | · | · | · | · | · | · | · | · |
| 07 | Résultats de recherche | · | · | · | · | · | · | · | P | · | P |
| 08 | Filtres (sheet) | · | · | · | · | · | · | · | · | · | · |
| 09 | Recherche par image | · | · | · | · | · | · | · | · | · | · |
| 10 | Fiche produit | · | · | · | · | · | · | · | P | P | P |
| 11 | Spécifications & paliers | · | · | · | · | · | · | · | · | · | · |
| 12 | Coût rendu Bamako | · | · | · | · | · | · | · | · | · | · |
| 13 | Comparer | · | · | · | · | · | · | · | · | · | · |
| 14 | Demander un devis | · | · | · | · | · | · | · | · | · | · |
| 15 | Panier | · | · | · | · | · | · | · | · | · | P |
| 16 | Récapitulatif | · | · | · | · | · | · | · | · | · | · |
| 17 | Paiement | · | · | · | · | · | · | · | · | · | · |
| 18 | Commande confirmée | · | · | · | · | · | · | · | · | · | · |
| 19 | Devis reçu | · | · | · | · | · | · | · | · | · | · |
| 20 | Mes commandes | · | · | · | · | · | · | · | · | · | · |
| 21 | Suivi de commande | · | · | · | · | · | · | · | · | · | · |
| 22 | Rapport QC | · | · | · | · | · | · | · | · | · | · |
| 23 | Messages | · | · | · | · | · | · | · | · | · | · |
| 24 | Tableau de bord entreprise | · | · | · | · | · | · | · | · | · | · |

Legend: `·` = PENDING, `P` = PASS, `F` = FAIL, `N` = N/A (only when a screen is unreachable at that width).

> A phase cannot be finally approved with unresolved major responsive FAIL states.
> Filled in after Phase 10 (Tablet optimization) and Phase 11 (Accessibility hardening).

**Phase 6 note (2026-08-31):** the structural tablet work (`>=900px` left-rail nav replacing
the fixed bottom tab bar on every `TabsLayout`/`PdpLayout` screen; `>=768px` gallery/details
split on the PDP; `>=1024px` items/summary split on Cart) was implemented and live-verified
in-browser at 390 / 768 / 834 / 1024 / 1200 for Accueil, Résultats de recherche, Fiche produit,
and Panier - the rows above are marked PASS at the widths actually checked. Every other screen
inherits the same rail-nav/token-driven fluid layout system (no per-screen structural change was
needed) but was not individually walked through the full matrix in this pass; remaining `·`
cells are PENDING, not FAIL, and should be swept before Phase 10/11 sign-off.
