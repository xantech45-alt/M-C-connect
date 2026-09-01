import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders its label', () => {
    render(<Button>Ajouter au panier</Button>);
    expect(screen.getByRole('button', { name: 'Ajouter au panier' })).toBeInTheDocument();
  });

  it('fires onClick when pressed', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Confirmer</Button>);
    await userEvent.click(screen.getByRole('button', { name: 'Confirmer' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
