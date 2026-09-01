import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import RegisterPage from './RegisterPage';

describe('RegisterPage', () => {
  it('renders the heading and the primary CTA', () => {
    renderWithProviders(<RegisterPage />, { route: '/register' });
    expect(screen.getByRole('heading', { name: 'Créer un compte' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: "S'inscrire" })).toBeInTheDocument();
  });
});
