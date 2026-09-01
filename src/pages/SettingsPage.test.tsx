import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DetailLayout } from '@/layouts/DetailLayout';
import { renderWithProviders } from '@/test/renderWithProviders';
import SettingsPage from './SettingsPage';

describe('SettingsPage', () => {
  it('renders the heading and the security navigation row', () => {
    renderWithProviders(
      <DetailLayout bare title="Paramètres">
        <SettingsPage />
      </DetailLayout>,
      { route: '/settings' },
    );
    expect(screen.getByRole('heading', { name: 'Paramètres' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Sécurité/ })).toBeInTheDocument();
  });
});
