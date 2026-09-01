import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DetailLayout } from '@/layouts/DetailLayout';
import { renderWithProviders } from '@/test/renderWithProviders';
import ProfileEditPage from './ProfileEditPage';

describe('ProfileEditPage', () => {
  it('renders the heading and the primary CTA', () => {
    renderWithProviders(
      <DetailLayout bare title="Modifier le profil">
        <ProfileEditPage />
      </DetailLayout>,
      { route: '/profile/edit' },
    );
    expect(screen.getByRole('heading', { name: 'Modifier le profil' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enregistrer les modifications' })).toBeInTheDocument();
  });
});
