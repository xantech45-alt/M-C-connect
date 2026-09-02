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

**Phase 7 pass (2026-09-01)** - measured via `chrome-devtools-mcp` performance traces against the
production build (`vite build` + `vite preview`, port 5197/5198), 4x CPU throttle + Slow 4G
network throttle, 360×800 mobile viewport - not the dev server, which is unbundled/unminified and
not representative.

| Metric | Target | Measured (`/home`) | Status |
|--------|--------|---------------------|--------|
| Lighthouse Accessibility | - | 100/100 | PASS |
| Lighthouse Best Practices | - | 100/100 | PASS |
| Lighthouse SEO | - | 100/100 (after adding `public/robots.txt`) | PASS |
| LCP | ≤ 2.5 s | 3.70 s (down from 5.55 s - see below) | Above target under this throttle profile |
| CLS | ≤ 0.1 | 0.00 | PASS |
| Initial JS (index + react, gzip) | ≤ 200 KB | ~134.8 KB (67.36 + 67.47) | PASS |
| Per-route bundle (heaviest: `/dashboard`, Recharts) | ≤ 80 KB gzip where possible | 110.97 KB (Recharts, isolated to its own chunk, not in initial bundle) | Over the per-route guideline but correctly isolated - only loads for the one route that needs it |

**Fix applied:** `/home` was lazy-loaded (`React.lazy`) like every other route, which meant the
LCP image (`hero-banner-1`) wasn't discoverable until a full extra dynamic-import round-trip had
completed (Lighthouse's `LCPDiscovery` insight: "Request is discoverable in initial document:
FAILED"). Since `/home` is the overwhelmingly likely first-visited route, made it a static
top-level import instead (`AppRouter.tsx`) - it now ships inside the main `index-*.js` chunk
instead of its own lazy chunk. Measured effect: LCP 5,553 ms → 3,698 ms, load delay
4,590 ms → 2,736 ms. Initial bundle grew from ~123 KB to ~135 KB gzip (still well under the 200 KB
budget) since Home's code moved from a lazy chunk into the eager one.

**Not chased further:** the remaining LCP gap versus the 2.5s target is dominated by base
React + app-shell JS parse/eval time under 4x CPU throttling - closing it further would need
either a smaller framework or SSR/streaming, both out of scope for "extend never restart" on this
stack. The render-blocking CSS request (single stylesheet, ~600ms under Slow 4G) offers only a
~488ms FCP save with 0ms LCP impact - not worth inlining critical CSS for.

**Not yet measured:** `/checkout/review` and `/dashboard` (the other two "representative routes"
in §3) were not traced this pass - PENDING. Real device / CrUX field data is not available
(local-only project, no deployment).
