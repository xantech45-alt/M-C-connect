# Screen 03 - Profil entreprise (Business profile)

## Purpose
Capture the customer's company information to enable B2B imports and tax-compliant invoicing.

## User objective
Set up a business profile in a single guided flow.

## Business objective
Collect required KYC data (legal name, registration, tax ID, address, contact, primary interest) for downstream order processing.

## Entry points
- After first OTP success (02 → 03).
- Tap "Modifier le profil" from Profile tab.

## Exit points
- Home (04) on completion.
- Back to OTP flow on explicit back.

## Layout hierarchy
1. App bar - back
2. Stepper (1 of 4)
3. Section title
4. Form fields
5. Section navigation (Continue, Back)
6. Footer microcopy

## Header architecture
- Back button (returns to OTP flow).
- Right contextual action: "Enregistrer plus tard" (text link).

## Primary content
Form sections:

### Section 1 - Identité légale
- Dénomination sociale (legal name) - required
- Forme juridique - required (SARL, SA, SUARL, individuelle)
- Numéro d'enregistrement (RCCM) - required
- Numéro d'identification fiscale (NIF) - optional

### Section 2 - Coordonnées
- Adresse - required
- Ville - required
- Téléphone - required (default from auth)
- Email - required

### Section 3 - Activité
- Secteur d'activité - required (commerce, industrie, agriculture, services, autre)
- Catégories d'intérêt - multi-select chips (at least 1)
- Volume d'achat annuel estimé - required (slider / select)

### Section 4 - Livraison
- Adresse de livraison (default = adresse)
- Ville de livraison - required
- Notes - optional

## Secondary content
- Helper text per field.
- "Pourquoi demandons-nous ces informations ?" expandable.

## Primary CTA
- "Continuer" / "Enregistrer" (red).

## Secondary CTA
- "Sauter cette étape" (text link) for first-time setup (optional sections only).

## Components required
- `BusinessProfileForm`
- `TextField`
- `Chip` (multi-select)
- `Select`
- `Stepper`
- `PrimaryButton`
- `TextLink`

## Image requirements
- None.

## States
- Loading: button spinner on submit.
- Populated: standard.
- Empty: required fields show errors.
- Error: inline + toast.
- Offline: form draft auto-saves locally; submit disabled with banner.

## Interactions
- Continue validates current section, advances stepper.
- Back returns to previous section.
- Drafts auto-saved on field blur.

## Responsive behavior
- Single-column form on all widths.
- Tablet: form centered with max-width 480 dp.

## Accessibility
- All fields labelled.
- Stepper has role="progressbar" with aria-valuenow.
- Chip multi-select announces count.
- Errors associated via aria-describedby.

## Localization
- French primary.
- English secondary.
- Bambara placeholder.

## Acceptance criteria
- Cannot advance without required fields.
- Draft persists if user exits mid-flow.
- Submit success lands on Home with profile loaded.
- Section navigation respects stepper state.

## Dependencies
- `auth` state.
- `companyProfile` state.
- Profile API (planned).

## Risks
- Long forms cause abandonment - keep 4 sections max, save drafts aggressively.

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