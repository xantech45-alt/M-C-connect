import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DetailLayout } from '@/layouts/DetailLayout';
import { renderWithProviders } from '@/test/renderWithProviders';
import FavoritesPage from './FavoritesPage';

describe('FavoritesPage', () => {
  it('renders the heading and the empty state when no favorites are saved', () => {
    renderWithProviders(
      <DetailLayout bare title="Favoris">
        <FavoritesPage />
      </DetailLayout>,
      { route: '/favorites' },
    );
    expect(screen.getByRole('heading', { name: 'Favoris' })).toBeInTheDocument();
    expect(screen.getByText('Aucun favori pour le moment')).toBeInTheDocument();
  });
});
