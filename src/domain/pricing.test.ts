import { describe, expect, it } from 'vitest';
import { getCartCustomerTotal, getProductCustomerTotal } from './pricing';

describe('pricing', () => {
  it('increases the product total when quantity increases', () => {
    const product = { priceMinXof: 10000 };
    const one = getProductCustomerTotal(product, 1);
    const ten = getProductCustomerTotal(product, 10);
    expect(ten.totalXof).toBeGreaterThan(one.totalXof);
  });

  it('never returns a total lower than the raw merchandise price', () => {
    const product = { priceMinXof: 10000 };
    const total = getProductCustomerTotal(product, 3);
    expect(total.totalXof).toBeGreaterThan(10000 * 3);
  });

  it('sums multiple cart lines into a single total', () => {
    const lines = [
      { unitPriceXof: 10000, quantity: 2 },
      { unitPriceXof: 5000, quantity: 4 },
    ];
    const total = getCartCustomerTotal(lines);
    const singleLineEquivalent = getCartCustomerTotal([{ unitPriceXof: 1, quantity: 20000 + 20000 }]);
    expect(total.totalXof).toBe(singleLineEquivalent.totalXof);
  });

  it('exposes only a total field - no freight/duty/vat/service breakdown', () => {
    const total = getProductCustomerTotal({ priceMinXof: 1000 }, 1);
    expect(Object.keys(total)).toEqual(['totalXof']);
  });
});
