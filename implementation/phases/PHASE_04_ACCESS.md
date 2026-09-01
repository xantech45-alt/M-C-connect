# Phase 04 - Access screens

**Objective:** Implement screens 01, 02, 03.
**Dependencies:** Phase 03.

## Screens

- [ ] **01 Onboarding & language** (`src/routes/Onboarding.tsx`)
  - 3-slide carousel: trust copy + visuals + language selection.
  - Skip / Continuer CTA.
  - One dominant red CTA.
- [ ] **02 Connexion** (`src/routes/Login.tsx`)
  - Phone input (`+223` prefix, numeric keyboard).
  - OTP step (6 digits, paste-friendly).
  - Resend timer.
  - One red CTA per step.
  - `<OTPForm>` feature component.
- [ ] **03 Profil entreprise** (`src/routes/BusinessProfile.tsx`)
  - Multi-step: legal info · contact · delivery · interests.
  - Draft auto-save.
  - Sticky "Enregistrer" CTA.
  - `<BusinessProfileForm>` feature component.

## Checklist

- [ ] Mock auth flow returns a session and routes to Home.
- [ ] Form validation prevents navigation on missing required fields.
- [ ] Phone formatted as `+223 XX XX XX XX`.
- [ ] All copy in `fr-ML`; no English leaks.
- [ ] One primary red CTA per screen.
- [ ] Empty / loading / error states defined per `14_EMPTY_LOADING_ERROR_STATES.md`.
- [ ] Accessibility: visible labels, helper text, error association, single h1.

## Exit gate

- Walk-through: language → phone → OTP → profile → home works on mock.
- Visual at 320 / 360 / 390 / 414.
- A11y: focus order correct; touch targets ≥ 44 dp; contrast AA.
