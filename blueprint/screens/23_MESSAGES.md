# Screen 23 - Messages

## Purpose
All communication between the customer and M&C Connect.

## User objective
Talk to M&C about orders, quotes, RFQs.

## Business objective
Centralise customer communication; never expose supplier channels.

## Entry points
- Tab tap "Messages".
- Deep link from notification.

## Exit points
- Thread detail (planned).
- Order detail.
- Profile tab.

## Layout hierarchy
1. App bar - title · search · new thread (planned)
2. Thread list (most recent first)
3. Empty state
4. Bottom nav

## Header architecture
- Title "Messages".
- Search (icon button, planned).
- New thread (icon button, planned).

## Primary content
- Thread rows: avatar (M&C agent) · counterparty name (M&C Connect) · last message preview · timestamp · unread badge.

## Secondary content
- Pinned threads (planned).

## Primary CTA
- Tap a thread.

## Secondary CTA
- Tap unread badge → mark as read.

## Components required
- `MessageThread`
- `Avatar`
- `EmptyState`
- `SearchBar` (planned)

## Image requirements
- M&C avatar (placeholder until agent photos available).

## States
- Loading: skeleton.
- Populated: standard.
- Empty: "Aucun message pour le moment" + CTA "Démarrer une conversation" (planned).
- Error: retry banner.
- Offline: cached; banner.

## Interactions
- Pull-to-refresh.
- Tap thread → detail.

## Responsive behavior
- All widths: 1-col.

## Accessibility
- Thread rows announce unread state.

## Localization
- French primary.

## Acceptance criteria
- Unread count visible.
- Counterparty always "M&C Connect" or named agent.

## Dependencies
- `messages` state.

## Risks
- Avoid external chat integrations.

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