import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DetailLayout } from '@/layouts/DetailLayout';
import { renderWithProviders } from '@/test/renderWithProviders';
import SettingsPersonalPage from './SettingsPersonalPage';

describe('SettingsPersonalPage', () => {
  it('renders the heading and the primary CTA', () => {
    renderWithProviders(
      <DetailLayout bare title="Informations personnelles">
        <SettingsPersonalPage />
      </DetailLayout>,
      { route: '/settings/personal' },
    );
    expect(screen.getByRole('heading', { name: 'Informations personnelles' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enregistrer les modifications' })).toBeInTheDocument();
  });
});
