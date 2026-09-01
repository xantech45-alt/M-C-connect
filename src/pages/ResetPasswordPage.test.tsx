import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import ResetPasswordPage from './ResetPasswordPage';

describe('ResetPasswordPage', () => {
  it('renders the heading and the primary CTA', () => {
    renderWithProviders(<ResetPasswordPage />, { route: '/reset-password' });
    expect(screen.getByRole('heading', { name: 'Réinitialiser le mot de passe' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enregistrer' })).toBeInTheDocument();
  });
});
