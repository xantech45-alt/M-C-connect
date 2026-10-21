import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import PaymentPage from './PaymentPage';
import OrderConfirmationPage from './OrderConfirmationPage';

describe('OrderConfirmationPage', () => {
  it('reflects the transport mode and payment plan chosen on PaymentPage (shared CheckoutProvider)', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <>
        <PaymentPage />
        <OrderConfirmationPage />
      </>,
      { route: '/checkout/payment' },
    );

    await user.click(screen.getByRole('radio', { name: /Paiement à la livraison/ }));
    await user.click(screen.getByRole('radio', { name: /Avion/ }));

    expect(screen.getAllByText(/2 semaines à 1 mois/).length).toBeGreaterThan(0);
    expect(screen.getByText(/60% réglé à la commande/)).toBeInTheDocument();
    expect(screen.queryByText('Livraison Bamako 30–45 j')).not.toBeInTheDocument();
  });

  it('never presents an unverified payment as a confirmed order', () => {
    renderWithProviders(<OrderConfirmationPage />, { route: '/checkout/confirmation' });
    expect(screen.getByRole('heading', { name: 'Commande enregistrée' })).toBeInTheDocument();
    expect(screen.getByText(/Paiement en cours de vérification, réponse sous 2 h/)).toBeInTheDocument();
    expect(screen.queryByText(/Commande confirmée/)).not.toBeInTheDocument();
  });
});
