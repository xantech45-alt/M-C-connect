import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders the hero carousel and the flash sale section', () => {
    renderWithProviders(<HomePage />, { route: '/home' });
    expect(screen.getByRole('heading', { name: 'Offres flash' })).toBeInTheDocument();
    expect(screen.getByText(/Se termine dans/)).toBeInTheDocument();
  });

  it('shows the M&C Connect slogan and drops the old trust strip and eyebrow', () => {
    renderWithProviders(<HomePage />, { route: '/home' });
    expect(screen.getAllByText('MC Connect the Connection beyond Borders').length).toBeGreaterThan(0);
    expect(screen.queryByText('Livraison rapide')).not.toBeInTheDocument();
    expect(screen.queryByText('Paiements sécurisés')).not.toBeInTheDocument();
    expect(screen.queryByText('Meilleurs prix')).not.toBeInTheDocument();
    expect(screen.queryByText(/Nouveau · Programme Sourcing/)).not.toBeInTheDocument();
  });
});
