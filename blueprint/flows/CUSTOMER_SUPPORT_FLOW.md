# CUSTOMER_SUPPORT_FLOW

> Customer reaches M&C through in-app messaging.

## Stages

### Stage 1 - Entry
- Profile → "Contacter le support".
- Tracking (21) → "Contacter M&C".
- QC (22) → "Contacter M&C".
- Order review concerns.

### Stage 2 - Messages list (23)
- Tap an existing thread OR start new (planned).
- All threads are with M&C.

### Stage 3 - Thread (planned screen, but planned in 23)
- Compose message.
- Attachments (planned).
- Send.

### Stage 4 - Response
- M&C agent responds in-thread.
- Unread badge updates.

## Exit
- Back to source screen.

## States
- `messages.threads`, `messages.active`.

## Acceptance criteria
- Counterparty always M&C.
- No external chat widgets.
- Threads load from cache when offline.

## Failure / edge cases
- Send failure → retry; queued writes.
- Attachment too large → error.

## Risks
- Latency - show "En attente d'une réponse" copy.