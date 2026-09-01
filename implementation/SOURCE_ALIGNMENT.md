# Source Alignment

> Cross-walk from blueprint documents to the React code structure that will implement them.

---

## 1. Design system → CSS variables (`src/styles/tokens.css`)

| Blueprint section | Token |
|-------------------|-------|
| `05_DESIGN_SYSTEM.md` § 2 (Colour) | `--mc-red`, `--mc-red-deep`, `--mc-red-tint`, `--ink`, `--slate`, `--border`, `--surface`, `--white`, `--success`, `--warning`, `--info` |
| `05_DESIGN_SYSTEM.md` § 3 (Typography) | `--font-size-display-lg`, `--font-size-display-md`, `--font-size-title-lg`, `--font-size-title-md`, `--font-size-body-lg`, `--font-size-body`, `--font-size-caption`, `--font-size-overline` |
| `05_DESIGN_SYSTEM.md` § 4 (Spacing) | `--space-1` … `--space-18` |
| `05_DESIGN_SYSTEM.md` § 5 (Radius) | `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-full` |
| `05_DESIGN_SYSTEM.md` § 6 (Elevation) | `--elev-0`, `--elev-1`, `--elev-2`, `--elev-3` |
| `06_LAYOUT_AND_SPACING_SYSTEM.md` § 1 (Gutter) | `--page-gutter` (responsive via media query) |
| `06_LAYOUT_AND_SPACING_SYSTEM.md` § 7 (Sticky bar) | `--sticky-bar-height: 72px` |
| `06_LAYOUT_AND_SPACING_SYSTEM.md` § 6 (Bottom nav) | `--bottom-nav-height: 64px` |
| `06_LAYOUT_AND_SPACING_SYSTEM.md` § 2 (App bar) | `--app-bar-height: 56px`, `--app-bar-height-with-tabs: 88px` |

## 2. Components → file map

| Layer | Blueprint component | File |
|-------|---------------------|------|
| Primitives | `Icon`, `Text`, `Divider`, `Surface`, `Box`, `Stack`, `Spacer`, `Badge` | `src/components/primitives/*` |
| UI | `Button`, `TextField`, `Chip`, `Switch`, `Checkbox`, `Radio`, `Avatar`, `Toast`, `Skeleton`, `Tabs`, `Badge`, `BottomSheet`, `Modal`, `Tooltip`, `Spinner`, `ProgressBar`, `QuantitySelector`, `Image` | `src/components/ui/*` |
| Composite | `ProductCard`, `SearchBar`, `OrderCard`, `CostBreakdown`, `PriceTierTable`, `StatusChip`, `CategoryTile`, `NotificationItem`, `KPIValue`, `AddressCard`, `PaymentOption`, `MessageThread`, `EmptyState`, `LanguageOption`, `Rating` | `src/components/composite/*` |
| Feature | `ProductGallery`, `LandedCostPanel`, `RFQForm`, `CheckoutSummary`, `OrderTrackingTimeline`, `QualityInspectionPanel`, `AnalyticsSummary`, `OnboardingCarousel`, `OTPForm`, `BusinessProfileForm`, `FilterSheet`, `ImageSearchCapture`, `ComparisonTable`, `QuoteResponse`, `OrderConfirmation` | `src/features/*/components/*` |

## 3. Routes → file map

