# Phase 09 - Relationship

**Objective:** Implement screens 23, 24 + profile/settings/support.
**Dependencies:** Phase 08.

## Screens

- [ ] **23 Messages** (`src/routes/Messages.tsx`)
  - `<MessageThread>` list.
  - Customer ↔ M&C only; never customer ↔ supplier.
  - Pull-to-refresh; unread badge.
- [ ] **24 Tableau de bord entreprise** (`src/routes/Dashboard.tsx`)
  - Period selector (sticky).
  - 4 `<KPIValue>` tiles: Dépenses totales · Commandes · Livrées · En cours.
  - Trend chart (Recharts line).
  - Category distribution (horizontal bar list).
  - Recent orders (3–5 cards).
  - Insight callout.
- [ ] **Profil** (`src/routes/Profile.tsx`)
  - Sections: business · security · language · notifications · support · logout.
  - Logout confirms via bottom sheet.

## Checklist

- [ ] Messaging threads load; messages send (mock).
- [ ] Dashboard renders with mock data; chart legible at 320 px.
- [ ] Profile supports language change, logout, and business info edit.
- [ ] One primary red CTA per screen.
- [ ] Empty / loading / error states defined.

## Exit gate

- Messages send + persist (mock).
- Dashboard renders.
- Profile settings complete.
