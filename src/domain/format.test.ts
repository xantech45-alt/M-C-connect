import { describe, expect, it } from 'vitest';
import { formatDateFr } from './format';
import { formatXof } from './pricing';

describe('formatDateFr', () => {
  it('renders an ISO date in French, never the raw ISO string', () => {
    expect(formatDateFr('2026-09-22')).toBe('22 sept. 2026');
  });

  it('accepts custom options', () => {
    expect(formatDateFr('2026-10-05', { day: 'numeric', month: 'long' })).toBe('5 octobre');
  });

  it('returns the input unchanged when it is not a date', () => {
    expect(formatDateFr('bientôt')).toBe('bientôt');
  });
});

describe('formatXof', () => {
  it('labels amounts in FCFA (Master Spec INV-8)', () => {
    expect(formatXof(125000)).toMatch(/^125\s000 FCFA$/);
  });
});
