import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import OnboardingPage from './OnboardingPage';

describe('OnboardingPage', () => {
  it('renders the first slide heading and the primary CTA', () => {
    renderWithProviders(<OnboardingPage />, { route: '/' });
    expect(screen.getByRole('heading', { name: 'Bienvenue sur M&C Connect' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Suivant' })).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(5);
  });
});
