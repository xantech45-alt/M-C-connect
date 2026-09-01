# 21 - Decisions (ADR Log)

> Living architectural decision record. Append-only; revisions documented as new entries.

---

## Decision format

```
D-NNN - Title
Status: Proposed | Accepted | Superseded
Context: …
Decision: …
Consequences: …
```

---

## D-001 - Mobile-first is mandatory
**Status:** Accepted
**Context:** Target market is Mali; primary device is phone.
**Decision:** Mobile is the canonical target. Tablet is graceful growth. Desktop not in scope.
**Consequences:** No desktop layouts. Tablet gets slightly larger type and 2-col grids. Component breakpoints are phone-first.

## D-002 - French (Mali) is canonical locale
**Status:** Accepted
**Context:** Primary market is Mali.
**Decision:** All copy originates in `fr-ML`. English secondary. Bambara tertiary (read-only planned).
**Consequences:** All design accommodates French expansion. Strings freeze before Bambara translation.

## D-003 - Red is an accent only
**Status:** Accepted
**Context:** Brand colour is red, but over-use makes the app feel consumer / toy-like.
**Decision:** Red surface ≤12% of any screen. One dominant red CTA per screen.
**Consequences:** Hierarchy of buttons (primary/secondary/tertiary) uses red only at the top.

## D-004 - One primary CTA per screen
**Status:** Accepted
**Context:** Avoids user confusion and competing actions.
**Decision:** Every screen has at most one red CTA. Secondary actions are outlined or text.
**Consequences:** Reviewer enforces; failure triggers revision.

## D-005 - Customer is one relationship, with M&C
**Status:** Accepted
**Context:** Managed commerce model.
**Decision:** The frontend never surfaces supplier identity, contact, or location.
**Consequences:** All messaging routes through M&C. All payment routes through M&C. See `15_FRONTEND_SECURITY_BOUNDARIES.md`.

## D-006 - Four-layer component hierarchy
**Status:** Accepted
**Context:** Avoid one-off components and architectural drift.
**Decision:** Components live in Primitive / UI / Composite / Feature layers. Layer N depends only on Layer N and below.
**Consequences:** Implementation reviews component dependencies.

## D-007 - Tokens drive every visual decision
**Status:** Accepted
**Context:** Maintainability and consistency.
**Decision:** All colour, type, spacing, radius, elevation, icon usage mapped to tokens. No arbitrary values.
**Consequences:** Audit step in every screen review.

## D-008 - States designed before happy path
**Status:** Accepted
**Context:** Production code reviews often forget empty/error/loading states.
**Decision:** Every screen must define loading / empty / error / success before implementation.
**Consequences:** `14_EMPTY_LOADING_ERROR_STATES.md` is consulted during design review.

## D-009 - Bottom nav hides on sticky-CTA screens
**Status:** Accepted
**Context:** Avoid bottom-nav and sticky-CTA competing for thumb zone.
**Decision:** When a screen has a sticky primary CTA, the bottom nav is hidden.
**Consequences:** Easier thumb reach; better focus.

## D-010 - Spacing scale is 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 56 / 72
**Status:** Accepted
**Context:** Avoid arbitrary spacing values.
**Decision:** All spacing uses these tokens. No other values permitted.
**Consequences:** Spacing tokens are the only source.

## D-011 - Inter is the only font
**Status:** Accepted
**Context:** Brand identity and licensing.
**Decision:** Inter only. Weights 400, 500, 600, 700.
**Consequences:** No font-family additions in implementation.

## D-012 - XOF currency never displays decimals
**Status:** Accepted
**Context:** CFA franc is non-decimal.
**Decision:** Always `XX XXX FCFA` (no decimals).
**Consequences:** Currency formatter hardcodes no-decimal.

## D-013 - Status colour always pairs with icon + label
**Status:** Accepted
**Context:** Accessibility (colour-only meaning is forbidden).
**Decision:** Every status tone is paired with a status icon and a text label.
**Consequences:** `StatusChip` is canonical.

## D-014 - Touch targets ≥ 44 dp
**Status:** Accepted
**Context:** Accessibility baseline.
**Decision:** Minimum 44 × 44 dp touch target on every interactive element.
**Consequences:** QA gates check this.

## D-015 - Server-derived state never duplicated in UI state
**Status:** Accepted
**Context:** Avoid stale data.
**Decision:** UI state never mirrors server-derived state. Components read from server cache.
**Consequences:** Cache invalidation handled by the data layer.

## D-016 - Offline reads allowed; writes queued
**Status:** Accepted
**Context:** Network conditions in target market are not always reliable.
**Decision:** Orders / tracking / messages read from cache when offline. Cart and form drafts queue writes.
**Consequences:** Offline banner surfaces; sync indicator on queued items.

## D-017 - Pull-to-refresh on lists; never swipe-to-delete
**Status:** Accepted
**Context:** Discoverability and accident prevention.
**Decision:** Lists use pull-to-refresh. Destructive operations use explicit icon + confirmation.
**Consequences:** No accidental deletion.

## D-018 - Real photography only; no AI imagery
**Status:** Accepted
**Context:** Trust and authenticity.
**Decision:** Product imagery must be photography of real products. No AI-generated or 3D-rendered look.
**Consequences:** Asset strategy prefers real shoots.

## D-019 - Destructive actions confirm via bottom sheet
**Status:** Accepted
**Context:** Avoid accidents.
**Decision:** Destructive operations require explicit confirmation in a bottom sheet.
**Consequences:** Reviewer audits this.

## D-020 - One primary nav always visible (top-level tabs)
**Status:** Accepted
**Context:** Predictable navigation.
**Decision:** Bottom nav persists across all tab-rooted screens. Hidden only on detail/form screens.
**Consequences:** Five tabs: Accueil · Commandes · Produits · Messages · Profil.

---

## Open decisions (not yet resolved)

- OD-01 - Exact icon library (Lucide vs Phosphor) - to be ratified at Phase 1 implementation.
- OD-02 - Bambara string bank - copy pending native-speaker review.
- OD-03 - Dark theme scope - explicitly future; no commitment this cycle.
- OD-04 - Image-search UX for fallback when no match - to be refined during Phase 6.
- OD-05 - Specific payment methods exposed in 17 - depends on chosen provider.