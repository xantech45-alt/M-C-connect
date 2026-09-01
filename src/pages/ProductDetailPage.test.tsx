import { screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import ProductDetailPage from './ProductDetailPage';

describe('ProductDetailPage', () => {
  it('renders the product title and both sticky CTAs', () => {
    renderWithProviders(
      <Routes>
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>,
      { route: '/product/p-007' },
    );
    expect(screen.getByRole('heading', { name: 'Veste coupe-vent homme', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ajouter au panier' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Acheter maintenant' })).toBeInTheDocument();
  });
});
