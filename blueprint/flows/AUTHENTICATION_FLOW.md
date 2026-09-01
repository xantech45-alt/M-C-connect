# AUTHENTICATION_FLOW

> Customer onboarding, login, profile setup.

## Purpose
Bring a customer into the app and authenticate them.

## Entry
- Cold launch.
- Profile tap "Se connecter" (logout).

## Stages

### Stage 1 - Onboarding (01)
- Cold launch → language picker.
- User selects `fr-ML`, `en`, or `bm`.
- Hero introduces managed service.
- Continue → 02.

### Stage 2 - Login (02)
- Phone input (`+223`).
- Tap "Recevoir le code" → OTP modal.
- 6-digit OTP with resend countdown.
- Auto-submit on completion.
- Failure: inline error + resend.

### Stage 3 - Profile setup (03) [first login only]
- 4 sections:
  1. Identité légale
  2. Coordonnées
  3. Activité
  4. Livraison
- Auto-save drafts on blur.
- Final submit → Home.

### Stage 4 - Returning login
- Skip 03.
- Land on Home (04).

## Exit / next
- Home (04).

## States to manage
- `auth.session`, `auth.profile`, `auth.companyProfile`.
- Locale persisted on language selection.

## Acceptance criteria
- Cold launch renders within 2 s.
- Language picker selection persists.
- OTP retry rate-limited.
- Draft auto-save survives app kill.

## Failure / edge cases
- OTP timeout → resend with countdown.
- Network failure → offline banner.
- App backgrounded mid-flow → resume state.
- Logout from Profile → confirm + clear session.

## Risks
- Long profile setup abandonment - auto-save + skip non-required sections.