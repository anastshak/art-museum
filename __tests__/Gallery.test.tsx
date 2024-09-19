import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import { Gallery } from '../src/components/Gallery/Gallery';
import { getArtworks } from '../src/services/api';

jest.mock('@/services/api', () => ({
  getArtworks: jest.fn(),
}));

jest.mock(
  '../src/components/CardsList/CardsList',
  () =>
    function (): React.JSX.Element {
      return <div>Mocked CardList</div>;
    },
);
jest.mock(
  '../src/components/Pagination/Pagination',
  () =>
    function (): React.JSX.Element {
      return <div>Mocked Pagination</div>;
    },
);
jest.mock(
  '../src/components/Loader/Loader',
  () =>
    function (): React.JSX.Element {
      return <div data-testid="loader">Mocked Loader</div>;
    },
);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}));

describe('Gallery component', () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams(), jest.fn()]);
    (getArtworks as jest.Mock).mockResolvedValue({
      works: [],
      totalPages: 1,
    });
  });

  test('renders headings', () => {
    render(<Gallery />);

    expect(screen.getByText(/Topics for you/i)).toBeInTheDocument();
    expect(screen.getByText(/Our special gallery/i)).toBeInTheDocument();
  });

  test('renders loader while loading', () => {
    render(<Gallery />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('renders CardList and Pagination after loading', async () => {
    (getArtworks as jest.Mock).mockResolvedValue({
      works: [
        { id: 1, title: 'Artwork 1' },
        { id: 2, title: 'Artwork 2' },
      ],
      totalPages: 5,
    });

    render(<Gallery />);

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Mocked CardList')).toBeInTheDocument();
    expect(screen.getByText('Mocked Pagination')).toBeInTheDocument();
  });

  test('calls getArtworks with correct parameters', async () => {
    render(<Gallery />);

    await waitFor(() => {
      expect(getArtworks).toHaveBeenCalledWith(1, 3);
    });
  });
});
