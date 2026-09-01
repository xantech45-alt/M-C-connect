# 00 - Master Frontend Blueprint

> Single-page executive summary of the M&C Connect mobile frontend architecture.

---

## 1. Product in one sentence

M&C Connect is a **managed B2B sourcing & import platform** for Malian businesses that turns Chinese manufacturing into a one-app experience - the customer chooses what they need, M&C handles everything else.

## 2. Frontend mission

Communicate five brand attributes through every screen:

| Attribute | What it means in the UI |
|-----------|------------------------|
| **Trust** | Verifiable badges, transparent prices, real photography |
| **Control** | Clear current state, predictable next actions, no hidden flows |
| **Transparency** | Itemised landed-cost, plain order status, no opaque fees |
| **Professionalism** | Restrained accent colour, enterprise density, accessible typography |
| **Import expertise** | Domain-specific copy ("MOQ", "CIF", "landed cost"), trust signals |

## 3. Scope boundary

**Inside the frontend:**

- 24 core screens (onboarding → dashboard)
- 10 user flows
- 4 component layers (Primitive → UI → Composite → Feature)
- 3 locales (fr-ML primary, en, bm)
- 7 viewport widths (320 / 360 / 375 / 390 / 414 / 430 / tablet)
- 1 design system (Inter + M&C Red token family)

**Outside the frontend (handled by other systems):**

- supplier identification / KYC
- supplier communication channels
- customs / HS code calculation
- payment processing
- logistics carrier APIs
- quality inspection reports backend
- AI image search model
- backend / database / API design

## 4. Architectural pillars

1. **Managed commerce** - M&C remains the only commercial touchpoint.
2. **Mobile first** - every layout is designed for a 360–414 px phone first; tablet is graceful growth.
3. **Accent restraint** - Red is an accent, not a background. Target ≤12% screen area.
4. **One primary CTA per screen** - never two competing red actions.
5. **Transparent landed cost** - every fee visible, estimated vs confirmed distinguished.
6. **State-first thinking** - empty, loading, error, offline, success all designed before happy path is finalised.
7. **Locale-first** - French (Mali) is primary; copy length, XOF formatting, Bambara scripts all considered.
8. **Accessibility baseline** - 44 px targets, 4.5:1 contrast, no colour-only meaning.
9. **Component reuse** - 4-layer hierarchy prevents one-off components.
10. **Decision log** - `21_DECISIONS.md` is the canonical record of trade-offs.

## 5. Navigation architecture

Five-tab bottom navigation:

```
ACCUEIL · COMMANDES · PRODUITS · MESSAGES · PROFIL
```

- Bottom nav hides during modal flows (checkout, RFQ, filters, image search, language picker) and reappears when context returns to top-level screens.
- Top app bar carries back, title, contextual action.
- Sticky bottom action bar holds primary CTA on detail / form screens.

## 6. Design tokens at a glance

| Token | Value |
|-------|-------|
| M&C Red | `#C4122F` |
| Deep Red | `#8E0B22` |
| Tint Red | `#FBEAEC` |
| Ink | `#14181D` |
| Slate | `#5C6673` |
| Border | `#E4E7EB` |
| Surface | `#F5F6F8` |
| White | `#FFFFFF` |
| Success | `#1F7A4D` |
| Warning | `#B4700E` |
| Info | `#1B4E7A` |
| Font | Inter |
| Spacing scale | 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 |
| Radius | 4 · 8 · 12 · 16 · 999 |

## 7. Component layers

```
Primitives        Icon, Text, Divider, Surface, Box, Stack
UI                Button, Input, Chip, Badge, Avatar, Switch, Checkbox, Radio, Toast
Composite         ProductCard, SearchBar, OrderCard, CostBreakdown, PriceTierTable, StatusChip, BottomSheet
Feature           ProductGallery, CheckoutSummary, ShipmentTimeline, QualityInspectionPanel, AnalyticsSummary, RFQForm
```

## 8. State architecture

