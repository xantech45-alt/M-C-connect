# IMAGE_SEARCH_FLOW

> Image-based product search.

## Stages

### Stage 1 - Entry
- Tap camera icon on Home (04) or Search (06).
- Land on 09 (full-screen modal).

### Stage 2 - Capture / Upload
- Capture via camera OR pick from gallery.
- Permission rationale shown first time.

### Stage 3 - Analysis
- Image uploads to backend (mocked initially).
- Spinner on screen; user sees progress.

### Stage 4 - Results
- Navigate to 07 with image-query filter applied.
- Standard search-results UX from here.

## Exit
- 07, 10.

## States
- `imageSearch.lastImage`, `imageSearch.results`.

## Acceptance criteria
- Camera permission requested with rationale.
- Fallback to gallery if permission denied.
- Image size cap 5 MB.

## Failure / edge cases
- Permission denied → gallery upload only.
- Image not analysable → "Image non analysable" + retry.
- Offline → banner; upload disabled.
- Backend timeout → retry.