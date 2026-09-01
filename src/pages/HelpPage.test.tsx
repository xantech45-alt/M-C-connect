import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DetailLayout } from '@/layouts/DetailLayout';
import { renderWithProviders } from '@/test/renderWithProviders';
import HelpPage from './HelpPage';

describe('HelpPage', () => {
  it('renders the heading and the primary CTA', () => {
    renderWithProviders(
      <DetailLayout bare title="Centre d'aide">
        <HelpPage />
      </DetailLayout>,
      { route: '/help' },
    );
    expect(screen.getByRole('heading', { name: "Centre d'aide" })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Contactez-nous' })).toBeInTheDocument();
  });
});