| State family | Examples | Storage (planned) |
|--------------|----------|-------------------|
| Auth | session, profile, company | secure store + refresh |
| Catalog | categories, products, detail, tier pricing | server cache |
| Discovery | recent searches, suggestions, filters | memory + local persistence |
| Cart | line items, MOQ, shipping option | local persistence |
| RFQ | open quotes, history | server cache |
| Orders | list, detail, tracking, status | server cache |
| Messages | threads, unread, attachments | server cache |
| Notifications | alerts, system messages | server cache |
| Analytics | period, metrics, charts | server cache |
| Localization | locale, currency, units | device preference |
| UI | bottom-sheet open, current modal, focus state | ephemeral |
| Form | drafts, validation, dirty flags | ephemeral |

## 9. Screen inventory (24)

| # | Screen | Group | Purpose |
|---|--------|-------|---------|
| 01 | Onboarding & language | Access | Choose locale; introduce managed service |
| 02 | Connexion | Access | Phone + OTP login |
| 03 | Profil entreprise | Access | Company profile setup |
| 04 | Accueil | Discovery | Primary entry; search + order visibility |
| 05 | Toutes les catégories | Discovery | Full category catalog |
| 06 | Recherche active | Discovery | Search bar + suggestions + history |
| 07 | Résultats de recherche | Discovery | Product results list |
| 08 | Filtres | Discovery | Filtering and sorting |
| 09 | Recherche par image | Discovery | Camera / upload → AI match |
| 10 | Fiche produit | Product Decision | Product detail / gallery / CTA |
| 11 | Spécifications & paliers | Product Decision | Specs + MOQ + tier pricing |
| 12 | Coût rendu Bamako | Product Decision | Landed-cost breakdown |
| 13 | Comparer | Product Decision | Side-by-side compare |
| 14 | Demander un devis | Product Decision | RFQ submission |
| 15 | Panier | Commerce | Cart lines + summary |
| 16 | Récapitulatif | Commerce | Order review |
| 17 | Paiement | Commerce | Payment selection |
| 18 | Commande confirmée | Commerce | Confirmation screen |
| 19 | Devis reçu | Commerce | Quote received from M&C |
| 20 | Mes commandes | Fulfillment | Order list |
| 21 | Suivi de commande | Fulfillment | Order tracking |
| 22 | Rapport de contrôle qualité | Fulfillment | QC inspection report |
| 23 | Messages | Relationship | Managed communication |
| 24 | Tableau de bord entreprise | Relationship | Business analytics |

## 10. Flow inventory (10)

`AUTHENTICATION`, `DISCOVERY`, `SEARCH`, `IMAGE_SEARCH`, `PRODUCT_DECISION`, `RFQ`, `CART_CHECKOUT`, `ORDER_TRACKING`, `QUALITY_CONTROL`, `CUSTOMER_SUPPORT`.

## 11. Implementation phases

```
0  Project audit
1  Design tokens
2  Core primitives
3  Navigation & app shell
4  Auth & onboarding
5  Discovery
6  Product experience
7  Quote / cart / checkout
8  Orders / tracking
9  Messages / dashboard / profile
10 Responsive hardening
11 Accessibility hardening
12 Visual QA
13 Integration readiness
```

Each phase has an explicit acceptance gate.

## 12. Top business-model risks

| Risk | Mitigation |
|------|-----------|
| Customer contacts supplier directly | All supplier contact fields omitted from UI; messaging routes through M&C threads only |
| Customer pays supplier directly | Payment screens show only M&C-managed payment methods |
| Customer uses external chat | No external chat icons surfaced; messaging is in-app only |
| Customer sees opaque fees | Landed-cost screen itemises every line and labels estimated vs confirmed |
| Customer confusion about who they buy from | Hero copy on Home and PDP makes M&C the visible counterparty |

## 13. Final acceptance gates

- `/blueprint` exists with all 24 screens + 10 flows + 4 component matrices + 4 state matrices + 6 reviews.
- No application source files were modified.
- No React / JSX / TSX / CSS produced.
- All design tokens documented.
- All business-model safety checks passed.
- Traceability matrix complete.
- Decisions log captures every architectural trade-off.