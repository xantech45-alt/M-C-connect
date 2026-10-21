import { screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import { DESKTOP_QUERY } from '@/hooks/useMediaQuery';
import { TabsLayout } from './TabsLayout';

function mockViewport(matching: string[]) {
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query: string) =>
      ({
        matches: matching.includes(query),
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList,
  );
}

function renderShell() {
  return renderWithProviders(
    <Routes>
      <Route element={<TabsLayout />}>
        <Route path="/orders" element={<h1>Mes commandes</h1>} />
      </Route>
    </Routes>,
    { route: '/orders' },
  );
}

describe('TabsLayout', () => {
  afterEach(() => vi.restoreAllMocks());

  it('uses the bottom tab bar on phones, without the desktop footer', () => {
    mockViewport([]);
    renderShell();
    expect(screen.getAllByRole('navigation', { name: 'Navigation principale' })).toHaveLength(1);
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Demande sur mesure' })).not.toBeInTheDocument();
  });

  it('renders the desktop shell: one header nav with Demande sur mesure and a footer', () => {
    mockViewport([DESKTOP_QUERY, '(min-width: 900px)']);
    renderShell();
    const navs = screen.getAllByRole('navigation', { name: 'Navigation principale' });
    expect(navs).toHaveLength(1);
    expect(screen.getAllByRole('link', { name: /Demande sur mesure/ })[0]).toHaveAttribute('href', '/rfq/new');
    expect(screen.getByRole('link', { name: /Commandes/, current: 'page' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toHaveTextContent(/données fictives/);
  });
});
