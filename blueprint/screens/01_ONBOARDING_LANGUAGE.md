# Screen 01 - Onboarding & language

## Purpose
Welcome the user, introduce M&C Connect as a managed import service, and capture their language preference.

## User objective
Understand what M&C Connect does, choose a language, and proceed.

## Business objective
Set the right tone (managed, professional, transparent) and lock the locale for the rest of the experience.

## Entry points
- Cold launch (no prior session).

## Exit points
- Login (02) on continue.

## Layout hierarchy
1. App bar (transparent)
2. Hero - M&C identity, hero copy, value prop
3. Language picker (fr-ML, en, bm)
4. Continue CTA
5. Footer - security & trust microcopy

## Header architecture
- Transparent app bar, skip / close optional.

## Primary content
- M&C logo.
- Headline: "Vous choisissez ce dont vous avez besoin. M&C Connect s'occupe du reste."
- Sub-headline: short paragraph on what M&C handles (sourcing, QC, shipping, customs).

## Secondary content
- Three short value bullets with line icons:
  - "Approvisionnement vérifié"
  - "Contrôle qualité inclus"
  - "Livraison jusqu'à Bamako"
- Tiny legal microcopy.

## Primary CTA
- "Continuer" (red, full-width).

## Secondary CTA
- "Voir les conditions" text link.

## Components required
- `OnboardingCarousel`
- `LanguageOption`
- `PrimaryButton`
- `ValueBullet` (Feature layer - composite pattern: icon + title + description)

## Image requirements
- Brand mark / hero illustration: contextual import imagery (container port or supply chain photo), ratio 16:9.

## States
- Loading: none (entry screen).
- Populated: always.
- Empty: n/a.
- Error: n/a at this screen.
- Offline: screen works offline; language picker is local.

## Interactions
- Tap a language option → mark selected, persists immediately.
- Tap "Continuer" → navigate to 02.
- Tap "Voir les conditions" → in-app sheet with terms summary.

## Responsive behavior
- Tiny (320): hero crops tighter; bullets stack.
- Standard: hero 16:9; bullets 1-col stack.
- Tablet: hero 16:9, padding 24, bullets 1-col stack centered.

## Accessibility
- Language options have role="radiogroup" / role="radio".
- Visible focus ring on language options.
- Touch targets ≥ 44 dp.
- Reduced-motion: no parallax; static hero.
- Hero image: alt "M&C Connect - service d'import géré pour le Mali".

## Localization
- French (primary) → content as written.
- English → translated copy; placeholder until final translation.
- Bambara → placeholder strings; flag the screen as "read-only planned" for Bambara.

## Acceptance criteria
- Language picker selection persists across restarts.
- Continue is disabled until a language is selected.
- Hero renders within 1.5 s on mid-range Android.
- Screen passes contrast and dynamic-type checks at 200%.

## Dependencies
- `i18n` set on selection.
- `auth` initialised as logged-out.

## Risks
- Bambara strings unavailable at launch - fall back to French.

## TODOs
- [ ] architecture approved
- [ ] components identified
- [ ] design tokens mapped
- [ ] desktop assumptions removed
- [ ] mobile spacing reviewed
- [ ] empty state planned
- [ ] loading state planned
- [ ] error state planned
- [ ] accessibility reviewed
- [ ] localization reviewed
- [ ] business-model rules reviewed
- [ ] imagery specified
- [ ] acceptance criteria finalized