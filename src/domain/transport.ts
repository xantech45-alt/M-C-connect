/**
 * Transport-mode domain rules. A product declares which modes it can ship
 * by (air, sea, or both); cart/checkout logic derives the modes valid for
 * a whole order from the intersection across every line.
 */

export type TransportMode = 'air' | 'sea';

export const TRANSPORT_MODES: TransportMode[] = ['air', 'sea'];

export const TRANSPORT_LABELS: Record<TransportMode, string> = {
  air: 'Avion',
  sea: 'Bateau',
};

/** Customer-facing delivery timing per mode - the only timing wording the app should show. */
export const TRANSPORT_TIMING: Record<TransportMode, string> = {
  air: '2 semaines à 1 mois',
  sea: '3 à 4 mois',
};

/** Informational rate only - never multiplied by an invented product weight. */
export const AIR_RATE_XOF_PER_KG = 10000;

/**
 * Modes available for a single product's transport eligibility list.
 */
export function describeTransportAvailability(modes: TransportMode[]): string {
  if (modes.includes('air') && modes.includes('sea')) return 'Avion ou Bateau';
  if (modes.includes('air')) return 'Avion';
  if (modes.includes('sea')) return 'Bateau';
  return '';
}

/**
 * Intersection of transport modes across every line in a cart/order. An
 * empty cart has no meaningful restriction (returns both modes); a cart
 * whose items share no common mode returns an empty array, which callers
 * must treat as a hard block requiring the order to be split.
 */
export function getCommonTransportModes(lineModes: TransportMode[][]): TransportMode[] {
  if (lineModes.length === 0) return [...TRANSPORT_MODES];
  return TRANSPORT_MODES.filter((mode) => lineModes.every((modes) => modes.includes(mode)));
}
