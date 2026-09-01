# Agent Registry (Implementation)

> Mirror of `blueprint/agents/AGENT_REGISTRY.md` scoped to the React implementation.

---

## 1. Master orchestrator

`M&C-MASTER-FRONTEND-ORCHESTRATOR`

Owns:

- Source-of-truth enforcement (blueprint wins)
- Phase gating
- Capability map (`TOOL_CAPABILITY_MAP.md`)
- Hallucination guard (`unsupported` features → register or remove)
- Cross-screen consistency
- Visual-fidelity gates
- Final acceptance

## 2. Executives

| ID | Role | Owns |
|----|------|------|
| `ARCH-EXEC` | Frontend Architecture Executive | React tree, routes, layers, dependencies |
| `DESIGN-EXEC` | Design Executive | Tokens, typography, colour, imagery |
| `UX-EXEC` | UX Executive | Information hierarchy, flow integrity, action priority |
| `IMPL-EXEC` | Implementation Executive | Phase sequencing, integration, technical consistency |
| `QUAL-EXEC` | Quality Executive | Code review, blueprint compliance, visual review, a11y |

## 3. Specialists (per blueprint/agents/)

### Architecture

- React Architecture Agent
- Routing Agent
- State Architecture Agent
- Data Adapter Agent
- Component Architecture Agent

### Design

- Design Token Agent
- Layout Agent
- Spacing Agent
- Typography Agent
- Image & Asset Agent
- Iconography Agent
- Responsive Design Agent

### Screen

- Authentication Agent
- Home Agent
- Discovery Agent
- Search Agent
- Product Agent
- Quote Agent
- Cart Agent
- Checkout Agent
- Orders Agent
- Tracking Agent
- Quality Control Agent
- Messaging Agent
- Dashboard Agent
- Profile Agent

### Quality

- Blueprint Compliance Reviewer
- Business Logic Reviewer
- React Code Reviewer
- Mobile UX Reviewer
- Tablet UX Reviewer
- Accessibility Reviewer
- Performance Reviewer
- Visual Fidelity Reviewer
- Test Reviewer

## 4. Hallucination detector

Every significant new feature is classified:

- `BLUEPRINT-SUPPORTED`
- `BUSINESS-DOC-SUPPORTED`
- `VISUAL-REFERENCE-SUPPORTED`
- `WEB-RESEARCH-ADAPTATION`
- `ENGINEERING-NECESSITY`
- `UNSUPPORTED` → remove or `DEVIATION_REGISTER.md`
