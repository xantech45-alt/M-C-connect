import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import PaymentPage from './PaymentPage';

describe('PaymentPage', () => {
  it('reveals transport and payment method progressively, and gates the final CTA', async () => {
    const user = userEvent.setup();
    renderWithProviders(<PaymentPage />, { route: '/checkout/payment' });

    // Transport and payment method are hidden until the prior step is chosen.
    expect(screen.queryByRole('radiogroup', { name: 'Mode de transport' })).not.toBeInTheDocument();
    expect(screen.queryByRole('radiogroup', { name: 'Moyen de paiement' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirmer et payer' })).toBeDisabled();

    await user.click(screen.getByRole('radio', { name: /Paiement unique/ }));
    expect(screen.getByRole('radiogroup', { name: 'Mode de transport' })).toBeInTheDocument();
    expect(screen.queryByRole('radiogroup', { name: 'Moyen de paiement' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('radio', { name: /Avion/ }));
    expect(screen.getByRole('radiogroup', { name: 'Moyen de paiement' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirmer et payer' })).toBeDisabled();

    expect(screen.getByRole('radio', { name: /Wave/ })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Orange Money/ })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Banque/ })).toBeInTheDocument();
    expect(screen.queryByText(/espèces/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/paiement à la livraison \(bamako\)/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole('radio', { name: /Wave/ }));
    expect(screen.getByRole('button', { name: 'Confirmer et payer' })).toBeEnabled();
  });
});
