import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DetailLayout } from '@/layouts/DetailLayout';
import { renderWithProviders } from '@/test/renderWithProviders';
import AddressFormPage from './AddressFormPage';

describe('AddressFormPage', () => {
  it('renders the heading and the primary CTA', () => {
    renderWithProviders(
      <DetailLayout bare title="Ajouter une adresse">
        <AddressFormPage />
      </DetailLayout>,
      { route: '/addresses/new' },
    );
    expect(screen.getByRole('heading', { name: 'Ajouter une adresse' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enregistrer' })).toBeInTheDocument();
  });
});
