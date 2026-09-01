import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import ResetSuccessPage from './ResetSuccessPage';

describe('ResetSuccessPage', () => {
  it('renders the heading and the primary CTA', () => {
    renderWithProviders(<ResetSuccessPage />, { route: '/reset-success' });
    expect(screen.getByRole('heading', { name: 'Mot de passe réinitialisé' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Se connecter' })).toBeInTheDocument();
  });
});
