# 03 - Information Architecture

> Modules, sections, and content grouping across the M&C Connect mobile product.

---

## 1. Top-level IA

```
M&C Connect
├── Access
│   ├── 01 Onboarding & language
│   ├── 02 Connexion (login)
│   └── 03 Profil entreprise
├── Discovery
│   ├── 04 Accueil (Home)
│   ├── 05 Toutes les catégories
│   ├── 06 Recherche active
│   ├── 07 Résultats de recherche
│   ├── 08 Filtres
│   └── 09 Recherche par image
├── Product Decision
│   ├── 10 Fiche produit
│   ├── 11 Spécifications & paliers
│   ├── 12 Coût rendu Bamako
│   ├── 13 Comparer
│   └── 14 Demander un devis (RFQ)
├── Commerce
│   ├── 15 Panier
│   ├── 16 Récapitulatif
│   ├── 17 Paiement
│   ├── 18 Commande confirmée
│   └── 19 Devis reçu
├── Fulfillment
│   ├── 20 Mes commandes
│   ├── 21 Suivi de commande
│   └── 22 Rapport de contrôle qualité
└── Relationship
    ├── 23 Messages
    └── 24 Tableau de bord entreprise
```

## 2. Module rules

| Module | Owns | Never contains |
|--------|------|----------------|
| Access | Auth state, company profile state | Product catalog, order data |
| Discovery | Search state, suggestion state, filter state | Cart, payment |
| Product Decision | Product detail state, comparison state, RFQ draft state | Order placement |
| Commerce | Cart state, checkout draft state, payment selection | Tracking, QC |
| Fulfillment | Order list state, tracking state, QC report state | Discovery |
| Relationship | Messaging state, dashboard metrics | Cart, checkout |

## 3. Bottom-nav destination ownership

| Tab | Owns |
|-----|------|
| Accueil | 04 Home (entry point) |
| Commandes | 20 Mes commandes · 21 Suivi · 22 QC |
| Produits | 05 Catégories · 06 Recherche · 07 Résultats · 08 Filtres · 09 Image |
| Messages | 23 Messages |
| Profil | 03 Profil entreprise · settings · support · language switch |

---

## 4. Content priority per screen

### Home
1. Search / image search
2. Current order status
3. Categories
4. Recommendations
5. Recent activity

### Product detail
1. Gallery
2. Title + price + MOQ
3. Primary CTA (Add to cart / Demander un devis)
4. Tier pricing
5. Specifications
6. Landed cost preview
7. Description
8. Similar products

### Order review
1. Cart lines summary
2. Shipping address
3. Shipping option
4. Cost breakdown
5. Payment selection
6. Place order

### Order tracking
1. Status header
2. Visual timeline
3. Current step emphasis
4. Last update timestamp
5. Next-step copy
6. Contact support entry

### Business dashboard
1. Period selector
2. KPI tiles (spend, orders, delivered, pending)
3. Trend line
4. Category distribution
5. Recent orders
6. Insights / actions

---

## 5. Sticky-action rules

| Screen | Sticky action | Position |
|--------|---------------|----------|
| Fiche produit | Add to cart / Demander un devis | Bottom, above bottom nav |
| Panier | Passer à la commande | Bottom, above bottom nav |
| Récapitulatif | Confirmer et payer | Bottom, above bottom nav |
| Recherche active | Camera / submit | In input bar |
| Filtres | Apply filters | Bottom sheet CTA |
| Demander un devis | Submit RFQ | Bottom, above bottom nav |
| Comparer | Continuer / Demander devis | Bottom, above bottom nav |

---

## 6. Modal and sheet inventory

| Pattern | Used on |
|---------|---------|
| Bottom sheet - filter | 08 |
| Bottom sheet - quantity picker | 10, 11, 15 |
| Bottom sheet - payment option | 17 |
| Modal - image viewer | 10 |
| Modal - language picker | 01, settings |
| Modal - OTP input | 02 |
| Modal - share / forward | 10, 22 |
| Bottom sheet - sort | 07 |
| Modal - full-screen image search | 09 |

---

## 7. Empty / boundary IA

| Surface | Empty content |
|---------|---------------|
| Home (no orders) | "Aucune commande en cours" + CTA "Découvrir les produits" |
| Mes commandes (no orders) | Friendly copy + CTA "Voir les catégories" |
| Panier (empty) | Illustration + "Votre panier est vide" + CTA "Continuer mes achats" |
| Recherche (no results) | "Aucun produit ne correspond" + suggestion chips |
| Filtres (no active) | Default state shows full category list |
| Messages (no threads) | "Aucun message pour le moment" |
| Tableau de bord (no orders yet) | KPI tiles show 0 + insight "Vos premières commandes apparaîtront ici" |
| Suivi (no orders) | Redirect to Mes commandes |
| Notifications | Empty state |

## 8. Cross-screen data dependencies

```
01 → 02 → 03 → 04 (Home)
04 → 05, 06, 07, 08, 09
07 → 10 (PDP)
10 → 11, 12, 13, 14, 15
15 → 16 → 17 → 18
14 → 19
03 → 20 → 21 → 22
20/21 → 23
20 → 24
```

## 9. Information density rules

- Mobile screens should never exceed **6 primary content regions** stacked vertically.
- A horizontal scroll is acceptable for: image gallery, related products, category strip, recent orders, KPI tiles.
- Always include a back affordance above any non-tab screen.
- No screen may exit directly to a deep-link without an explicit landing confirmation (in-app browser sheet).

## 10. Decisions

See `21_DECISIONS.md` for IA-specific decisions.