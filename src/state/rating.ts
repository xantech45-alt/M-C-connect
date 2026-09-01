/**
 * Deterministic placeholder rating/review-count for a product, derived from
 * its id. No backend/review system exists yet - this keeps the same product
 * showing the same rating across renders and screens without hand-seeding
 * every catalog entry.
 */
export function getRating(productId: string): { value: number; count: number } {
  let hash = 0;
  for (let i = 0; i < productId.length; i += 1) {
    hash = (hash * 31 + productId.charCodeAt(i)) >>> 0;
  }
  const value = Math.round((3.8 + (hash % 111) / 100) * 10) / 10; // 3.8–4.9
  const count = 18 + (hash % 310); // 18–327
  return { value, count };
}
