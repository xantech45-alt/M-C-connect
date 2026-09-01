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
});
