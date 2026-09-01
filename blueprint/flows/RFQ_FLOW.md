# RFQ_FLOW

> Request a custom quote from M&C.

## Stages

### Stage 1 - Trigger
- PDP "Demander un devis" → 14.
- Cart "Demander un devis pour ce panier" (planned).

### Stage 2 - Submit RFQ (14)
- Form fields: quantity, delivery city, address, deadline, notes, attachments.
- Submit → loading → success state.
- ETA communicated: "Réponse sous 24–48 h ouvrées."

### Stage 3 - Wait
- Notification when M&C responds.
- Status: "En attente" (visible in Messages or quote history).

### Stage 4 - Quote received (19)
- Banner: "Devis prêt".
- Confirmed cost lines.
- Validity period.
- "Accepter et commander" → 15 with quote preloaded.
- "Demander une modification" → 23.

### Stage 5 - Convert
- Accept → 15 with confirmed pricing.
- Standard checkout flow continues.

## Exit
- 14 (in-place success), 19, 15, 23.

## States
- `rfq.draft`, `rfq.status`, `rfq.response`.

## Acceptance criteria
- Quote lines labelled "confirmé".
- Validity countdown visible.
- Expired quotes show "Devis expiré" + re-request CTA.

## Failure / edge cases
- Submission failure → retry; draft persists.
- Expired quote → re-request.
- Customer requests change → message thread (23).

## Risks
- Long response time → clear expectations.