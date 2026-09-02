import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import { categories } from '@/state/catalog';
import CategoriesPage from './CategoriesPage';

describe('CategoriesPage', () => {
  it('renders every category with either a representative photo or the icon fallback', () => {
    renderWithProviders(<CategoriesPage />, { route: '/categories' });
    categories.forEach((c) => {
      const link = screen.getByRole('link', { name: new RegExp(c.name) });
      if (c.imageUrl) {
        expect(link.querySelector('img')).toBeInTheDocument();
      } else {
        expect(link.querySelector('svg')).toBeInTheDocument();
      }
    });
  });
});
