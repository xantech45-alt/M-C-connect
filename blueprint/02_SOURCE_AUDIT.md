# 02 - Source Audit

> Inventory of every supplied source asset used to build this blueprint.

---

## 1. Supplied artifacts

| Asset | Path | Type | Notes |
|-------|------|------|-------|
| M&C Connect product specification | `assets/project blueprint/M^0C Connect.docx` | DOCX | Primary product document |
| Mobile reference - early | `assets/project blueprint/Weixin Image_20260820111859_1_60.jpg` | JPG | First mobile interface reference |
| Mobile reference - later | `assets/project blueprint/Weixin Image_20260830162111_7_60.jpg` | JPG | Refined mobile interface reference |
| Product photography (clothing) | `assets/products/clothes-1..4.jpg` | JPG | Real product imagery |
| Product photography (jackets) | `assets/products/jacket-1..6.jpg` | JPG | Real product imagery |
| Product photography (shoes) | `assets/products/shoe-1..5.jpg` | JPG | Real product imagery |
| Product photography (shoes alt) | `assets/products/shoe-1_1.jpg`, `shoe-2_1.jpg` | JPG | Alternate angles |
| Product photography (shirts) | `assets/products/shirt-1..2.jpg` | JPG | Real product imagery |
| Product photography (shorts) | `assets/products/shorts-1..2.jpg` | JPG | Real product imagery |
| Product photography (sports) | `assets/products/sports-1..6.jpg` | JPG | Real product imagery |
| Product photography (jewellery) | `assets/products/jewellery-1..3.jpg` | JPG | Real product imagery |
| Product photography (party) | `assets/products/party-wear-1..2.jpg` | JPG | Real product imagery |
| Product photography (watches) | `assets/products/watch-1..4.jpg` | JPG | Real product imagery |
| Product photography (perfume) | `assets/products/perfume.jpg` | JPG | Real product imagery |
| Product photography (shampoo) | `assets/products/shampoo.jpg` | JPG | Real product imagery |
| Product photography (belt) | `assets/products/belt.jpg` | JPG | Real product imagery |
| Banner - hero / category | `assets/products/banner-1..3.jpg` | JPG | Banner imagery |
| Banner - CTA | `assets/products/cta-banner.jpg` | JPG | CTA banner imagery |
| Banner - electronics | `assets/products/electronics-banner-1..2.jpg` | JPG | Category banner |
| Banner - mens | `assets/products/mens-banner.jpg` | JPG | Category banner |
| Banner - womens | `assets/products/womens-banner.jpg` | JPG | Category banner |
| Blog / editorial | `assets/products/blog-1..4.jpg` | JPG | Editorial imagery |
| Testimonial | `assets/products/testimonial-1.jpg` | JPG | Editorial portrait |
| Category SVGs | `assets/products/bag.svg`, `coat.svg`, `cosmetics.svg`, `dress.svg`, `glasses.svg`, `hat.svg`, `jacket.svg`, `jewelry.svg`, `perfume.svg`, `quotes.svg`, `shoes.svg`, `shorts.svg`, `tee.svg`, `watch.svg` | SVG | Line-style category icons |
| Payment methods graphic | `assets/products/payment.png` | PNG | Payment logos graphic |
| Newsletter graphic | `assets/products/newsletter.png` | PNG | Email capture graphic |
| Hero index imagery | `assets/products/1..4.jpg` | JPG | Likely hero / generic product |

---

## 2. References extracted

### From supplied DOCX (`M^0C Connect.docx`)
- The product is positioned as a **managed B2B import service** for Mali.
- Customer does not contact Chinese suppliers directly.
- M&C handles: sourcing, verification, communication, negotiation, purchasing, QC, shipping, customs, delivery, support.
- Tone is professional, transparent, B2B-trustworthy.

### From supplied mobile screenshots
- **Bottom navigation** uses 5 destinations.
- **Home** combines search, current order visibility, categories, recommendations.
- **Product detail** is image-heavy with prominent price, MOQ, and CTAs.
- **Brand colour** is dominant red with neutral surfaces.
- **Typography** is sans-serif (Inter family).

### Visual references vs. product requirements

The supplied imagery skews toward fashion (clothing, shoes, jewellery, watches). The product scope is much broader - agricultural machinery, generators, solar, construction equipment, electronics, industrial supplies. The blueprint preserves the photographic quality bar while extending the category taxonomy to industrial / B2B.

---

## 3. Source-of-truth rules

1. **Product documentation is canonical** for business logic.
2. **Existing design tokens are canonical** for visual identity (M&C Red `#C4122F`, Inter, established spacing scale).
3. **Mobile screenshots** are reference for layout density, not literal pixel-for-pixel templates.
4. **Photography style** is preserved (clean background, neutral, product-centered) but extended to non-fashion categories.

When conflicts arise:
1. Preserve product business logic.
2. Preserve design-system rules.
3. Use visual references for composition inspiration.
4. Log the conflict in `21_DECISIONS.md`.

---

## 4. What is NOT supplied (intentional gaps)

| Missing | Assumption |
|---------|-----------|
| Real M&C logo file | Spec defines lockup, components render from placeholder |
| Icon set | Lucide / Phosphor outline style - to be confirmed at implementation |
| Bambara copy bank | Placeholder strings; final copy at localization phase |
| Categorized industrial photography | Future supply from M&C ops |
| Quality inspection photos | Future supply |
| Tracking state icons | Use line icons in `Shipping` and `Verified` style |

---

## 5. Audit checklist

- [x] DOCX exists and is parsed for business rules
- [x] Mobile references exist for layout reference
- [x] Photography exists and style is documented
- [x] Icon SVGs exist for category visualization
- [x] Banner / hero imagery exists
- [x] Payment logos asset exists
- [x] Editorial / blog imagery exists
- [x] Source-of-truth rules documented
- [x] Gaps acknowledged
- [x] Conflict resolution rule documented

---

## 6. Asset inventory summary

- 67 JPG product images
- 14 category SVG line icons
- 7 banner / hero JPGs
- 1 testimonial JPG
- 4 editorial JPGs
- 2 utility PNGs (payment, newsletter)
- 1 DOCX (business spec)
- 2 mobile reference JPGs