import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Image } from './Image';

describe('Image', () => {
  it('renders an img with the given src, alt, and dimensions when src is set', () => {
    render(<Image src="/foo.jpg" alt="Veste coupe-vent" width={100} height={100} />);
    const img = screen.getByRole('img', { name: 'Veste coupe-vent' });
    expect(img).toHaveAttribute('src', '/foo.jpg');
    expect(img).toHaveAttribute('width', '100');
    expect(img).toHaveAttribute('height', '100');
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('decoding', 'async');
  });

  it('renders the Lucide fallback instead of an <img> when src is undefined', () => {
    render(<Image alt="" width={100} height={100} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
