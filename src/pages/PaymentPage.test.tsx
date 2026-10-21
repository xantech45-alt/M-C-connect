import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import PaymentPage from './PaymentPage';

const seedCart = (...productIds: string[]) =>
  window.localStorage.setItem(
    'mc.cart',
    JSON.stringify(productIds.map((productId) => ({ productId, quantity: 1, unitPriceXof: 1000, moq: 1 }))),
  );

async function chooseAPlan() {
  const user = userEvent.setup();
  renderWithProviders(<PaymentPage />, { route: '/checkout/payment' });
  await user.click(screen.getByRole('radio', { name: /Paiement unique/ }));
  return user;
}

describe('PaymentPage', () => {
  afterEach(() => window.localStorage.clear());

  it('shows exactly two transport choices, Avion and Bateau, mutually exclusive', async () => {
    seedCart('p-003');
    const user = await chooseAPlan();
    const group = screen.getByRole('radiogroup', { name: 'Mode de transport' });
    const radios = within(group).getAllByRole('radio');
    expect(radios).toHaveLength(2);
    const avion = within(group).getByRole('radio', { name: /Avion/ });
    const bateau = within(group).getByRole('radio', { name: /Bateau/ });
    await user.click(avion);
    expect(avion).toBeChecked();
    await user.click(bateau);
    expect(bateau).toBeChecked();
    expect(avion).not.toBeChecked();
  });

  it('disables Avion with a reason for a sea-only product, without hiding it', async () => {
    seedCart('p-001');
    await chooseAPlan();
    const avion = screen.getByRole('radio', { name: /Avion/ });
    expect(avion).toBeDisabled();
    expect(avion).toHaveAccessibleDescription(/Non disponible pour « Téléviseur LED 43" Full HD »/);
    expect(screen.getByRole('radio', { name: /Bateau/ })).toBeEnabled();
  });

  it('disables Bateau for an air-only product', async () => {
    seedCart('p-011');
    await chooseAPlan();
    expect(screen.getByRole('radio', { name: /Bateau/ })).toBeDisabled();
    expect(screen.getByRole('radio', { name: /Avion/ })).toBeEnabled();
  });

  it('blocks checkout when the cart has no common transport mode', async () => {
    seedCart('p-001', 'p-011');
    await chooseAPlan();
    expect(screen.getByRole('radio', { name: /Avion/ })).toBeDisabled();
    expect(screen.getByRole('radio', { name: /Bateau/ })).toBeDisabled();
    expect(screen.getByRole('alert')).toHaveTextContent(/aucun mode de transport en commun/);
    expect(screen.queryByRole('radiogroup', { name: 'Moyen de paiement' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirmer et payer' })).toBeDisabled();
  });

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
