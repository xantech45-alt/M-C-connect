import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DetailLayout } from '@/layouts/DetailLayout';
import { renderWithProviders } from '@/test/renderWithProviders';
import AddressesPage from './AddressesPage';

describe('AddressesPage', () => {
  it('renders the heading and the "Ajouter" CTA', () => {
    renderWithProviders(
      <DetailLayout bare title="Mes adresses">
        <AddressesPage />
      </DetailLayout>,
      { route: '/addresses' },
    );
    expect(screen.getByRole('heading', { name: 'Mes adresses', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ajouter/ })).toBeInTheDocument();
  });
});
