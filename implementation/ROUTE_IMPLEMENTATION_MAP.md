# Route Implementation Map

> Route + layout + sticky-CTA + bottom-nav visibility per screen.

---

## Routes

| # | Screen | Path | Layout | Sticky CTA | Bottom nav |
|---|--------|------|--------|------------|------------|
| 01 | Onboarding & language | `/onboarding` | Onboarding | - | hidden |
| 02 | Connexion | `/login` | Detail | Continue (after OTP) | hidden |
| 03 | Profil entreprise | `/profile-setup` | Detail | Enregistrer | hidden |
| 04 | Accueil | `/(tabs)/home` | Tabs | - | visible |
| 05 | Toutes les catégories | `/(tabs)/categories` | Tabs | - | visible |
| 06 | Recherche active | `/(tabs)/search` | Tabs | - | visible |
| 07 | Résultats de recherche | `/search/results` | Detail | (filter sheet CTA) | hidden |
| 08 | Filtres | `/search/filters` (bottom sheet) | Modal sheet | Apply filters | hidden |
| 09 | Recherche par image | `/image-search` | Detail full-screen | Lancer la recherche | hidden |
| 10 | Fiche produit | `/product/:id` | Detail | Add to cart / Demander un devis | hidden |
| 11 | Spécifications & paliers | `/product/:id/specs` | Detail | Add to cart | hidden |
| 12 | Coût rendu Bamako | `/product/:id/landed-cost` | Detail | Demander un devis | hidden |
| 13 | Comparer | `/compare` | Detail | Continuer / Demander devis | hidden |
| 14 | Demander un devis | `/product/:id/rfq` | Detail | Envoyer la demande | hidden |
| 15 | Panier | `/cart` | Detail | Passer à la commande | hidden |
| 16 | Récapitulatif | `/checkout/review` | Detail | Confirmer et payer | hidden |
| 17 | Paiement | `/checkout/payment` | Detail | Payer maintenant | hidden |
| 18 | Commande confirmée | `/checkout/confirmation` | Detail | Voir mes commandes | hidden |
| 19 | Devis reçu | `/rfq/:id/received` | Detail | Accepter le devis | hidden |
| 20 | Mes commandes | `/(tabs)/orders` | Tabs | - | visible |
| 21 | Suivi de commande | `/orders/:id/tracking` | Detail | Contacter le support | hidden |
| 22 | Rapport QC | `/orders/:id/qc` | Detail | Approuver / Contester | hidden |
| 23 | Messages | `/(tabs)/messages` | Tabs | - | visible |
| 24 | Tableau de bord entreprise | `/(tabs)/dashboard` | Tabs | - | visible |
| + | Profil (settings) | `/(tabs)/profile` | Tabs | - | visible |

## Deep links

| Pattern | Route |
|---------|-------|
| `mc://home` | `/(tabs)/home` |
| `mc://product/:id` | `/product/:id` |
| `mc://order/:id` | `/orders/:id/tracking` |
| `mc://order/:id/qc/:reportId` | `/orders/:id/qc` |
| `mc://category/:slug` | `/(tabs)/categories?cat=:slug` |
| `mc://search?q=...` | `/search/results?q=...` |
| `mc://rfq/:id` | `/rfq/:id/received` |

All deep links land with a loading skeleton; unavailable resources redirect to Home with a toast.

## Phase 2 - Auth cluster (added)

The table above predates the actual router (paths here use path-groups like `/(tabs)/home` that
were never implemented - the real router at `src/app/AppRouter.tsx` uses flat paths, e.g. `/home`,
`/rfq/new`, `/orders/:id/qc`). This section lists the 6 auth routes exactly as registered.

| Screen | Path | Layout | Page component | Primary CTA | Bottom nav |
|---|---|---|---|---|---|
| Connexion (reworked: email+password primary, phone/OTP secondary tab) | `/login` | Detail | `LoginPage` | Se connecter | hidden |
| Créer un compte | `/register` | Detail | `RegisterPage` | S'inscrire | hidden |
| Mot de passe oublié | `/forgot-password` | Detail | `ForgotPasswordPage` | Envoyer le code | hidden |
| Vérification (6-digit code) | `/verify-code` | Detail | `VerifyCodePage` | Confirmer | hidden |
| Nouveau mot de passe | `/reset-password` | Detail | `ResetPasswordPage` | Enregistrer | hidden |
| Confirmation | `/reset-success` | Detail (no back button) | `ResetSuccessPage` | Se connecter | hidden |

All 6 are lazy-loaded via `lazy()` + `withSuspense()` in `AppRouter.tsx`, following the existing
pattern exactly, and registered as top-level `RootLayout` children (not under `TabsLayout`), per
§4.4 of the execution prompt.

