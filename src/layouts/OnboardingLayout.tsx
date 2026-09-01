import type { ReactNode } from 'react';
import styles from './OnboardingLayout.module.css';

/**
 * Full-screen layout used by onboarding (no nav, no app bar).
 * Children fill the viewport.
 */
export function OnboardingLayout({ children }: { children: ReactNode }) {
  return <div className={styles.root}>{children}</div>;
}
