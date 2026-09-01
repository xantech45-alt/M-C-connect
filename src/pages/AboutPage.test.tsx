import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DetailLayout } from '@/layouts/DetailLayout';
import { renderWithProviders } from '@/test/renderWithProviders';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('renders the heading and the value-prop pillars', () => {
    renderWithProviders(
      <DetailLayout bare title="À propos">
        <AboutPage />
      </DetailLayout>,
      { route: '/about' },
    );
    expect(screen.getByRole('heading', { name: 'À propos' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'M&C Verification' })).toBeInTheDocument();
  });
});
