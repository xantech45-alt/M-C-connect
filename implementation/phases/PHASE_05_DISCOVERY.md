# Phase 05 - Discovery

**Objective:** Implement screens 04–09.
**Dependencies:** Phase 04.

## Screens

- [ ] **04 Accueil** (`src/routes/Home.tsx`)
  - Search input + image-search button.
  - Current order card.
  - Categories strip.
  - Recommendations.
  - Recent activity.
- [ ] **05 Toutes les catégories** (`src/routes/Categories.tsx`)
  - 3-col grid on tablet, 2-col on phone.
  - `<CategoryTile>` composite.
- [ ] **06 Recherche active** (`src/routes/Search.tsx`)
  - Search input with debounce.
  - Recent searches + suggestions.
  - Camera entry.
- [ ] **07 Résultats de recherche** (`src/routes/SearchResults.tsx`)
  - `ProductCard` grid (2 col phone, 3 col tablet).
  - Sort + Filter entry.
  - Empty state with category chips.
- [ ] **08 Filtres** (`src/components/feature/FilterSheet.tsx`)
  - Bottom sheet.
  - Categories, price, MOQ, delivery period.
  - Reset · Apply.
- [ ] **09 Recherche par image** (`src/routes/ImageSearch.tsx`)
  - Full-screen modal layout.
  - Camera + upload + preview + analyse.
  - Mock returns empty set with friendly empty state.

## Checklist

- [ ] Search debounced at 250 ms.
- [ ] Filter state shared between results and sheet.
- [ ] Image search renders offline error when `navigator.onLine === false`.
- [ ] One primary red CTA per screen.
- [ ] Empty / loading / error states defined.

## Exit gate

- Home renders with mock data.
- Search returns mock results within 500 ms.
- Filter applies and updates URL.
- Image search screen renders.
