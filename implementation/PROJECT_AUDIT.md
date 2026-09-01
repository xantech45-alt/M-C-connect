# Project Audit (Phase 0)

> Verbatim record of what existed before implementation, what was found in supplied assets, and the
> classification of every existing artefact.

---

## 1. Repository state - before implementation

| Path | Status | Action |
|------|--------|--------|
| `package.json` | **MISSING** | CREATE (Vite + React + TS) |
| `tsconfig.json` | **MISSING** | CREATE |
| `vite.config.ts` | **MISSING** | CREATE |
| `src/` | **MISSING** | CREATE (feature-oriented, see `02_LAYOUT_AND_SPACING_SYSTEM.md`) |
| `public/` | **MISSING** | CREATE |
| `index.html` | **MISSING** | CREATE |
| `components/` | **MISSING** | CREATE under `src/components` |
| `pages/` | **MISSING** | RENAME concept to `src/routes` |
| `features/` | **MISSING** | CREATE under `src/features` |
| `hooks/`, `layouts/`, `state/`, `services/`, `data/`, `styles/`, `i18n/`, `types/`, `utils/` | **MISSING** | CREATE |
| Existing components, routes, stores, styles, utils | **N/A** | Nothing exists; nothing to preserve |
| Existing mock data | **N/A** | BUILD mock layer in `src/data/mock/` |
| Existing images / fonts / icon library / CSS framework / UI library / design tokens | **N/A** | Bootstrap using blueprint tokens; use Inter via Google Fonts (or local subset) and Lucide icons |

### Classification summary

- **KEEP:** nothing - no existing code.
- **REFINE:** nothing.
- **REFACTOR:** nothing.
- **REPLACE:** nothing.
- **REMOVE:** nothing.
- **MISSING:** the entire React frontend.

> Per spec section 6 ("DO NOT REBUILD WORK THAT ALREADY EXISTS"): there is no work to preserve.
> We build from scratch using the blueprint as the authoritative contract.

---

## 2. Supplied artefacts (from `02_SOURCE_AUDIT.md`)

| Asset | Path | Use |
|-------|------|-----|
| Business spec (DOCX) | `frontend desing and logic/M^0C Connect.docx` | Read for business rules (customer does not contact supplier, M&C handles everything) |
| Mobile reference #1 (JPG) | `frontend desing and logic/Weixin Image_20260820111859_1_60.jpg` | Layout / composition inspiration |
| Mobile reference #2 (JPG) | `frontend desing and logic/Weixin Image_20260830162111_7_60.jpg` | Refined home / 5-screen system inspiration |
| Product photography | `assets/products/*.jpg` | Real product imagery (fashion-leaning; we extend to industrial via placeholders) |
| Category SVGs | `assets/products/*.svg` | Outline icons for category tiles |
| Banner imagery | `assets/products/banner-*.jpg` | Home hero candidate |
| `payment.png` | `assets/products/payment.png` | Reference for payment screen layout (we do **not** copy the brand mark) |
| Logo file | **NOT SUPPLIED** | Use a wordmark "M&C Connect" placeholder; replace when supplied |

---

## 3. Source priority (from spec section 4)

1. `/blueprint` (approved plan)
2. M&C business rules
3. PPT (mobile references)
4. Existing functioning architecture (none)
5. Supplied visual references
6. Fresh UX research
7. Engineering judgement
8. Assumptions

---

## 4. Visual reference → blueprint mapping

| Reference feature | Blueprint section | Adopt? |
|-------------------|-------------------|--------|
| White surface + restrained red | `05_DESIGN_SYSTEM.md` § 2 | Adopt |
| Bottom navigation 5 tabs | `04_NAVIGATION_ARCHITECTURE.md` § 1 | Adopt |
| Hero with trade imagery | `00_MASTER_FRONTEND_BLUEPRINT.md` § 5 + `screens/04_HOME.md` | Adopt |
| Search + image-search on Home | `03_INFORMATION_ARCHITECTURE.md` § 4 | Adopt |
| Product detail gallery + sticky CTA | `screens/10_PRODUCT_DETAIL.md` | Adopt |
| Cart with line items + summary | `screens/15_CART.md` | Adopt |
| Dashboard KPI tiles | `screens/24_BUSINESS_DASHBOARD.md` + `16_ANALYTICS_UI_PLAN.md` | Adopt |
| Brand mark on every screen | Use wordmark "M&C Connect"; never copy supplied brand | Adapt |

---

## 5. Acceptance gate for Phase 0

- [x] Repository audited (nothing to preserve; clean slate).
- [x] Supplied artefacts inventoried.
- [x] Source priority defined.
- [x] Visual-reference → blueprint mapping recorded.
- [x] Existing decisions in `blueprint/21_DECISIONS.md` ratified.

→ Phase 0 exits with **APPROVED**. Implementation may begin.
