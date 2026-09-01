# Accessibility Matrix

> Per-screen a11y status. PENDING until Phase 11.

---

| # | Screen | Touch ≥ 44dp | Contrast AA | Focus order | Single h1 | Semantic form | ARIA | Reduced motion | Dynamic type 200% | Status |
|---|--------|--------------|-------------|-------------|-----------|---------------|------|----------------|-------------------|--------|
| 01 | Onboarding | · | · | · | · | n/a | · | · | · | PENDING |
| 02 | Connexion | · | · | · | · | · | · | · | · | PENDING |
| 03 | Profil entreprise | · | · | · | · | · | · | · | · | PENDING |
| 04 | Accueil | · | · | · | · | n/a | · | · | · | PENDING |
| 05 | Toutes les catégories | · | · | · | · | n/a | · | · | · | PENDING |
| 06 | Recherche active | · | · | · | · | n/a | · | · | · | PENDING |
| 07 | Résultats de recherche | · | · | · | · | n/a | · | · | · | PENDING |
| 08 | Filtres (sheet) | · | · | · | · | · | · | · | · | PENDING |
| 09 | Recherche par image | · | · | · | · | n/a | · | · | · | PENDING |
| 10 | Fiche produit | · | · | · | · | n/a | · | · | · | PENDING |
| 11 | Spécifications & paliers | · | · | · | · | n/a | · | · | · | PENDING |
| 12 | Coût rendu Bamako | · | · | · | · | n/a | · | · | · | PENDING |
| 13 | Comparer | · | · | · | · | n/a | · | · | · | PENDING |
| 14 | Demander un devis | · | · | · | · | · | · | · | · | PENDING |
| 15 | Panier | · | · | · | · | n/a | · | · | · | PENDING |
| 16 | Récapitulatif | · | · | · | · | · | · | · | · | PENDING |
| 17 | Paiement | · | · | · | · | · | · | · | · | PENDING |
| 18 | Commande confirmée | · | · | · | · | n/a | · | · | · | PENDING |
| 19 | Devis reçu | · | · | · | · | n/a | · | · | · | PENDING |
| 20 | Mes commandes | · | · | · | · | n/a | · | · | · | PENDING |
| 21 | Suivi de commande | · | · | · | · | n/a | · | · | · | PENDING |
| 22 | Rapport QC | · | · | · | · | n/a | · | · | · | PENDING |
| 23 | Messages | · | · | · | · | n/a | · | · | · | PENDING |
| 24 | Tableau de bord entreprise | · | · | · | · | n/a | · | · | · | PENDING |

## Per-component rules

From `11_ACCESSIBILITY_PLAN.md`:

- Every interactive element ≥ 44 × 44 dp.
- Visible focus ring: 2 px `--mc-red` outline at 2 px offset.
- Single `<h1>` per page.
- Forms: visible label above, helper below, error below helper, `aria-describedby` linking the input.
- Required fields marked with both `aria-required="true"` and a visible asterisk.
- Image `alt`:
  - Product photo: `"{name} - {category}"`
  - Category icon: `"{category name}"`
  - Decorative illustration: `alt=""`
  - Status icon: status label
  - Logo: `"M&C Connect"`
- Status uses `StatusChip` (icon + label + colour tone). Never colour-only.
- `prefers-reduced-motion: reduce` disables parallax / large transitions / auto-advance.
- Dynamic type scales to 200% without overflow; product grid reflows to single column at extreme scales.
- Esc closes modals / bottom sheets; Enter submits forms.
