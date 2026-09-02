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

## Phase 7 audit (2026-09-01)

Ran a real Lighthouse (axe-core 4.12) accessibility audit via `chrome-devtools-mcp` against the
production build (`vite build` + `vite preview`, not the dev server) for Home and Product Detail,
plus a manual dev-mode `@axe-core/react` sweep (page-has-heading-one) across every route. Found
and fixed real, concrete issues rather than a self-graded checklist:

- **Missing `<h1>`** on Home, Search (active), Orders, Messages, Image Search - these are the
  `TabsLayout` children that render outside `DetailLayout`'s title slot, so none of them had a
  page-level heading. Added a heading to each (visible where the page has a natural title slot,
  `sr-only` otherwise). See `BUG_REGISTER.md`.
- **`label-content-name-mismatch`** (WCAG 2.5.3 Label in Name) on `UserChip` (guest state:
  visible "Invité", `aria-label="Se connecter"` - completely different text) and
  `DeliveryContext` (`aria-label="Destination de livraison : ..."` didn't literally contain the
  visible "Livraison"/"Destination de livraison" text). Fixed both by dropping the `aria-label`
  override and composing the accessible name from the actual visible content plus a `sr-only`
  suffix instead - can't mismatch what you compute from the content itself.
- **`aria-required-parent`**: `HeroCarousel`'s pagination bullets had `role="tab"` with no
  `role="tablist"` parent (Swiper's pagination container doesn't declare one). Removed the
  stray `role="tab"` - `aria-label` alone is sufficient, Swiper's own `a11y` module already
  announces slide position.
- **`target-size`** (WCAG 2.5.8, ≥24×24px): `HeroCarousel` pagination dots (7px/20px) and
  `ProductDetailPage` gallery dots (6px/18px) had touch targets far under the minimum. Fixed both
  by keeping the small visible dot as a centered `::after` pseudo-element inside a real 24×24
  button box, rather than sizing the button itself to the visible dot.
- Duplicate/dynamic `<h1>`: `HeroCarousel`'s slide title was an `<h1 aria-live="polite">` that
  changed on every autoplay tick - both semantically wrong (a page shouldn't have a second,
  autoplay-driven h1) and a noisy live-region pattern. Demoted to `<h2>`, dropped `aria-live`.

**Result:** Lighthouse Accessibility 100/100 on both audited routes (up from 92/97), Best
Practices 100/100, SEO 100/100 (added `public/robots.txt` - was missing entirely). Global
`prefers-reduced-motion` handling (`globals.css`) and landmark uniqueness were already correct
from earlier phases and re-verified clean. Not swept per-route with Lighthouse: the remaining ~30
routes were checked only via the lighter dev-mode `page-has-heading-one` pass (all clean) - a full
per-route Lighthouse sweep with the 8-column matrix above is still PENDING.

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
