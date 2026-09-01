# 04 - Navigation Architecture

> Global navigation, stack rules, deep links, modal flows.

---

## 1. Primary navigation (bottom nav)

Five destinations, fixed order:

| Position | Tab | Route | Icon |
|----------|-----|-------|------|
| 1 | Accueil | `/(tabs)/home` | Home |
| 2 | Commandes | `/(tabs)/orders` | Package |
| 3 | Produits | `/(tabs)/products` | Grid |
| 4 | Messages | `/(tabs)/messages` | Chat |
| 5 | Profil | `/(tabs)/profile` | User |

The center "Produits" tab is the catalog entry point, surfacing categories / search / image-search in one tab.

---

## 2. When the bottom nav must disappear

The bottom nav hides on the following screens (replaced by a contextual sticky action or sheet CTA):

- Onboarding (01)
- Login (02)
- Business profile setup (03)
- Product detail (10)
- Specifications & tiers (11)
- Landed cost (12)
- Compare (13)
- Request quote (14)
- Cart (15)
- Order review (16)
- Payment (17)
- Order confirmation (18)
- Quote received (19)
- Order tracking (21)
- Quality inspection report (22)
- Filters bottom sheet (08)
- Image search full-screen (09)
- Any full-screen modal

**Rule:** the bottom nav disappears whenever a contextual sticky CTA or modal owns the screen's primary action, and the user should not be tempted to switch tabs mid-flow.

---

## 3. Top app bar

| Variant | Used on | Contents |
|---------|---------|----------|
| Default back | Detail screens | Back · Title · Contextual action |
| Default close | Modal screens | Close · Title · Contextual action |
| Transparent overlay | Image gallery | Back only, floating on image |
| Search | 06 Recherche | Search input · Voice · Camera |
| Sticky with tabs | 20 Mes commandes · 05 Catégories | Back · Title · Tab strip |

Height: **56 dp** baseline. With tabs: **88 dp**.

Safe-area top padding respects status bar.

---

## 4. Sticky bottom action bar

Used when a single dominant CTA must remain available while content scrolls.

| Property | Value |
|----------|-------|
| Height | 72 dp + safe area bottom |
| Padding | 16 horizontal · 12 vertical |
| Background | White with top hairline border |
| CTA button | Full-width primary |
| Optional secondary text-link | Top-right above CTA in some screens |

Safe-area bottom padding prevents overlap with iOS home indicator / Android gesture bar.

---

## 5. Back-navigation rules

1. Hardware back on Android mirrors in-app back behaviour.
2. In-app back returns to the previous screen in the stack.
3. From Home, back exits the app.
4. From any modal/sheet, back dismisses the sheet first, then navigates.
5. Confirmation prompts appear before any destructive exit (clear cart, abandon quote).
6. Tab navigation never adds a back-stack entry - tapping a tab resets that tab to its root.

---

## 6. Deep linking

The blueprint plans for the following deep-link conventions (router-agnostic):

| Pattern | Screen |
|---------|--------|
| `mc://product/:id` | Fiche produit |
| `mc://order/:id` | Suivi de commande |
| `mc://order/:id/qc/:reportId` | Rapport QC |
| `mc://category/:slug` | Toutes les catégories (filtered) |
| `mc://search?q=...` | Recherche active |
| `mc://rfq/:id` | Devis reçu |
| `mc://home` | Accueil |

Deep links land on the requested screen with a loading skeleton; if the resource is unavailable, they redirect to a generic empty state with a CTA back to Home.

---

## 7. Modal flows vs. pushed screens

| Behaviour | Modal | Pushed |
|-----------|-------|--------|
| Bottom nav | Hidden | Visible (unless on hide list) |
| Back | Dismiss | Pop stack |
| Tab switch | Disallowed while open | Allowed |
| Use cases | OTP, language picker, image viewer, payment selection | All detail, list, form screens |

---

## 8. Bottom sheet rules

- Drag handle visible at top.
- Rounded top corners (radius 16).
- Three snap points: collapsed (peek) · half · full.
- Backdrop scrim dims content to 60% opacity.
- Sheets should never stack more than 2 deep.

---

## 9. Onboarding navigation

| Step | Next | Back |
|------|------|------|
| Language picker (01) | Login (02) | n/a |
| Login (02) | OTP modal → Profile setup (03) | Language picker |
| Profile setup (03) | Home (04) | Login |

---

## 10. Search flow navigation

```
04 Home (search input)
   ↓ submit
07 Résultats
   ↓ filter tap
08 Filtres (bottom sheet)
   ↓ apply
07 Résultats (filtered)
   ↓ product tap
10 Fiche produit
   ↓
11 / 12 / 13 / 14
```

---

## 11. Checkout flow navigation

```
10 Fiche produit → 15 Panier (via "Ajouter au panier")
15 Panier → 16 Récapitulatif
16 Récapitulatif → 17 Paiement
17 Paiement → 18 Commande confirmée
18 → 04 Home (and/or 20 Mes commandes)
```

Alternative RFQ path:

```
10 Fiche produit → 14 Demander un devis → (pending) → 19 Devis reçu (when M&C responds)
```

---

## 12. Decisions

See `21_DECISIONS.md` for nav-specific decisions. Notable:

- D-N01 Bottom nav hides on any sticky-CTA screen to prevent tab mid-flow.
- D-N02 Sticky CTA uses 72 dp + safe area.
- D-N03 Tab switch resets the tab to its root.
- D-N04 Deep links always show loading skeleton first; never block the UI indefinitely.