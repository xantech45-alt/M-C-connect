import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DetailLayout } from '@/layouts/DetailLayout';
import { renderWithProviders } from '@/test/renderWithProviders';
import SearchResultsPage from './SearchResultsPage';

describe('SearchResultsPage', () => {
  it('renders result rows with a quick-add button', () => {
    renderWithProviders(
      <DetailLayout bare title="Résultats">
        <SearchResultsPage />
      </DetailLayout>,
      { route: '/search/results' },
    );
    expect(screen.getByRole('heading', { name: 'Résultats', level: 1 })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Ajouter .* au panier/ }).length).toBeGreaterThan(0);
  });
});
