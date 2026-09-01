# Performance Report

> Targets and measured results. Filled in after Phase 12.

---

## 1. Targets (per spec section 70)

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 80 on mobile profile |
| First Meaningful Paint | ≤ 2.5 s on mid-range Android |
| LCP (Largest Contentful Paint) | ≤ 2.5 s |
| CLS (Cumulative Layout Shift) | ≤ 0.1 |
| INP (Interaction to Next Paint) | ≤ 200 ms |
| Initial JS bundle | ≤ 200 KB gzipped |
| Per-route bundle | ≤ 80 KB gzipped where possible |
| Image weight (product card) | ≤ 60 KB target |

## 2. Strategy

- **Route-level code splitting** via `React.lazy` + `<Suspense>` for detail / form routes.
- **Lazy-load below-the-fold imagery** with `loading="lazy"`.
- **Hero image** marked `loading="eager"` + `fetchpriority="high"`.
- **Inter** subset to Latin / Latin-Ext; preload `<link rel="preload" as="font" crossorigin>`.
- **No layout shift**: every `<img>` declares `width` and `height` matching its aspect ratio.
- **Recharts** lazy-loaded only on `/dashboard`.
- **Icon tree-shaking**: import named icons from `lucide-react` (ESM tree-shakable).
- **No image CDNs needed yet**; local public folder for mock data; production moves to CDN.

## 3. Measurement plan

- `vite build --mode production` then serve via `vite preview`.
- Chrome DevTools Performance panel (throttled to "Slow 4G" + 4× CPU).
- `lighthouse` CLI on representative routes (`/`, `/product/:id`, `/checkout/review`, `/dashboard`).
- Run on a 360-wide viewport simulation.

## 4. Status

All metrics PENDING until Phase 12 closes.
