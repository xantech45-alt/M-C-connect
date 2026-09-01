import { screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { DetailLayout } from '@/layouts/DetailLayout';
import { renderWithProviders } from '@/test/renderWithProviders';
import MessageThreadPage from './MessageThreadPage';

describe('MessageThreadPage', () => {
  it('renders the conversation subject, its messages, and the send button', () => {
    renderWithProviders(
      <Routes>
        <Route
          path="/messages/:id"
          element={
            <DetailLayout bare title="Conversation">
              <MessageThreadPage />
            </DetailLayout>
          }
        />
      </Routes>,
      { route: '/messages/c-1' },
    );
    expect(screen.getByRole('heading', { name: 'Conversation' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Commande MC-000123 - expédition' })).toBeInTheDocument();
    expect(screen.getByText(/conteneur a quitté Tianjin/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Envoyer' })).toBeInTheDocument();
  });
});
