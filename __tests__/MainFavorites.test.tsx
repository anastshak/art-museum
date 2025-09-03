import { render, screen, waitFor } from '@testing-library/react';
import { MainFavorites } from '../src/components/MainFavorites/MainFavorites';
import { useFavStorageContext } from '../src/hooks/useFavStorageProvider';
import { getArtwork } from '../src/services/api';
import React from 'react';

jest.mock('@/hooks/useFavStorageProvider', () => ({
  useFavStorageContext: jest.fn(),
}));

jest.mock('@/services/api', () => ({
  getArtwork: jest.fn(),
}));

jest.mock('@/components/MiniCard/MiniCard', () => ({
  MiniCard: function ({ card }: { card: any }): React.JSX.Element {
    return <div>MiniCard for {card.title}</div>;
  },
}));

const mockFavIds = [1, 2, 3];
const mockArtworkList = [
  { id: 1, title: 'Artwork 1' },
  { id: 2, title: 'Artwork 2' },
  { id: 3, title: 'Artwork 3' },
];

describe('MainFavorites component', () => {
  beforeEach(() => {
    (useFavStorageContext as jest.Mock).mockReturnValue({
      getAll: () => mockFavIds,
    });

    (getArtwork as jest.Mock).mockImplementation((id: string) => {
      const artwork = mockArtworkList.find((art) => art.id.toString() === id);
      return Promise.resolve({ data: artwork });
    });
  });

  test('displays loading state initially', () => {
    render(<MainFavorites />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('fetches and displays favorite artworks after loading', async () => {
    render(<MainFavorites />);

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
      expect(screen.getByText('MiniCard for Artwork 1')).toBeInTheDocument();
      expect(screen.getByText('MiniCard for Artwork 2')).toBeInTheDocument();
      expect(screen.getByText('MiniCard for Artwork 3')).toBeInTheDocument();
    });
  });

  test('displays no result message when there are no favorite artworks', async () => {
    (useFavStorageContext as jest.Mock).mockReturnValue({
      getAll: () => [],
    });

    render(<MainFavorites />);

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
      expect(screen.getByText(/There is nothing in your favorites.../i)).toBeInTheDocument();
    });
  });
});
