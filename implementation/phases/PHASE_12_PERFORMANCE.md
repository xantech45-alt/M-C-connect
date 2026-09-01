# Phase 12 - Performance

**Objective:** Core Web Vitals on mobile profile.
**Dependencies:** Phase 11.

## Checklist

- [ ] Route-level code splitting active.
- [ ] Recharts lazy-loaded on dashboard only.
- [ ] Lucide named imports (tree-shakable).
- [ ] `<img loading="lazy" decoding="async">` below the fold.
- [ ] Hero image `fetchpriority="high"` + `eager`.
- [ ] All `<img>` declare `width` / `height` matching aspect ratio (CLS-safe).
- [ ] Inter subsetted to Latin / Latin-Ext.
- [ ] No synchronous heavy operations in render.
- [ ] Bundle audit: initial JS ≤ 200 KB gzipped.

## Exit gate

- Lighthouse mobile ≥ 80 (Performance + Accessibility + Best Practices + SEO).
- LCP ≤ 2.5 s on throttled profile.
- CLS ≤ 0.1.
- INP ≤ 200 ms.
- `PERFORMANCE_REPORT.md` populated with measured numbers.
