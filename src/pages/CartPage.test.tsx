import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { DetailLayout } from '@/layouts/DetailLayout';
import { renderWithProviders } from '@/test/renderWithProviders';
import CartPage from './CartPage';

describe('CartPage', () => {
  it('renders the empty state when there are no lines', () => {
    renderWithProviders(
      <DetailLayout bare title="Panier">
        <CartPage />
      </DetailLayout>,
      { route: '/cart' },
    );
    expect(screen.getByText('Votre panier est vide')).toBeInTheDocument();
  });

  describe('with items in the cart', () => {
    beforeEach(() => {
      window.localStorage.setItem(
        'mc.cart',
        JSON.stringify([{ productId: 'p-007', quantity: 50, unitPriceXof: 18500, moq: 50 }]),
      );
    });

    it('renders the line item and the checkout CTA', () => {
      renderWithProviders(
        <DetailLayout bare title="Panier">
          <CartPage />
        </DetailLayout>,
        { route: '/cart' },
      );
      expect(screen.getByRole('heading', { name: 'Panier (50)' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Passer à la caisse/ })).toBeInTheDocument();
    });
  });
});
