import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import ProfilePage from './ProfilePage';

describe('ProfilePage', () => {
  it('renders the identity heading and the logout CTA', () => {
    renderWithProviders(<ProfilePage />, { route: '/profile' });
    expect(screen.getByRole('heading', { name: 'Votre entreprise' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Se déconnecter' })).toBeInTheDocument();
  });

  it('has no link to the discontinued returns feature', () => {
    renderWithProviders(<ProfilePage />, { route: '/profile' });
    expect(screen.queryByRole('link', { name: /Retours/ })).not.toBeInTheDocument();
  });
});
