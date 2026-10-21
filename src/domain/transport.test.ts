import { describe, expect, it } from 'vitest';
import { describeTransportAvailability, getCommonTransportModes, getTransportOptions } from './transport';

describe('getTransportOptions', () => {
  it('always returns both modes, air first, available when every line supports them', () => {
    const opts = getTransportOptions([{ title: 'A', transportModes: ['air', 'sea'] }]);
    expect(opts).toEqual([
      { mode: 'air', available: true },
      { mode: 'sea', available: true },
    ]);
  });

  it('disables air with a reason naming the sea-only product', () => {
    const [air, sea] = getTransportOptions([
      { title: 'Réfrigérateur 350L', transportModes: ['sea'] },
      { title: 'Montre', transportModes: ['air', 'sea'] },
    ]);
    expect(air).toEqual({ mode: 'air', available: false, reason: 'Non disponible pour « Réfrigérateur 350L »' });
    expect(sea.available).toBe(true);
  });

  it('counts several blocking products', () => {
    const [, sea] = getTransportOptions([
      { title: 'A', transportModes: ['air'] },
      { title: 'B', transportModes: ['air'] },
    ]);
    expect(sea.reason).toBe('Non disponible pour 2 produits de votre panier');
  });

  it('marks both modes unavailable for an incompatible cart', () => {
    const opts = getTransportOptions([
      { title: 'A', transportModes: ['air'] },
      { title: 'B', transportModes: ['sea'] },
    ]);
    expect(opts.every((o) => !o.available)).toBe(true);
  });

  it('keeps both modes available for an empty cart', () => {
    expect(getTransportOptions([]).every((o) => o.available)).toBe(true);
  });
});

describe('transport', () => {
  it('describes an air-only product', () => {
    expect(describeTransportAvailability(['air'])).toBe('Avion');
  });

  it('describes a sea-only product', () => {
    expect(describeTransportAvailability(['sea'])).toBe('Bateau');
  });

  it('describes a product available by both modes', () => {
    expect(describeTransportAvailability(['air', 'sea'])).toBe('Avion ou Bateau');
  });

  it('intersects a single air-only product to just air', () => {
    expect(getCommonTransportModes([['air']])).toEqual(['air']);
  });

  it('intersects a single sea-only product to just sea', () => {
    expect(getCommonTransportModes([['sea']])).toEqual(['sea']);
  });

  it('keeps both modes when every line supports both', () => {
    expect(getCommonTransportModes([['air', 'sea'], ['air', 'sea']])).toEqual(['air', 'sea']);
  });

  it('returns an empty array when an air-only and a sea-only product are combined', () => {
    expect(getCommonTransportModes([['air'], ['sea']])).toEqual([]);
  });

  it('narrows to the shared mode across a mixed cart', () => {
    expect(getCommonTransportModes([['air', 'sea'], ['air']])).toEqual(['air']);
  });
});
