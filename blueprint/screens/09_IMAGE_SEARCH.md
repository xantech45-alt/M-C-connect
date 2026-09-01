# Screen 09 - Recherche par image

## Purpose
Allow the customer to find a product by photographing or uploading an image.

## User objective
Find a product when they don't know what to type.

## Business objective
Lower the barrier to discovery.

## Entry points
- Camera icon in search bars (04, 06).
- Voice input affordance in carousels (planned).

## Exit points
- Search results (07) with image-query filter.
- Back to source screen.

## Layout hierarchy
1. App bar - close · title
2. Capture area (camera or upload)
3. Tips / instructions
4. Recent image searches (optional)

## Header architecture
- Close affordance returns to source.
- Title: "Recherche par image".

## Primary content
- Live camera viewfinder (when permission granted).
- Capture button.
- Gallery upload button.

## Secondary content
- "Comment ça marche" expandable.
- Tips for best results.
- Recent image searches (optional).

## Primary CTA
- Capture button (red, circular, large).

## Secondary CTA
- "Choisir une image" gallery button.

## Components required
- `ImageSearchCapture`
- `PrimaryButton`
- `Modal` (full-screen)
- `EmptyState`

## Image requirements
- None (capture target).

## States
- Loading: spinner during upload.
- Populated: standard.
- Empty: tips + capture.
- Error: "Image non analysable" + retry.
- Offline: banner; capture disabled.

## Interactions
- Capture → upload → loading → 07 with image-query.
- Upload → upload → 07 with image-query.

## Responsive behavior
- Full-screen on all sizes.
- Camera scales to viewport.

## Accessibility
- Capture button has visible label "Capturer".
- Viewfinder announces permission state.
- Permission flow handled gracefully if denied.

## Localization
- French primary.

## Acceptance criteria
- Permission requested with clear rationale.
- Fallback to gallery if permission denied.
- Upload size capped (5 MB).
- Privacy: image not stored beyond session unless user saves.

## Dependencies
- Camera permission.
- Image search API (planned).

## Risks
- Backend latency → skeleton on 07.

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