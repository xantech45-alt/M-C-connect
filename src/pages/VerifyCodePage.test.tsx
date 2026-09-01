import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import VerifyCodePage from './VerifyCodePage';

describe('VerifyCodePage', () => {
  it('renders the heading, six digit inputs, and the primary CTA', () => {
    renderWithProviders(<VerifyCodePage />, { route: '/verify-code', state: { email: 'a@b.com' } });
    expect(screen.getByRole('heading', { name: 'Vérification' })).toBeInTheDocument();
    expect(screen.getAllByRole('textbox')).toHaveLength(6);
    expect(screen.getByRole('button', { name: 'Confirmer' })).toBeInTheDocument();
  });
});
