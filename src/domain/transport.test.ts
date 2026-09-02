import { describe, expect, it } from 'vitest';
import { describeTransportAvailability, getCommonTransportModes } from './transport';

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
