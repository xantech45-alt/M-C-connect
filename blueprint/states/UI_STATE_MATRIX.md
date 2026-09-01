# UI State Matrix

> Per-screen UI state (modal open, sheet open, current tab, focus).

---

| Screen | Modals | Sheets | Tabs | Drawers | Notes |
|--------|--------|--------|------|---------|-------|
| 01 | Language picker | – | – | – | Initial entry modal |
| 02 | OTP modal | – | – | – | OTP is modal flow |
| 03 | – | – | stepper 1–4 | – | Multi-step form |
| 04 | – | – | – | – | – |
| 05 | – | – | – | – | – |
| 06 | – | – | – | – | Recent search drawer planned |
| 07 | – | sort sheet | – | – | Sort via bottom sheet |
| 08 | – | – (this screen is the sheet) | – | – | Bottom sheet itself |
| 09 | full-screen modal | – | – | – | Camera modal |
| 10 | gallery viewer | – | – | – | Image zoom |
| 11 | – | – | specs / tiers / warranty | – | Tab strip |
| 12 | – | – | – | – | – |
| 13 | – | – | – | – | – |
| 14 | – | – | – | – | – |
| 15 | – | – | – | – | Confirmation on remove |
| 16 | – | address edit | – | – | Edit address |
| 17 | – | – | – | – | – |
| 18 | – | – | – | – | – |
| 19 | – | – | – | – | – |
| 20 | – | filter sheet | all / active / delivered / cancelled | – | Filter via sheet |
| 21 | – | – | – | – | Inline expand on node |
| 22 | – | – | – | – | Image viewer modal |
| 23 | – | – | – | – | Planned thread detail modal |
| 24 | – | period selector | – | – | Period via bottom sheet |

## Decisions

- D-UI01 Bottom sheets host quick decisions; modals host full-screen flows.
- D-UI02 Sticky CTA always owns the screen on detail/form screens.
- D-UI03 Tabs appear only when ≥ 2 sibling views exist.