import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import BusinessProfilePage from './BusinessProfilePage';

describe('BusinessProfilePage', () => {
  it('asks for Nom and never RCCM/NIF/Raison sociale', () => {
    renderWithProviders(<BusinessProfilePage />, { route: '/profile-setup' });
    expect(screen.getByText('Nom *')).toBeInTheDocument();
    expect(screen.queryByText(/RCCM/)).not.toBeInTheDocument();
    expect(screen.queryByText(/NIF/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Raison sociale/)).not.toBeInTheDocument();
  });
});
