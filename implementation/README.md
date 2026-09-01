# M&C Connect - Implementation Control

> Per spec section 7. `/implementation` is the **planning and control** layer for the React frontend build. Source code lives in `/src`.

The `/blueprint` is the contract.
The `/implementation` directory governs how we deliver against it.
The `/src` directory contains the React application.

---

## Layout

```
implementation/
├── README.md                    ← this file
├── MASTER_EXECUTION_PLAN.md
├── PROJECT_AUDIT.md
├── BLUEPRINT_REQUIREMENT_MAP.md
├── SOURCE_ALIGNMENT.md
├── WEB_RESEARCH.md
├── AGENT_REGISTRY.md
├── TOOL_CAPABILITY_MAP.md
├── COMPONENT_IMPLEMENTATION_MAP.md
├── ROUTE_IMPLEMENTATION_MAP.md
├── STATE_IMPLEMENTATION_MAP.md
├── ASSET_IMPLEMENTATION_MAP.md
├── RESPONSIVE_MATRIX.md
├── ACCESSIBILITY_MATRIX.md
├── TEST_MATRIX.md
├── PERFORMANCE_REPORT.md
├── DEVIATION_REGISTER.md
├── BUG_REGISTER.md
├── DECISION_LOG.md
├── FINAL_AUDIT.md
├── phases/
│   └── PHASE_NN_*.md
└── reviews/
    └── *_REVIEW.md
```

## How to use

1. **Start by reading `PROJECT_AUDIT.md`** - it tells you what existed, what didn't, and what we built from.
2. **Read `MASTER_EXECUTION_PLAN.md`** - the phase sequence.
3. **Each `phases/PHASE_NN_*.md`** holds the work, gate, and exit for one phase.
4. **`reviews/`** holds the multi-pass reviews after each phase.
5. **`DEVIATION_REGISTER.md` and `BUG_REGISTER.md`** are append-only.
6. **`DECISION_LOG.md`** extends `blueprint/21_DECISIONS.md` with implementation-side choices.

## Hard rules (carried from spec)

- This is a **React mobile+tablet responsive web application**. Not React Native. Not desktop.
- M&C Connect is the **only** commercial counterparty in the UI.
- All design tokens come from `blueprint/05_DESIGN_SYSTEM.md`.
- Spacing uses only the token scale; no arbitrary px.
- French (Mali) is the primary locale; copy originates there.
- One dominant red CTA per screen; ≤12% red surface.
- 44 × 44 dp minimum touch targets.
