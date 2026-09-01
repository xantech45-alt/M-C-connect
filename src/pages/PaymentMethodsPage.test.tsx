import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DetailLayout } from '@/layouts/DetailLayout';
import { renderWithProviders } from '@/test/renderWithProviders';
import PaymentMethodsPage from './PaymentMethodsPage';

describe('PaymentMethodsPage', () => {
  it('renders the heading and the payment options', () => {
    renderWithProviders(
      <DetailLayout bare title="Moyens de paiement">
        <PaymentMethodsPage />
      </DetailLayout>,
      { route: '/payment-methods' },
    );
    expect(screen.getByRole('heading', { name: 'Moyens de paiement', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Mobile Money/ })).toBeInTheDocument();
  });
});
