import React from 'react';
import { render, screen } from '@testing-library/react';
import { RandomGallery } from '../src/components/RandomGallery/RandomGallery';
import { getArtworks } from '../src/services/api';
import { ArtWork } from '../src/types/types';

jest.mock('../src/services/api', () => ({
  getArtworks: jest.fn(),
}));

jest.mock(
  '../src/components/MiniCard/MiniCard',
  () =>
    function ({ card }: { card: ArtWork }): React.JSX.Element {
      return <div>Mocked MiniCard {card.id}</div>;
    },
);

describe('RandomGallery component', () => {
  beforeEach(() => {
    (getArtworks as jest.Mock).mockResolvedValue({
      works: [
        { id: 1, title: 'Artwork 1' },
        { id: 2, title: 'Artwork 2' },
      ],
    });
  });

  test('renders headings', () => {
    render(<RandomGallery />);

    expect(screen.getByText(/Here some more/i)).toBeInTheDocument();
    expect(screen.getByText(/Other works for you/i)).toBeInTheDocument();
  });

  test('shows loading text while loading', () => {
    render(<RandomGallery />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
