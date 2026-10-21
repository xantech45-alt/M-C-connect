import { useSyncExternalStore } from 'react';

/**
 * Shell breakpoints. Below 900px the fixed BottomNav is used; 900-1023px
 * the LeftRailNav; at 1024px+ the desktop shell (single-row header with a
 * horizontal section nav, centered content, footer) and no rail.
 */
export const RAIL_QUERY = '(min-width: 900px) and (max-width: 1023px)';
export const DESKTOP_QUERY = '(min-width: 1024px)';
/** True whenever the bottom tab bar is NOT shown (rail or desktop). */
export const NO_BOTTOM_NAV_QUERY = '(min-width: 900px)';

/** SSR/jsdom-safe media query hook backed by useSyncExternalStore. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
