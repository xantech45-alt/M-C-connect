import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DetailLayout } from '@/layouts/DetailLayout';
import { renderWithProviders } from '@/test/renderWithProviders';
import SettingsSecurityPage from './SettingsSecurityPage';

describe('SettingsSecurityPage', () => {
  it('renders the heading and the primary CTA', () => {
    renderWithProviders(
      <DetailLayout bare title="Sécurité">
        <SettingsSecurityPage />
      </DetailLayout>,
      { route: '/settings/security' },
    );
    expect(screen.getByRole('heading', { name: 'Sécurité' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enregistrer' })).toBeInTheDocument();
  });
});
