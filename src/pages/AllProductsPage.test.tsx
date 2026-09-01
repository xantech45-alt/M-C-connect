import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import AllProductsPage from './AllProductsPage';

describe('AllProductsPage', () => {
  it('renders the heading and the filter button', () => {
    renderWithProviders(<AllProductsPage />, { route: '/products' });
    expect(screen.getByRole('heading', { name: 'Tous les produits' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ouvrir les filtres' })).toBeInTheDocument();
  });
});
