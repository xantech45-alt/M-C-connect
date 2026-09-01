# Phase 01 - Foundation

**Objective:** Bootstrap Vite + React 18 + TypeScript + React Router + Lucide + Recharts + Vitest.
**Dependencies:** Phase 00.

## Checklist

- [ ] `package.json` with:
  - `react`, `react-dom` (^18)
  - `react-router-dom` (^6)
  - `lucide-react`
  - `recharts`
  - `clsx` (className helper)
- [ ] Dev deps: `vite`, `@vitejs/plugin-react`, `typescript`, `eslint`, `@typescript-eslint/*`, `prettier`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`, `@axe-core/react`.
- [ ] `tsconfig.json` (strict, `noImplicitAny`, path alias `@/*` → `src/*`).
- [ ] `vite.config.ts` with `@/*` alias and `vitest` config.
- [ ] `index.html` with Inter preload, viewport meta, theme-color, manifest link.
- [ ] `.eslintrc.cjs` extending `eslint:recommended` + `plugin:@typescript-eslint/recommended` + React rules.
- [ ] `.prettierrc`.
- [ ] Scripts: `dev`, `build`, `preview`, `lint`, `format`, `typecheck`, `test`.
- [ ] `README.md` (project root) with run instructions.

## Folder skeleton

```
src/
├── app/
│   └── App.tsx
├── routes/
├── features/
│   ├── auth/
│   ├── home/
│   ├── categories/
│   ├── search/
│   ├── product/
│   ├── compare/
│   ├── rfq/
│   ├── cart/
│   ├── checkout/
│   ├── orders/
│   ├── quality/
│   ├── messages/
│   ├── dashboard/
│   ├── profile/
│   └── image-search/
├── components/
│   ├── primitives/
│   ├── ui/
│   └── composite/
├── layouts/
├── hooks/
├── state/
├── services/
├── data/
│   └── mock/
├── assets/
│   └── brand/
├── styles/
│   ├── tokens.css
│   ├── globals.css
│   └── reset.css
├── i18n/
│   └── strings/
├── types/
├── utils/
└── __tests__/
```

## Exit gate

- `npm run dev` boots and shows a placeholder.
- `npm run build` succeeds.
- `npm run typecheck` succeeds.
- `npm run lint` passes.
- `npm run test` runs (no tests yet).
