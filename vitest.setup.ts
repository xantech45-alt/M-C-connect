import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement matchMedia. Several components read
// `prefers-reduced-motion` (e.g. HeroCarousel) - a minimal always-`false`
// stub is enough for those checks to run without throwing in tests.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }) as unknown as MediaQueryList;
}
