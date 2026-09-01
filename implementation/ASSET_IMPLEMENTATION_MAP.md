# Asset Implementation Map

> Image, icon, and brand-asset sourcing.

---

## 1. Brand assets

| Asset | Status | Source |
|-------|--------|--------|
| M&C Connect wordmark | **To be supplied** | Use placeholder "M&C Connect" text lockup until supplied; one inline SVG monogram as a fallback |
| Logo file (PNG/SVG) | **Not supplied** | Inline SVG placeholder in `src/assets/brand/` |
| Inter font | Public (OFL) | Self-hosted woff2 in `public/fonts/inter/` or Google Fonts `<link>` for now |

## 2. Product photography

Source paths:

- `assets/products/*.jpg` - fashion-leaning but acceptable for catalog seed
- `assets/products/banner-*.jpg` - hero / category banners
- `assets/products/electronics-banner-*.jpg` - electronics category

Industrial categories (machinery, generators, solar, construction) have **no real photography yet**.
Per blueprint `09_ASSET_AND_IMAGE_STRATEGY.md`, placeholders are used and photography capture is
queued.

## 3. Category SVGs

`assets/products/*.svg` provides 14 outline SVGs. Additional category icons (machinery, generator,
solar, construction, electronics, industrial, agriculture) are added using Lucide line icons
(stroke 1.5 px, 24 px default, `--ink` default / `--mc-red` selected).

## 4. Payment

`assets/products/payment.png` exists. **Do not** display competitor logos. The payment screen uses
neutral labels (Mobile Money, Virement bancaire, Paiement à la livraison) and does not reproduce
the supplied PNG.

## 5. Performance

- All images served via `<img loading="lazy" decoding="async" width height>` with explicit aspect
  ratio to prevent CLS.
- Hero image: `eager` + `fetchpriority="high"`.
- Below-the-fold: `lazy`.
- WebP / AVIF where supported.
- Max display sizes per `12_RESPONSIVE_ARCHITECTURE.md` § 8.

## 6. Phase 1 - relocation and rename ledger

`assets/products/*` (72 files, repo root - unresolvable by Vite, §1.3 of the execution prompt)
was relocated into `src/` and renamed to semantic kebab-case slugs. Full per-slot asset key list
and route/component wiring: `ASSET_SLOT_MANIFEST.md`. This table is the move ledger only.

### 6.1 Product photography → `src/assets/catalog/*.jpg` (39 @ 800×700 + 4 @ ~765×765)

| Original | New filename |
|---|---|
| `1.jpg` | `soiree-elegante-1.jpg` |
| `2.jpg` | `soiree-elegante-2.jpg` |
| `3.jpg` | `soiree-elegante-3.jpg` |
| `4.jpg` | `soiree-elegante-4.jpg` |
| `belt.jpg` | `ceinture-cuir.jpg` |
| `clothes-1.jpg` … `clothes-4.jpg` | `robe-tendance-1.jpg` … `robe-tendance-4.jpg` |
| `jacket-1.jpg` … `jacket-4.jpg` | `veste-coupe-vent-1.jpg` … `veste-coupe-vent-4.jpg` |
| `jacket-5.jpg`, `jacket-6.jpg` | `veste-survetement-collection-1.jpg`, `-2.jpg` |
| `jewellery-1.jpg` … `jewellery-3.jpg` | `bijou-collier-plaque-or.jpg`, `bijou-bracelet-perles.jpg`, `bijou-boucles-oreilles.jpg` |
| `party-wear-1.jpg`, `party-wear-2.jpg` | `tenue-habillee-1.jpg`, `tenue-habillee-2.jpg` |
| `perfume.jpg` | `parfum-eau-de-toilette.jpg` |
| `shampoo.jpg` | `shampoing-professionnel.jpg` |
| `shirt-1.jpg`, `shirt-2.jpg` | `tenue-habillee-3.jpg`, `tenue-habillee-4.jpg` |
| `shoe-1.jpg`, `shoe-1_1.jpg`, `shoe-2.jpg`, `shoe-2_1.jpg` | `chaussure-ville-cuir-1.jpg` … `-4.jpg` |
| `shoe-3.jpg` | `chaussure-sport-tissu.jpg` |
| `shoe-4.jpg` | `chaussure-randonnee.jpg` |
| `shoe-5.jpg` | `sandale-confort.jpg` |
| `shorts-1.jpg`, `shorts-2.jpg` | `short-sport-homme.jpg`, `short-cycliste.jpg` |
| `sports-1.jpg` … `sports-4.jpg` | `ensemble-sportswear-1.jpg` … `-4.jpg` |
| `sports-5.jpg`, `sports-6.jpg` | `veste-survetement-collection-3.jpg`, `-4.jpg` |
| `watch-1.jpg` … `watch-4.jpg` | `montre-chronographe-1.jpg` … `-4.jpg` |

