# Test Matrix

> Test type and minimum coverage per screen and per system.

---

## 1. Test types

| Type | Tool | Scope |
|------|------|-------|
| Unit | Vitest | Pure functions (price formatter, MOQ validator, draft autosave) |
| Component | @testing-library/react | Renders correctly with props; state changes |
| Snapshot | Vitest snapshot | Lock layout for canonical components |
| Hook | @testing-library/react-hooks | `useCart`, `useFormDraft`, `useOrders` |
| Integration | Vitest + MemoryRouter | Flow: cart → checkout → confirmation |
| Visual (manual) | chrome-devtools-mcp / playwright | Per viewport per screen |
| Accessibility | axe-core via @axe-core/react | Critical and serious violations must be 0 |

## 2. Minimum per-screen coverage

| # | Screen | Unit | Component | Visual | A11y |
|---|--------|------|-----------|--------|------|
| 01 | Onboarding | - | ✓ | ✓ | ✓ |
| 02 | Connexion | ✓ (OTP validation) | ✓ | ✓ | ✓ |
| 03 | Profil entreprise | ✓ | ✓ | ✓ | ✓ |
| 04 | Accueil | - | ✓ | ✓ | ✓ |
| 05 | Toutes les catégories | - | ✓ | ✓ | ✓ |
| 06 | Recherche active | ✓ (debounce) | ✓ | ✓ | ✓ |
| 07 | Résultats de recherche | ✓ (filter state) | ✓ | ✓ | ✓ |
| 08 | Filtres | ✓ | ✓ | ✓ | ✓ |
| 09 | Recherche par image | - | ✓ | ✓ | ✓ |
| 10 | Fiche produit | ✓ (tier calc) | ✓ | ✓ | ✓ |
| 11 | Spécifications & paliers | ✓ | ✓ | ✓ | ✓ |
| 12 | Coût rendu Bamako | ✓ (cost calc) | ✓ | ✓ | ✓ |
| 13 | Comparer | ✓ | ✓ | ✓ | ✓ |
| 14 | Demander un devis | ✓ | ✓ | ✓ | ✓ |
| 15 | Panier | ✓ (cart reducer) | ✓ | ✓ | ✓ |
| 16 | Récapitulatif | ✓ | ✓ | ✓ | ✓ |
| 17 | Paiement | ✓ | ✓ | ✓ | ✓ |
| 18 | Commande confirmée | - | ✓ | ✓ | ✓ |
| 19 | Devis reçu | ✓ | ✓ | ✓ | ✓ |
| 20 | Mes commandes | ✓ | ✓ | ✓ | ✓ |
| 21 | Suivi de commande | ✓ (status mapping) | ✓ | ✓ | ✓ |
| 22 | Rapport QC | ✓ | ✓ | ✓ | ✓ |
| 23 | Messages | ✓ | ✓ | ✓ | ✓ |
| 24 | Tableau de bord entreprise | ✓ (KPI calc) | ✓ | ✓ | ✓ |

## 3. Mandatory unit-test suite (independent of screen)

- `formatPrice(xof)` - never decimals; locale separator.
- `formatDate(date, locale)` - `25 août 2026` for `fr-ML`.
- `formatPhone('+223...')` - `+223 XX XX XX XX`.
- `meetsMOQ(qty, moq)` - boolean + suggested increment.
- `computeLandedCost({ product, qty, destination, fees })` - full breakdown with totals.
- `applyTierPricing(qty, tiers[])` - selected tier.
- `cartTotals(lines[])` - subtotal, fees, total.
- `reduceOrderEvent(currentState, event)` - order state machine.
- `reduceRFQEvent(currentState, event)` - RFQ state machine.
- `useFormDraft(key, value, options)` - auto-save on blur + restore on mount.
