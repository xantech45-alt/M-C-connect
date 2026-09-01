import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DetailLayout } from '@/layouts/DetailLayout';
import { renderWithProviders } from '@/test/renderWithProviders';
import ContactPage from './ContactPage';

describe('ContactPage', () => {
  it('renders the heading and the primary CTA', () => {
    renderWithProviders(
      <DetailLayout bare title="Contactez-nous">
        <ContactPage />
      </DetailLayout>,
      { route: '/contact' },
    );
    expect(screen.getByRole('heading', { name: 'Contactez-nous' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Envoyer le message' })).toBeInTheDocument();
  });
});
