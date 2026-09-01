# 13 - Interaction Model

> Primary vs secondary actions, progressive disclosure, destructive safeguards.

---

## 1. Action hierarchy

Every screen has at most:
- **1 primary action** (red, dominant).
- **1 secondary action** (outlined or text link).
- **0–2 tertiary actions** (text links, icon buttons).

The primary action is the action the user is most likely to take on this screen. Examples:

| Screen | Primary action |
|--------|---------------|
| Home | Search input focus |
| Categories | Tap a category |
| Search results | Tap a product |
| PDP | Add to cart / Demander un devis |
| Cart | Passer à la commande |
| Order review | Confirmer et payer |
| Tracking | Contact support / see next update |
| Dashboard | Period selector |

## 2. Secondary actions

Secondary actions are textual or outlined, never red. They support alternative paths without competing with the primary CTA.

Examples:
- "Voir les détails" on a summary card
- "Modifier" on an address line
- "Sauvegarder pour plus tard" on cart line

## 3. Tertiary actions

Tertiary actions are minimal-emphasis: small icon buttons (favorite, share), text links in caption size, dropdown triggers.

## 4. Progressive disclosure

- The Home screen reveals only the most-likely action at the top: search.
- Advanced filters live behind a "Plus de filtres" toggle on the filter sheet.
- Detailed landed cost breakdown is one tap away on PDP ("Voir le coût rendu").
- Detailed tracking timeline expands from a card.

## 5. Destructive actions

The following require confirmation before execution:

- Remove from cart (with quantity confirmation if > 1 unit)
- Cancel order (only when status allows)
- Clear saved search history
- Delete message thread
- Logout

Confirmation pattern: bottom sheet with "Annuler" and a red-text destructive action.

## 6. Recoverable mistakes

- Cart removal: undo toast for 5 seconds.
- Form fields with destructive changes: explicit "Enregistrer" CTA; never auto-saved silently.
- Address change during checkout: explicit "Modifier" → form.

## 7. Long-running operations

- Order placement: full-screen confirmation with success icon.
- RFQ submission: success state + ETA for response.
- Payment: loading spinner on CTA, success on completion, error banner on failure with retry.

## 8. Sticky action rules (interaction)

- Sticky action replaces the in-content primary CTA.
- When scrolled past the in-content CTA, the sticky CTA takes over without flicker.
- On scroll back, the sticky CTA hides when the in-content CTA is visible.

## 9. Gesture conventions

- Pull-to-refresh on: order list, messages, notifications, dashboard.
- Swipe-to-delete: NOT used. Always explicit icon action.
- Long-press: reserved for context menus (favorite, share, copy message).
- Swipe between gallery images: enabled on PDP.

## 10. Modal/sheet etiquette

- Bottom sheet > modal for any quick decision.
- Modal reserved for: full-screen flows (image viewer, language picker, OTP).
- Bottom sheet never blocks navigation back via hardware back - it dismisses.

## 11. Empty / first-use interactions

- Empty cart: friendly headline + "Continuer mes achats" CTA.
- No orders yet: friendly headline + "Découvrir les catégories" CTA.
- No messages: friendly headline + "Posez votre première question" CTA.
- No notifications: nothing to show.

## 12. Decisions

- D-IM01 One primary red CTA per screen.
- D-IM02 Destructive actions confirm via bottom sheet.
- D-IM03 Pull-to-refresh on lists, swipe-to-delete never.
- D-IM04 Sticky CTA appears only after in-content CTA scrolls out.