| Screen | Blueprint | Route | File |
|--------|-----------|-------|------|
| 01 | Onboarding & language | `/onboarding` | `src/routes/Onboarding.tsx` |
| 02 | Connexion | `/login` | `src/routes/Login.tsx` |
| 03 | Profil entreprise | `/profile-setup` | `src/routes/BusinessProfile.tsx` |
| 04 | Accueil | `/(tabs)/home` | `src/routes/Home.tsx` |
| 05 | Toutes les catégories | `/(tabs)/categories` | `src/routes/Categories.tsx` |
| 06 | Recherche active | `/(tabs)/search` | `src/routes/Search.tsx` |
| 07 | Résultats de recherche | `/search/results` | `src/routes/SearchResults.tsx` |
| 08 | Filtres | `/search/filters` (bottom sheet) | `src/components/feature/FilterSheet.tsx` |
| 09 | Recherche par image | `/image-search` | `src/routes/ImageSearch.tsx` |
| 10 | Fiche produit | `/product/:id` | `src/routes/ProductDetail.tsx` |
| 11 | Spécifications & paliers | `/product/:id/specs` | `src/routes/ProductSpecs.tsx` |
| 12 | Coût rendu Bamako | `/product/:id/landed-cost` | `src/routes/LandedCost.tsx` |
| 13 | Comparer | `/compare` | `src/routes/Compare.tsx` |
| 14 | Demander un devis | `/product/:id/rfq` | `src/routes/RequestQuote.tsx` |
| 15 | Panier | `/cart` | `src/routes/Cart.tsx` |
| 16 | Récapitulatif | `/checkout/review` | `src/routes/OrderReview.tsx` |
| 17 | Paiement | `/checkout/payment` | `src/routes/Payment.tsx` |
| 18 | Commande confirmée | `/checkout/confirmation` | `src/routes/OrderConfirmation.tsx` |
| 19 | Devis reçu | `/rfq/:id/received` | `src/routes/QuoteReceived.tsx` |
| 20 | Mes commandes | `/(tabs)/orders` | `src/routes/Orders.tsx` |
| 21 | Suivi de commande | `/orders/:id/tracking` | `src/routes/OrderTracking.tsx` |
| 22 | Rapport QC | `/orders/:id/qc` | `src/routes/QualityControl.tsx` |
| 23 | Messages | `/(tabs)/messages` | `src/routes/Messages.tsx` |
| 24 | Tableau de bord entreprise | `/(tabs)/dashboard` | `src/routes/Dashboard.tsx` |

Bottom-nav routes are nested under `/(tabs)/...`. Detail / form routes are siblings.

---

## 4. State → implementation

| Blueprint state family | Implementation |
|------------------------|----------------|
| Auth | React Context (`AuthProvider`) - session, company, refresh |
| Catalog | Mock-backed hook (`useCatalog`) - read-only |
| Discovery | React Context (`DiscoveryProvider`) - recent searches, suggestions, filters |
| Cart | React Context (`CartProvider`) + `localStorage` persistence |
| RFQ | React Context (`RFQProvider`) - mock server-backed |
| Orders | React Context (`OrdersProvider`) - mock |
| Messages | React Context (`MessagesProvider`) - mock |
| Notifications | React Context (`NotificationsProvider`) - mock |
| Analytics | React Context (`AnalyticsProvider`) - mock |
| Localization | React Context (`LocaleProvider`) + `localStorage`; `fr-ML` default |
| UI (ephemeral) | Component-local state + small Contexts for cross-cutting (sheet open, modal open) |
| Form (ephemeral) | Component-local state with custom `useFormDraft` hook for ≥ 4-field forms |

No backend. All mocks live in `src/data/mock/`.

---

## 5. Bottom-nav hide rule → route layout

Routes that hide the bottom nav are wrapped in `<DetailLayout>` (sticky CTA + no nav).
Routes that show the bottom nav are wrapped in `<TabsLayout>` (nav present, no sticky CTA).

| Route | Layout |
|-------|--------|
| `/onboarding` | OnboardingLayout (no nav, no header) |
| `/login` | DetailLayout |
| `/profile-setup` | DetailLayout |
| `/(tabs)/home` | TabsLayout |
| `/(tabs)/orders` | TabsLayout |
| `/(tabs)/search` | TabsLayout |
| `/(tabs)/messages` | TabsLayout |
| `/(tabs)/dashboard` | TabsLayout |
| `/(tabs)/profile` | TabsLayout |
| `/product/:id` | DetailLayout |
| `/product/:id/specs` | DetailLayout |
| `/product/:id/landed-cost` | DetailLayout |
| `/product/:id/rfq` | DetailLayout |
| `/compare` | DetailLayout |
| `/cart` | DetailLayout |
| `/checkout/*` | DetailLayout |
| `/orders/:id/tracking` | DetailLayout |
| `/orders/:id/qc` | DetailLayout |
| `/rfq/:id/received` | DetailLayout |
| `/image-search` | DetailLayout (full-screen modal) |

---

## 6. Acceptance

`/src` is structured exactly as `§ 3` and `§ 5`. Routing, layout, components, and state map 1:1
to blueprint sections. Any drift is recorded in `DEVIATION_REGISTER.md`.
