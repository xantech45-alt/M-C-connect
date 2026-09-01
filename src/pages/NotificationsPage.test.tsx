import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DetailLayout } from '@/layouts/DetailLayout';
import { renderWithProviders } from '@/test/renderWithProviders';
import NotificationsPage from './NotificationsPage';

describe('NotificationsPage', () => {
  it('renders the heading, the tabs, and the pinned protection card', () => {
    renderWithProviders(
      <DetailLayout bare title="Notifications">
        <NotificationsPage />
      </DetailLayout>,
      { route: '/notifications' },
    );
    expect(screen.getByRole('heading', { name: 'Notifications', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Commandes' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Protection acheteur' })).toBeInTheDocument();
  });
});
