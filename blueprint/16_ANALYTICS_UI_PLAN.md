# 16 - Analytics UI Plan

> Screen 24 - Tableau de bord entreprise.

---

## 1. Screen mission

Help a Malian business buyer understand their import activity over time, track in-flight and delivered orders, and make better purchasing decisions - all on a mobile phone.

---

## 2. Information architecture

```
Dashboard
├── Period selector (sticky)
├── KPI tile row (4 tiles, 2×2 on small, 4×1 on XL)
├── Trend chart (spending or orders)
├── Category distribution (horizontal bar list)
├── Recent orders (3–5 cards)
└── Insight card (1 callout)
```

---

## 3. KPI tiles

| Tile | Definition | Format |
|------|-----------|--------|
| Dépenses totales | Sum of confirmed order totals | `XX XXX FCFA` |
| Commandes | Total placed count | integer |
| Livrées | Delivered count | integer |
| En cours | Pending + in-transit count | integer |

Each tile: big number + label + delta vs previous period (optional, if data is available).

---

## 4. Trend chart

- Single line chart over time.
- Default: monthly granularity.
- Switchable: weekly / monthly / yearly.
- Tap a point to see exact value.
- Y-axis: amount in FCFA; X-axis: time period labels localised.
- Charts must render legibly at 320 dp width.

## 5. Category distribution

- Horizontal bar list, top 5 categories.
- Each row: category name · bar · percentage of spend.
- Sorted descending.
- Tap a category to filter to that category's orders.

## 6. Recent orders

- 3–5 most recent orders.
- Each row: thumbnail · order title · status chip · amount.
- Tap to open order detail.

## 7. Insight card

- One prominent card at the bottom.
- Examples:
  - "Vous avez dépensé 23% de plus qu'au trimestre dernier."
  - "Catégorie la plus active : Machines agricoles."
  - "Délai moyen de livraison : 28 jours."
- Friendly tone, no jargon, no upsell.

---

## 8. Empty state

- Friendly headline: "Vos indicateurs apparaîtront ici."
- Body: "Passez votre première commande pour suivre vos dépenses et vos délais."
- CTA: "Découvrir les produits."

## 9. Mobile considerations

- KPI tiles never exceed 4 per row.
- Charts respect min height 200 dp.
- Recent orders scroll independently of KPIs.
- Period selector sticky at top.

## 10. Decisions

- D-AN01 Mobile layout only; desktop BI dashboard is not in scope.
- D-AN02 Empty state always available; never render fake data.
- D-AN03 Insights are descriptive, not promotional.