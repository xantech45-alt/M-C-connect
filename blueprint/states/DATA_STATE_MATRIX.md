# Data State Matrix

> Loading, error, empty, success states for every data surface.

---

## Per-screen matrix

| Screen | Loading | Empty | Error | Success | Offline |
|--------|---------|-------|-------|---------|---------|
| 01 | – | – | – | – | – |
| 02 | OTP submit | n/a | inline | toast | banner |
| 03 | section submit | n/a | inline + toast | section advance | drafts persist |
| 04 | skeleton | onboarding card | retry banner | – | banner; cached |
| 05 | skeleton | n/a | retry banner | – | banner |
| 06 | spinner | recent + trending | retry | – | banner |
| 07 | skeleton | suggestions + CTA | retry banner | – | banner |
| 08 | – | – | – | apply | banner |
| 09 | spinner | tips | inline error | – | banner |
| 10 | skeleton | n/a | retry banner | – | banner |
| 11 | skeleton | n/a | retry banner | – | banner |
| 12 | skeleton | n/a | inline "Estimation indisponible" | – | banner |
| 13 | skeleton | empty CTA | retry banner | – | banner |
| 14 | spinner | n/a | inline + retry | success state | drafts persist |
| 15 | skeleton | friendly + CTA | retry | – | banner |
| 16 | skeleton | n/a | address validation | – | banner |
| 17 | spinner | n/a | retry | – | banner |
| 18 | – | – | – | always | – |
| 19 | skeleton | "Devis expiré" | retry banner | – | banner |
| 20 | skeleton | friendly + CTA | retry banner | – | banner; cached |
| 21 | skeleton | n/a | retry banner | – | banner; cached |
| 22 | skeleton | "Rapport non disponible" | retry banner | – | banner; cached |
| 23 | skeleton | friendly empty | retry banner | – | banner; cached |
| 24 | skeleton | zero-state + CTA | retry banner | – | banner; cached |

## Decisions

- D-DS01 Skeleton for > 1.5 s operations.
- D-DS02 Empty states always have a CTA.
- D-DS03 Error states always offer retry or support.
- D-DS04 Offline banner appears on every server-dependent screen.
- D-DS05 Cached reads allowed for orders, tracking, messages, dashboard.