# 15 - Frontend Security Boundaries

> What the M&C Connect frontend must never expose, and the safety checks that enforce it.

---

## 1. Business-model safety rule

The M&C Connect customer relationship must remain with **M&C Connect**. The customer must never be encouraged, enabled, or allowed to contact a Chinese supplier directly.

---

## 2. Data the frontend MUST NEVER render

| Forbidden | Why | Where it would leak |
|-----------|-----|---------------------|
| Supplier phone number | Customer would call supplier directly | PDP, RFQ, RFQ response, supplier profile (N/A - no supplier profile in app) |
| Supplier email | Customer would email supplier directly | RFQ, messages, order details |
| Supplier WhatsApp handle | Customer would message supplier directly | Anywhere |
| Supplier WeChat handle | Same | Anywhere |
| Factory address | Direct contact | Anywhere |
| Direct supplier URL | Bypass M&C | Anywhere |
| Supplier-side chat window | Bypass M&C | Messages, RFQ |
| Direct supplier payment info | Customer pays supplier directly | Payment, RFQ response, quote |

---

## 3. Surface-level enforcement

### Product Detail (10)
- No supplier identity surfaced (no "Voir le fournisseur" link).
- No supplier location surfaced (no factory region).
- Only M&C-side verification shown ("Vérifié par M&C Connect").

### RFQ (14)
- Customer submits needs to M&C.
- The RFQ response comes from M&C, never from a named supplier.

### Quote received (19)
- Quote is issued by M&C Connect.
- The quote carries M&C branding, terms, and an M&C-side contact for follow-up.

### Payment (17)
- Payment options are exclusively M&C-managed.
- No direct bank transfer to a supplier.

### Messages (23)
- All threads are between customer and M&C.
- Customer cannot initiate a thread with a supplier.
- No external chat integrations (WhatsApp, WeChat) anywhere.

### Tracking (21)
- Tracking references M&C's role, not a supplier's.
- Status copy speaks of "M&C" or "votre commande".

---

## 4. Patterns that are explicitly forbidden

| Pattern | Reason |
|---------|--------|
| "Contacter le fournisseur" CTA | Forbidden |
| "Voir le profil du fournisseur" CTA | Forbidden |
| Direct phone/email link in any text | Forbidden |
| Embed a third-party chat widget | Forbidden |
| Display a WeChat QR code | Forbidden |
| Link to alibaba.com / aliexpress.com / globalsources.com | Forbidden |
| Show a supplier logo | Forbidden |
| Allow free-text attachments that bypass M&C review | Forbidden |

---

## 5. Verification signals (allowed)

These signals build trust while keeping M&C as the counterparty:

- "Vérifié par M&C Connect" badge on products.
- Quality inspection summary owned by M&C.
- "Inspection qualité incluse" tag where applicable.
- Warranty offered by M&C.
- Delivery managed by M&C.

---

## 6. UI copy rules

- Use **"M&C Connect"** or **"votre chargé d'import M&C"** as the responsible party.
- Never use **"le fournisseur"** as an active actor in the customer-facing UI.
- Where supplier information would help build trust, paraphrase: "Nos partenaires de production en Chine sont vérifiés par notre équipe" (no name).

---

## 7. Threat-model summary

| Threat | Mitigation |
|--------|-----------|
| Customer sources supplier contact from app | No supplier contact rendered anywhere |
| Customer shares supplier contact via messages | Messages are M&C-mediated; attachments reviewed |
| Customer arranges direct payment | Payment options are M&C-managed only |
| Customer visits supplier directly | App does not link to supplier sites |
| Customer uses another app to contact supplier | App provides M&C messaging + visible response SLA |

## 8. Review checklist (run per screen)

- [ ] No supplier name visible
- [ ] No supplier phone / email / handle visible
- [ ] No external chat widget
- [ ] No external URL surfaced
- [ ] All status copy attributes action to M&C
- [ ] Verification signals speak of M&C, not the supplier
- [ ] Messaging is M&C-mediated
- [ ] Payment options are M&C-managed

## 9. Decisions

- D-SEC01 Supplier identity never rendered to customer.
- D-SEC02 No external chat integrations.
- D-SEC03 Status copy attributes action to M&C, not suppliers.