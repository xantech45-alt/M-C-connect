import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import ForgotPasswordPage from './ForgotPasswordPage';

describe('ForgotPasswordPage', () => {
  it('renders the heading and the primary CTA', () => {
    renderWithProviders(<ForgotPasswordPage />, { route: '/forgot-password' });
    expect(screen.getByRole('heading', { name: 'Mot de passe oublié' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Envoyer le code' })).toBeInTheDocument();
  });
});
