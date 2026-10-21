# 02 · Route and component inventory

Source: `src/app/AppRouter.tsx` (React Router 6 `createBrowserRouter`). Stack: Vite 5, React 18, TypeScript, CSS Modules, lucide-react, swiper, recharts. **Not Next.js:** the Blueprint's planned stack was not migrated.

## 1. Routes (46 audited, including the 404)

Layouts: **OB** = OnboardingLayout. **DL** = DetailLayout (standalone, own header, desktop card). **TL** = TabsLayout (commerce header plus nav). **TL+DL** = TabsLayout with nested `DetailLayout bare`. **PDP** = PdpLayout.
Desktop width (≥1024px): **full** = 1280px content, **narrow** = 760px column, **card** = 440px centred card.

| Route | Page | Layout | Desktop width | Auth in demo | Spec surface |
|---|---|---|---|---|---|
| `/`, `/onboarding` | OnboardingPage | OB | two-column panel (1040) | none | Public |
| `/login` | LoginPage | DL | card | none | Auth (spec: OTP) |
| `/register` | RegisterPage | DL | card | none | Auth |
| `/forgot-password`, `/verify-code`, `/reset-password`, `/reset-success` | password reset flow | DL | card | none | Auth (not in spec: OTP has no passwords) |
| `/profile-setup` | BusinessProfilePage | DL | card | none | Business customer |
| `/filters` | FiltersPage | none (standalone) | 480 column | none | Catalog filter sheet (IDI-019) |
| `/home` | HomePage | TL | full | none | Accueil |
| `/categories` | CategoriesPage | TL | full | none | Produits |
| `/search` | SearchPage | TL | full | none | Recherche |
| `/search/results` | SearchResultsPage | TL+DL | full | none | Recherche |
| `/products` | AllProductsPage | TL | full | none | Produits |
| `/product/:id` | ProductDetailPage | PDP | full | none | Fiche produit |
| `/product/:id/specs` | ProductSpecsPage | TL+DL | full | none | Fiche produit |
| `/compare` | ComparePage | TL+DL | full | none | Spec: Later (Overview §5) |
| `/rfq/new` | RequestQuotePage | TL+DL | narrow | none | Demande sur mesure |
| `/rfq/received` | QuoteReceivedPage | TL+DL | narrow | none | Demande reçue |
| `/cart` | CartPage | TL+DL | full (split 2fr/1fr) | none | Panier |
| `/checkout/review` | OrderReviewPage | TL+DL | narrow | none | Devis / récapitulatif |
| `/checkout/payment` | PaymentPage | TL+DL | narrow | none | Paiement |
| `/checkout/confirmation` | OrderConfirmationPage | TL+DL | narrow | none | Paiement soumis |
| `/orders` | OrdersPage | TL | full | none | Commandes |
| `/orders/:id` | OrderTrackingPage | TL+DL | narrow | none | Suivi |
| `/orders/:id/qc` | QualityControlPage | TL+DL | full | none | Contrôle qualité |
| `/messages` | MessagesPage | TL | full | none | Messages |
| `/messages/:id` | MessageThreadPage | TL+DL | narrow | none | Conversation |
| `/notifications` | NotificationsPage | TL+DL | narrow | none | Notifications |
| `/dashboard` | DashboardPage | TL | full | none | Business dashboard (spec: "basic dashboard"; customer-side) |
| `/profile` | ProfilePage | TL | full (two columns) | none | Profil |
| `/profile/edit`, `/settings`, `/settings/personal`, `/settings/security` | settings | TL+DL | narrow | none | Profil / Sécurité |
| `/addresses`, `/addresses/new`, `/addresses/:id/edit` | addresses | TL+DL | narrow | none | Profil |
| `/payment-methods` | PaymentMethodsPage | TL+DL | narrow | none | Paiements hub (MS-PAY-05) |
| `/favorites`, `/coupons`, `/reviews` | lists | TL+DL | full | none | Profil |
| `/help`, `/contact`, `/about` | support | TL+DL | narrow | none | Support (MS-MSG-04) |
| `/image-search` | ImageSearchPage | TL+DL | full | none | MS-CAT-08 helper |
| `*` | NotFoundPage | DL | card | none | |

**Route guards:** none. `AuthProvider` is an in-memory mock (`mock-token`), and every route is reachable without signing in. No roles exist.

**Admin / operator routes:** **none**. The spec's `/admin` console (tableau-de-bord, demandes, devis, paiements, commandes, achats, qc, expeditions, catalogue, clients, tarifs, rapports, parametres) is entirely unimplemented. That means no admin audit was possible (see U-08).

## 2. Components

**Layouts (`src/layouts`):** RootLayout (skip link, offline banner, `<main>`), OnboardingLayout, DetailLayout (`bare`, new `width` prop), TabsLayout (bottom bar / rail / **desktop shell**), PdpLayout (same three modes).

**Composite (`src/components/composite`):** BottomNav, LeftRailNav, **DesktopNav (new)**, **SiteFooter (new)**, CommerceHeader (reworked into a grid), DetailCommerceHeader, HeroCarousel, ProductCard, SearchBar, CartButton, NotificationButton, UserChip, DeliveryContext, ChipFilterGroup, NavRow, PersonalInfoForm, QuantityStepper, StarRating (no longer used on the PDP or search), StickyActionBar, TrustBadge, OfflineBanner, `navTabs.ts`.

**Primitives (`src/components/primitives`):** Brand, Button, Card, Chip, Divider, EmptyState, IconButton, IconRender, Image, Input, PasswordInput, PriceDisplay, Section, SectionHeader, Skeleton, Spinner, Switch. **UI:** Toast.

**State (`src/state`):** Auth, Cart, Checkout, Favorites, Addresses, Locale, Offline providers. Fixtures: catalog, orders, messages, notifications, coupons, reviews, rating, maliRegions.
**Domain (`src/domain`):** pricing (customer total only, no internal costs exported), transport, **format (new)**.

## 3. Mock functionality (inspected before any change)

| Area | Behaviour | Persisted |
|---|---|---|
| Auth | Any credentials succeed after 300 ms. Session in React state | No |
| Cart, favorites, addresses, payment method | Client state | localStorage |
| Checkout | Plan, transport and method in context. "Confirmer et payer" navigates to confirmation; nothing is charged | No |
| Orders, messages, notifications, coupons, reviews | Static fixtures | No |
| Ratings | `getRating(id)` = deterministic hash (IDI-021). **No longer displayed** | n/a |
| Onboarding completion | **New:** `mc.onboarding.done` | localStorage |
