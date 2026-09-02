/**
 * Customer-facing pricing abstraction. Per the M&C product rule, customers
 * only ever see a final total - never the freight/insurance/duty/VAT/service
 * components that make it up. Those components stay private to this module
 * so a future backend can replace the calculation without any page changing.
 */

export interface CustomerPrice {
  totalXof: number;
}

interface PricedLine {
  unitPriceXof: number;
  quantity: number;
}

interface PricedProduct {
  priceMinXof: number;
}

const FREIGHT_RATE = 0.12;
const INSURANCE_RATE = 0.01;
const DUTY_RATE = 0.05;
const VAT_RATE = 0.18;
const SERVICE_FEE_RATE = 0.04;

/**
 * Internal-only cost breakdown. Do not export or render any of these
 * components on a customer-facing screen - only the resulting total.
 */
function totalFromMerchandise(merchandiseXof: number): number {
  const freight = Math.round(merchandiseXof * FREIGHT_RATE);
  const insurance = Math.round(merchandiseXof * INSURANCE_RATE);
  const duty = Math.round(merchandiseXof * DUTY_RATE);
  const vat = Math.round((merchandiseXof + freight + insurance + duty) * VAT_RATE);
  const serviceFee = Math.round((merchandiseXof + freight + insurance + duty + vat) * SERVICE_FEE_RATE);
  return merchandiseXof + freight + insurance + duty + vat + serviceFee;
}

export function getProductCustomerTotal(product: PricedProduct, quantity: number): CustomerPrice {
  const merchandiseXof = product.priceMinXof * Math.max(quantity, 1);
  return { totalXof: totalFromMerchandise(merchandiseXof) };
}

export function getCartCustomerTotal(lines: PricedLine[]): CustomerPrice {
  const merchandiseXof = lines.reduce((sum, l) => sum + l.unitPriceXof * l.quantity, 0);
  return { totalXof: totalFromMerchandise(merchandiseXof) };
}

export function formatXof(n: number): string {
  return `${n.toLocaleString('fr-FR')} XOF`;
}
