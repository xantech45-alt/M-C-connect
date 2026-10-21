import { screen, within } from '@testing-library/react';
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

  it('renders a curated two-row category grid (2 x 4) linking to the full list', () => {
    renderWithProviders(<HomePage />, { route: '/home' });
    const grid = screen.getByTestId('home-category-grid');
    const tiles = within(grid).getAllByRole('link');
    expect(tiles).toHaveLength(8);
    expect(within(grid).queryByText('Plus')).not.toBeInTheDocument();
    const categories = screen.getByRole('region', { name: 'Catégories' });
    expect(within(categories).getByRole('link', { name: /Voir tout/ })).toHaveAttribute('href', '/categories');
  });

  it('orders the top stack as active order -> categories -> flash offers, with no section padding between them', () => {
    renderWithProviders(<HomePage />, { route: '/home' });
    const order = screen.getByRole('region', { name: 'Commande en cours' });
    const cats = screen.getByRole('region', { name: 'Catégories' });
    const flash = screen.getByRole('region', { name: 'Offres flash' });
    expect(order.compareDocumentPosition(cats) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(cats.compareDocumentPosition(flash) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // All three share one parent stack and none adds its own vertical padding.
    expect(order.parentElement).toBe(cats.parentElement);
    expect(cats.parentElement).toBe(flash.parentElement);
    for (const el of [order, cats, flash]) {
      expect(el.className).toMatch(/spacing-none/);
    }
  });

  it('Suivi rapide shows a real in-flight order from the fixtures and links to its tracking page', () => {
    renderWithProviders(<HomePage />, { route: '/home' });
    const order = screen.getByRole('region', { name: 'Commande en cours' });
    expect(within(order).getByRole('heading')).toHaveTextContent(/MC-000123 · Expédition - arrivée estimée le 22 sept\./);
    expect(within(order).getByRole('link', { name: /Suivre/ })).toHaveAttribute('href', '/orders/MC-000123');
  });

  it('labels the trust strip in French (no English customer copy)', () => {
    renderWithProviders(<HomePage />, { route: '/home' });
    expect(screen.getByText('Contrôle qualité inclus')).toBeInTheDocument();
    expect(screen.queryByText('M&C Quality Control')).not.toBeInTheDocument();
  });
});
