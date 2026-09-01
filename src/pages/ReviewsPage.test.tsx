import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DetailLayout } from '@/layouts/DetailLayout';
import { renderWithProviders } from '@/test/renderWithProviders';
import ReviewsPage from './ReviewsPage';

describe('ReviewsPage', () => {
  it('renders the heading and a submitted review', () => {
    renderWithProviders(
      <DetailLayout bare title="Mes avis">
        <ReviewsPage />
      </DetailLayout>,
      { route: '/reviews' },
    );
    expect(screen.getByRole('heading', { name: 'Mes avis' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Veste coupe-vent homme' })).toBeInTheDocument();
  });
});
