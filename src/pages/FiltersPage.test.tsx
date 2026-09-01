import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import FiltersPage from './FiltersPage';

describe('FiltersPage', () => {
  it('renders the heading and the primary CTA', () => {
    renderWithProviders(<FiltersPage />, { route: '/filters' });
    expect(screen.getByRole('heading', { name: 'Filtres' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Appliquer' })).toBeInTheDocument();
  });
});
