import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  it('renders the heading and the primary CTA', () => {
    renderWithProviders(<LoginPage />, { route: '/login' });
    expect(screen.getByRole('heading', { name: 'Connexion' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Se connecter' })).toBeInTheDocument();
  });
});