Flow: `/login` → `/forgot-password` → `/verify-code` → `/reset-password` → `/reset-success` →
`/login`. `location.state.email` carries the address across `/forgot-password` → `/verify-code`
→ `/reset-password` (no new global state - a transient, page-to-page-only value).

## Phase 3 - Profile cluster (added)

15 new routes plus a rework of `/profile`, all registered under `TabsLayout` (`DetailLayout bare`,
CommerceHeader + BottomNav stay visible, matching every other detail screen in this app - none of
this app's routes currently hide the bottom nav, so this phase doesn't introduce an inconsistency).

| Screen | Path | Page component | Primary CTA |
|---|---|---|---|
| Profil (reworked) | `/profile` | `ProfilePage` | Se déconnecter |
| Modifier le profil | `/profile/edit` | `ProfileEditPage` | Enregistrer les modifications |
| Paramètres | `/settings` | `SettingsPage` | Déconnexion |
| Informations personnelles | `/settings/personal` | `SettingsPersonalPage` | Enregistrer les modifications |
| Sécurité | `/settings/security` | `SettingsSecurityPage` | Enregistrer |
| Mes adresses | `/addresses` | `AddressesPage` | + Ajouter |
| Ajouter une adresse | `/addresses/new` | `AddressFormPage` | Enregistrer |
| Modifier une adresse | `/addresses/:id/edit` | `AddressFormPage` (shared) | Enregistrer |
| Moyens de paiement | `/payment-methods` | `PaymentMethodsPage` | (selection, no submit) |
| Favoris | `/favorites` | `FavoritesPage` | (remove via heart toggle) |
| Coupons | `/coupons` | `CouponsPage` | (tabs: Actifs/Utilisés/Expirés) |
| Mes avis | `/reviews` | `ReviewsPage` | - |
| Retours et remboursements | `/returns` | `ReturnsPage` | - |
| Centre d'aide | `/help` | `HelpPage` | Contactez-nous |
| Contactez-nous | `/contact` | `ContactPage` | Envoyer le message |
| À propos | `/about` | `AboutPage` | - |

New shared state (all client-side, `localStorage`-persisted): `FavoritesProvider`,
`AddressesProvider`. New shared UI: `NavRow`/`NavRowList` (extracted from the old `ProfilePage`,
now reused across Profile/Settings/Addresses/Payment methods), `PersonalInfoForm` (shared by
`/profile/edit` and `/settings/personal`).

`BottomNav`'s "Profil" tab `match` array was extended to cover `/settings`, `/addresses`,
`/payment-methods`, `/favorites`, `/coupons`, `/reviews`, `/returns`, `/help`, `/contact`, `/about`
- otherwise none of these sub-pages would have highlighted any tab as active.

## Phase 4 - Commerce and messaging gaps (added)

| Screen | Path | Layout | Page component | Primary CTA |
|---|---|---|---|---|
| Tous les produits | `/products` | Tabs (plain, own in-page header) | `AllProductsPage` | (heart toggle / filter icon) |
| Filtres | `/filters` | Top-level (outside TabsLayout - modal takeover, `role="dialog"`) | `FiltersPage` | Appliquer |
| Conversation | `/messages/:id` | Tabs / Detail bare | `MessageThreadPage` | Envoyer |
| Notifications | `/notifications` | Tabs / Detail bare | `NotificationsPage` | (tabs; no single CTA) |

`/filters` is registered as a sibling of `/login`/`/profile-setup` (outside `TabsLayout`) so it
renders as a full takeover with no `CommerceHeader`/`BottomNav` behind it, matching its
`role="dialog" aria-modal="true"` semantics from `blueprint/screens/08_FILTERS.md`. It reads an
optional `location.state.{returnTo, search}` (set by the caller's filter-icon button) to
pre-populate from the current query string, and on "Appliquer" navigates to
`${returnTo}?${params}` - wired from both `/search/results` (fixing a previously dead,
mislabeled filter-icon button, B-010) and `/products`. `SearchResultsPage` and `AllProductsPage`
both read `cat`/`verified`/`priceMin`/`priceMax`/`moqMin`/`moqMax`/`sort` from the URL to apply
what the sheet selected (B-011 fixed the `/products` side of this round trip, which initially
ignored everything but `sort`).

`/messages/:id` fixes the dead link from Phase 0 (B-005): `MessagesPage`'s existing
`Link to={`/messages/${c.id}`}` now resolves. `src/state/messages.ts` gained a `messages: ThreadMessage[]`
array per conversation and a `getConversationById` helper.

`NotificationButton.tsx` now navigates to `/notifications` (was `/messages`); `CommerceHeader`'s
unread badge now derives from `src/state/notifications.ts` instead of a hardcoded mock count.
