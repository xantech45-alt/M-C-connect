# Order Status Matrix

> The complete order state machine and its UI representation.

---

## 1. States

| State | French label | Visual | Description |
|-------|--------------|--------|-------------|
| `submitted` | Commande reçue | info | Order placed by customer |
| `confirmed` | Confirmée par M&C | info | M&C has acknowledged the order |
| `sourcing` | Approvisionnement en cours | info | M&C is sourcing the product |
| `production` | En production | info | Production underway |
| `quality_inspection` | Contrôle qualité | info | M&C inspection in progress |
| `ready_for_shipment` | Prêt pour expédition | info | Cleared and packed |
| `international_transit` | Transit international | info | In international shipping |
| `customs_clearance` | Dédouanement | info | Customs processing |
| `local_delivery` | Livraison locale | info | Final-mile delivery in Mali |
| `delivered` | Livrée | success | Order received by customer |
| `cancelled` | Annulée | error | Order cancelled |
| `delayed` | En retard | warning | Tracking indicates delay |
| `exception` | Anomalie | error | Exception handling required |

## 2. State transition diagram

```
submitted
  ↓
confirmed
  ↓
sourcing
  ↓
production
  ↓
quality_inspection
  ↓
ready_for_shipment
  ↓
international_transit
  ↓
customs_clearance
  ↓
local_delivery
  ↓
delivered
```

Cancelled can occur from any non-terminal state. Delayed / exception overlays apply at any active state.

## 3. Visual treatment per state

| State | Icon | Tone |
|-------|------|------|
| submitted | package | info |
| confirmed | check | info |
| sourcing | search | info |
| production | factory | info |
| quality_inspection | shield-check | info |
| ready_for_shipment | box | info |
| international_transit | truck | info |
| customs_clearance | stamp | info |
| local_delivery | truck-fast | info |
| delivered | package-check | success |
| cancelled | x-circle | error |
| delayed | clock-alert | warning |
| exception | alert-triangle | error |

## 4. State-on-screen behaviour

| State | Home card | Tracking timeline | Status chip |
|-------|-----------|-------------------|-------------|
| submitted | hide | current | info |
| confirmed | active | current | info |
| sourcing | active | current | info |
| production | active | current | info |
| quality_inspection | active | current | info |
| ready_for_shipment | active | current | info |
| international_transit | active | current | info |
| customs_clearance | active | current | info |
| local_delivery | active | current | info |
| delivered | hide | completed | success |
| cancelled | hide | completed | error |
| delayed | active | warning overlay | warning |
| exception | active | error overlay | error |

## 5. Decision rules

- Home card shows the latest active state only.
- Tracking timeline shows all states completed + current + future (pending).
- Cancelled orders move to the cancelled tab.
- Delayed states show last update timestamp and ETA revision.
- Exception states show inline alert + support CTA.

## 6. Decisions

- D-OS01 State machine is canonical; new states require ADR update.
- D-OS02 Each state has unique icon + label + tone (no colour-only).
- D-OS03 Delayed / exception are overlays, not states.