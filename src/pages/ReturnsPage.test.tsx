import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DetailLayout } from '@/layouts/DetailLayout';
import { renderWithProviders } from '@/test/renderWithProviders';
import ReturnsPage from './ReturnsPage';

describe('ReturnsPage', () => {
  it('renders the heading and a return request', () => {
    renderWithProviders(
      <DetailLayout bare title="Retours et remboursements">
        <ReturnsPage />
      </DetailLayout>,
      { route: '/returns' },
    );
    expect(screen.getByRole('heading', { name: 'Retours et remboursements' })).toBeInTheDocument();
    expect(screen.getByText('MC-000123')).toBeInTheDocument();
  });
});
