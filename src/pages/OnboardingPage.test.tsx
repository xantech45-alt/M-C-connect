import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import OnboardingPage from './OnboardingPage';

function renderAt(route: string) {
  return renderWithProviders(
    <Routes>
      <Route path="/" element={<OnboardingPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/home" element={<p>Page accueil</p>} />
    </Routes>,
    { route },
  );
}

describe('OnboardingPage', () => {
  afterEach(() => window.localStorage.clear());

  it('renders the first slide heading and the primary CTA', () => {
    renderWithProviders(<OnboardingPage />, { route: '/' });
    expect(screen.getByRole('heading', { name: 'Bienvenue sur M&C Connect' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Suivant' })).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(5);
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Déjà client ? Se connecter' })).toHaveAttribute('href', '/login');
  });

  it('"Passer" opens the public catalog and remembers the choice', async () => {
    renderAt('/');
    await userEvent.click(screen.getByRole('button', { name: 'Passer' }));
    expect(screen.getByText('Page accueil')).toBeInTheDocument();
    expect(window.localStorage.getItem('mc.onboarding.done')).toBe('1');
  });

  it('sends returning visitors on / straight to /home', () => {
    window.localStorage.setItem('mc.onboarding.done', '1');
    renderAt('/');
    expect(screen.getByText('Page accueil')).toBeInTheDocument();
  });

  it('still shows the carousel on /onboarding for returning visitors', () => {
    window.localStorage.setItem('mc.onboarding.done', '1');
    renderAt('/onboarding');
    expect(screen.getByRole('heading', { name: 'Bienvenue sur M&C Connect' })).toBeInTheDocument();
  });
});
