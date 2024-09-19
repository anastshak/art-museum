import { render, screen } from '@testing-library/react';
import { Card } from '../src/components/Card/Card';
import { BrowserRouter } from 'react-router-dom';
import { ArtWork } from '../src/types/types';
import React from 'react';

jest.mock('@/assets/noImage.svg', () => 'noImage.svg');

jest.mock('@/components/Bookmark/Bookmark', () => ({
  Bookmark: ({ id }: { id: number }) => <div>Mocked Bookmark {id}</div>,
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Card component', () => {
  const cardData: ArtWork = {
    id: 1,
    title: 'Test Artwork',
    artist_title: 'Test Artist',
    image_id: 'test-image-id',
    is_on_view: true,
    date_display: '',
    artist_display: '',
    dimensions: '',
    credit_line: '',
    on_loan_display: '',
  };

  test('renders the artwork title, artist, and availability', () => {
    renderWithRouter(<Card card={cardData} />);

    expect(screen.getByText('Test Artwork')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
    expect(screen.getByText('Public')).toBeInTheDocument();
  });

  test('displays the correct image URL when image_id is present', () => {
    renderWithRouter(<Card card={cardData} />);

    const imageElement = screen.getByAltText('Test Artwork') as HTMLImageElement;
    expect(imageElement.src).toContain('https://www.artic.edu/iiif/2/test-image-id/full/843,/0/default.jpg');
  });

  test('displays the default image when image_id is not provided', () => {
    const cardWithoutImage: ArtWork = { ...cardData, image_id: '' };
    renderWithRouter(<Card card={cardWithoutImage} />);

    const imageElement = screen.getByAltText('Test Artwork') as HTMLImageElement;
    expect(imageElement.src).toContain('noImage.svg');
  });

  test('renders the Bookmark component with correct id', () => {
    renderWithRouter(<Card card={cardData} />);

    expect(screen.getByText('Mocked Bookmark 1')).toBeInTheDocument();
  });

  test('renders the correct link to the artwork details', () => {
    renderWithRouter(<Card card={cardData} />);

    const linkElement = screen.getByRole('link');
    expect(linkElement.getAttribute('href')).toBe('/artwork/1');
  });

  test('displays "Private" when is_on_view is false', () => {
    const cardNotOnView: ArtWork = { ...cardData, is_on_view: false };
    renderWithRouter(<Card card={cardNotOnView} />);

    expect(screen.getByText('Private')).toBeInTheDocument();
  });
});
