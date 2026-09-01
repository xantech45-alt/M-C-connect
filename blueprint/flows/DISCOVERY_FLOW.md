# DISCOVERY_FLOW

> Browse categories and discover products.

## Stages

### Stage 1 - Home (04)
- Search bar sticky.
- Category strip.
- Recommendations.
- Recent activity.

### Stage 2 - Categories (05)
- 2-col grid (3-col on tablet).
- Tap → 07 filtered.

### Stage 3 - Product decision
- Product card tap → 10.
- See flows/PRODUCT_DECISION_FLOW.md.

## Exit
- 10, 07.

## States
- `categories`, `recommendations`.

## Acceptance criteria
- Tap category loads filtered results.
- Recommendations refresh on Home mount.

## Failure / edge cases
- Empty recommendations → hide section.
- Category list failure → retry banner.