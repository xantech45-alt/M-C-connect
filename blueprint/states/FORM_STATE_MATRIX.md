# Form State Matrix

> Every form, every field, validation, draft state.

---

## 02 - Login phone field

| Property | Value |
|----------|-------|
| Field | Téléphone |
| Required | yes |
| Placeholder | XX XX XX XX |
| Helper | Format Mali attendu |
| Validation | `+223 XX XX XX XX` |
| Error | "Format invalide" |
| Disabled | n/a |
| Draft | n/a |

## 02 - OTP

| Property | Value |
|----------|-------|
| Field | Code à 6 chiffres |
| Required | yes |
| Validation | 6 digits |
| Error | "Code incorrect" |
| Resend | 30 s cooldown |
| Auto-submit | yes |

## 03 - Business profile

### Section 1 - Identité légale

| Field | Required | Validation |
|-------|----------|-----------|
| Dénomination sociale | yes | non-empty |
| Forme juridique | yes | enum |
| RCCM | yes | non-empty |
| NIF | no | non-empty |

### Section 2 - Coordonnées

| Field | Required | Validation |
|-------|----------|-----------|
| Adresse | yes | non-empty |
| Ville | yes | non-empty |
| Téléphone | yes | Mali format |
| Email | yes | RFC 5322 |

### Section 3 - Activité

| Field | Required | Validation |
|-------|----------|-----------|
| Secteur | yes | enum |
| Catégories d'intérêt | yes | ≥ 1 |
| Volume annuel estimé | yes | non-empty |

### Section 4 - Livraison

| Field | Required | Validation |
|-------|----------|-----------|
| Adresse | yes (defaults OK) | non-empty |
| Ville | yes | enum |
| Notes | no | – |

## 14 - RFQ

| Field | Required | Validation |
|-------|----------|-----------|
| Quantité | yes | ≥ MOQ |
| Ville de livraison | yes | non-empty |
| Adresse de livraison | no | – |
| Délai souhaité | yes | future date |
| Notes | no | ≤ 1000 chars |
| Pièces jointes | no | ≤ 5 MB each |

## 16 - Order review

| Field | Required | Validation |
|-------|----------|-----------|
| Adresse | yes | non-empty |
| Ville | yes | enum |
| Shipping option | yes | enum |
| Consent checkbox | yes | true |

## 17 - Payment

| Field | Required | Validation |
|-------|----------|-----------|
| Méthode de paiement | yes | enum |
| Method-specific data | yes | per-method |

## Decisions

- D-FORM01 Validate on blur; re-validate on submit; never during typing unless required.
- D-FORM02 Drafts auto-save on blur for forms ≥ 4 fields.
- D-FORM03 Errors always text + colour, never colour alone.