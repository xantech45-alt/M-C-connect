# Phase 03 - Application shell

**Objective:** Router, layout, bottom nav, top app bar, sticky action bar, sheet, modal.
**Dependencies:** Phase 02.

## Checklist

- [ ] `src/app/App.tsx` mounts `LocaleProvider` → `AuthProvider` → `OfflineProvider` → `RouterProvider`.
- [ ] Router: `createBrowserRouter` with nested layouts.
- [ ] `<TabsLayout>` renders bottom nav + top app bar with conditional sticky CTA suppression.
- [ ] `<DetailLayout>` renders top app bar + sticky CTA, hides bottom nav.
- [ ] `<OnboardingLayout>` renders full-screen content (no nav, no app bar).
- [ ] `<BottomNav>`:
  - 5 tabs (Accueil · Commandes · Produits · Messages · Profil).
  - 64 dp + safe-area height.
  - Hairline top border.
  - Active tab `--mc-red`; inactive `--slate`.
  - Hidden on detail / form routes.
- [ ] `<TopAppBar>`:
  - Default (back · title · contextual action) at 56 dp.
  - With tabs at 88 dp.
  - Transparent overlay variant for image gallery.
  - Safe-area padding-top.
- [ ] `<StickyBar>`:
  - 72 dp + safe-area bottom.
  - Full-width primary CTA + optional secondary.
  - Always hides bottom nav via layout.
- [ ] `<BottomSheet>`: drag handle, three snap points, scrim, esc-to-close, focus trap.
- [ ] `<Modal>`: default and full-screen variants; focus trap; esc-to-close.
- [ ] `<Toast>` provider + queue + `aria-live="polite"`.

## Files

- `src/layouts/TabsLayout.tsx`
- `src/layouts/DetailLayout.tsx`
- `src/layouts/OnboardingLayout.tsx`
- `src/components/composite/BottomNav.tsx`
- `src/components/composite/TopAppBar.tsx`
- `src/components/composite/StickyBar.tsx`
- `src/components/ui/BottomSheet.tsx`
- `src/components/ui/Modal.tsx`
- `src/components/ui/Toast.tsx`

## Exit gate

- Tabs navigate correctly (each tab resets to its root on re-tap).
- Bottom nav hides on every `/product/:id*`, `/cart`, `/checkout/*`, `/orders/:id*`, `/rfq/:id*`, `/image-search`.
- Sticky CTA on a sample detail page never collides with bottom nav.
- Esc closes sheet; focus returns to the trigger.
