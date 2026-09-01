import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DetailLayout } from '@/layouts/DetailLayout';
import { renderWithProviders } from '@/test/renderWithProviders';
import CouponsPage from './CouponsPage';

describe('CouponsPage', () => {
  it('renders the heading and an active coupon', () => {
    renderWithProviders(
      <DetailLayout bare title="Coupons">
        <CouponsPage />
      </DetailLayout>,
      { route: '/coupons' },
    );
    expect(screen.getByRole('heading', { name: 'Coupons' })).toBeInTheDocument();
    expect(screen.getByText('BIENVENUE10')).toBeInTheDocument();
  });
});