### 6.2 Marketing / editorial raster → `src/assets/catalog/*.jpg`

| Original | New filename |
|---|---|
| `banner-1.jpg`, `banner-2.jpg`, `banner-3.jpg` | `hero-banner-1.jpg`, `-2.jpg`, `-3.jpg` |
| `blog-1.jpg` … `blog-4.jpg` | `editorial-1.jpg` … `-4.jpg` |
| `cta-banner.jpg` | `promo-cta-banner.jpg` |
| `electronics-banner-1.jpg`, `electronics-banner-2.jpg` | `category-strip-electronics-1.jpg`, `-2.jpg` |
| `mens-banner.jpg` | `category-strip-mode-homme.jpg` |
| `womens-banner.jpg` | `category-strip-mode-femme.jpg` |
| `testimonial-1.jpg` | `avatar-temoignage.jpg` |
| `newsletter.png` (1000×1000, 1.7 MB) | **re-encoded** to `newsletter-signup.webp` (1000×1000, 107 KB, ffmpeg `libwebp -quality 65`) - original left in place, unreferenced, at `assets/products/newsletter.png` |
| `payment.png` | **not moved.** Forbidden asset (competitor payment logos) - left unreferenced at `assets/products/payment.png`, never imported anywhere in `src/`. |

### 6.3 Category SVGs → `src/assets/catalog/icons/*.svg` (unchanged filenames, relocated only)

`bag`, `coat`, `cosmetics`, `dress`, `glasses`, `hat`, `jacket`, `jewelry`, `perfume`, `quotes`,
`shoes`, `shorts`, `tee`, `watch` - 14 files, reserved (see §3 above; `IconRender` uses Lucide,
not this set).

### 6.4 Brand illustrations → `src/assets/brand/*.png`

| Original (`frontend desing and logic/`) | New filename | Assigned to |
|---|---|---|
| `c8275e51-be1b-4188-a458-3238472001bf.png` | `onboarding-1.png` | Onboarding slide 1 |
| `440c6975-a4a5-4c6d-be2d-afeef5b5deb4.png` | `onboarding-2.png` | Onboarding slide 2 |
| `dd4892bc-da28-4ad1-91a6-8cab12973c02.png` | `onboarding-3.png` | Onboarding slide 3 |
| `61670ee8-336a-4eb9-ae63-7356c6d07169.png` | `onboarding-4.png` | Onboarding slide 4 + order-tracking empty state |

### 6.5 Mockups → `docs/design-reference/` (verbatim filenames, never imported from `src/`)

`b49932ae-1816-4575-b280-daa4e01d1093.png`, `cdd66ddc-d40d-40fc-9096-50880dd5ca24.png`,
`94e294e7-ccf9-4cd7-a191-7667fefc7b5d.png` (+ its `(1)` duplicate), `8522b234-6f51-49a6-8d66-599d8415207e.png`,
`b70578d1-c316-44bc-9cc6-f6da7c54091c.png` (+ its `(1)` duplicate), `f8229b01-d100-4cdf-83dd-331e40315a85.png`,
`fa72251e-5098-4084-9b54-3605ef6c3fe7.png`. Enforced by Definition-of-Done check: no file under
`docs/design-reference/` is imported anywhere in `src/`.

### 6.6 Typed access

All of the above are consumed only through `src/assets/registry.ts` (`asset()`, `catalogIcon()`,
`brandAsset()`) - no component holds a raw string path. `src/assets/registry.test.ts` fails the
build if a raw `assets/catalog/…` path string appears in `src/`, or if any asset key backs more
than one product image slot.
