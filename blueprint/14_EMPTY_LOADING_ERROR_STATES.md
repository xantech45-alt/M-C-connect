# 14 - Empty / Loading / Error States

> Universal state matrix used across all screens.

---

## 1. Loading

### Page-level loading
- Skeleton blocks matching the layout shape (cards, lists, hero).
- Avoid large spinner for > 1.5 s operations; use skeleton.
- Bottom nav / app bar visible.

### Component-level loading
- Buttons: spinner replaces label, button remains the same width.
- Lists: skeleton rows for the first 5 items.
- Image: shimmer placeholder.

### Rules
- Never use blank white screen.
- Skeleton must match the final layout's shape exactly.

## 2. Empty

### Empty list
- Illustration (1:1) - neutral photographic or line illustration.
- Headline: 1 line.
- Body: 1–2 lines explaining the situation.
- Primary CTA: action that resolves the empty state.

Examples:
- Empty cart: "Votre panier est vide" + "Continuer mes achats".
- Empty orders: "Aucune commande" + "Voir les catégories".
- Empty messages: "Aucun message" + "Commencer une conversation".
- Empty search: "Aucun produit ne correspond" + chips of suggested categories.
- Empty notifications: nothing.
- Empty dashboard: zero KPIs + "Vos premières commandes apparaîtront ici".

## 3. Error

### Page-level error
- Banner at top of screen: red background, white text, error icon.
- Body: 1–2 lines, plain language.
- Action: retry.

### Component-level error
- Inline error below input: red text + helper icon.
- Toast: brief auto-dismiss message at top.

### Network error
- Offline banner: "Vous êtes hors ligne. Réessayez plus tard."
- Cached data remains visible.

### Server error
- 5xx: "Une erreur est survenue. Réessayez."
- 4xx with validation: inline error.
- Auth expired: redirect to login with toast "Veuillez vous reconnecter."

## 4. Success

- Toast (auto-dismiss after 3 s) for transient successes.
- Full-screen confirmation for major successes (order placed, RFQ submitted).
- Inline confirmation message for forms.

## 5. Offline

- Banner across the top in `--info` tone: "Vous êtes hors ligne."
- Reads from cache.
- Writes are queued and synced on reconnect.

## 6. Disabled

- Inputs: `--surface` background, `--slate` text, `--border`.
- Buttons: `--surface` background, `--slate` text, no shadow.
- Always visible with a tooltip or helper text explaining why disabled.

## 7. Partial / degraded

- Some data unavailable: show what you can + "-" for missing fields.
- Never pretend partial data is complete.

## 8. Specific screen states

| Screen | Loading | Empty | Error |
|--------|---------|-------|-------|
| Home | Skeleton | New user: onboarding card; Returning: no orders | Retry banner |
| Categories | Skeleton grid | n/a (always populated) | Retry banner |
| Search results | Skeleton list | Friendly empty state + suggestions | Retry banner |
| PDP | Skeleton + image placeholder | 404 fallback "Produit introuvable" | Retry banner |
| Cart | Skeleton lines | Friendly empty + CTA | Retry |
| Order review | Skeleton | n/a | Retry |
| Payment | Form skeleton | n/a | Retry |
| Order confirmation | Success icon | n/a | n/a |
| My orders | Skeleton | Friendly empty | Retry banner |
| Tracking | Skeleton timeline | "Aucune commande" if no orders exist | Retry banner |
| QC report | Skeleton | "Rapport non disponible" | Retry banner |
| Messages | Skeleton | Friendly empty | Retry banner |
| Dashboard | Skeleton KPIs | Zero state | Retry banner |

## 9. Decisions

- D-ELS01 Skeleton over spinner for > 1.5 s operations.
- D-ELS02 No blank-white screens.
- D-ELS03 Every screen has explicit empty/error/loading copy.