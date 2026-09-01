# Screen 02 - Connexion (Login)

## Purpose
Allow returning customers to sign in via phone + OTP, and first-time customers to register.

## User objective
Sign in to access orders, quotes, messages, and the catalog.

## Business objective
Authenticate the customer against the M&C account system.

## Entry points
- Onboarding continue (01 → 02).
- Tap "Se connecter" from Profile tab.

## Exit points
- OTP modal (in-place)
- Profile setup (03) on first sign-in
- Home (04) on returning sign-in

## Layout hierarchy
1. App bar - back to 01
2. Page title - "Connexion"
3. Phone input (Mali format)
4. Primary CTA - "Recevoir le code"
5. Footer - legal / support microcopy

## Header architecture
- Back button. No contextual action.

## Primary content
- Phone input with `+223` prefix and `XX XX XX XX` mask.
- Inline validation.

## Secondary content
- "Pas encore de compte ? Créer un compte" link (text).
- "Besoin d'aide ?" link to support.

## Primary CTA
- "Recevoir le code" (red, full-width, disabled until valid phone).

## Secondary CTA
- "Créer un compte" text link.

## Components required
- `OTPForm`
- `TextField`
- `PrimaryButton`
- `TextLink`

## Image requirements
- None.

## States
- Loading: button shows spinner.
- Populated: standard.
- Empty: standard.
- Error: inline below input; toast on send failure.
- Offline: banner; sign-in disabled.

## Interactions
- Type phone number → mask enforced.
- Tap "Recevoir le code" → triggers OTP send, transitions to OTP modal.
- OTP modal: 6-digit code, resend after 30 s countdown, change phone link.

## Responsive behavior
- Tiny: input full-width, button full-width.
- Standard: same.
- Tablet: same with 24 dp gutter.

## Accessibility
- Phone input has visible label "Numéro de téléphone".
- OTP inputs are individual boxes with auto-advance and screen-reader labels.
- Error text associated via `aria-describedby`.
- Auto-complete `one-time-code` supported on OTP.

## Localization
- French primary.
- English "Phone number" / "Receive code".
- Bambara placeholder.

## Acceptance criteria
- Phone number must match `+223 XX XX XX XX` regex.
- OTP resend respects 30 s cooldown.
- Auto-submit when OTP completes.
- Logged-in state persists for the configured session length.

## Dependencies
- `auth` slice.
- OTP API (planned).

## Risks
- OTP delivery latency in Mali.
- Re-entry if user goes back to 01.

## TODOs
- [x] architecture approved
- [x] components identified
- [x] design tokens mapped
- [x] desktop assumptions removed
- [x] mobile spacing reviewed
- [x] empty state planned
- [x] loading state planned
- [x] error state planned
- [x] accessibility reviewed
- [x] localization reviewed
- [x] business-model rules reviewed
- [x] imagery specified
- [x] acceptance criteria finalized