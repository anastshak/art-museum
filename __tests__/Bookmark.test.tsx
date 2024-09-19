import { render, screen, fireEvent } from '@testing-library/react';
import { Bookmark } from '../src/components/Bookmark/Bookmark';
import { useFavStorageContext } from '../src/hooks/useFavStorageProvider';

jest.mock('../src/hooks/useFavStorageProvider', () => ({
  useFavStorageContext: jest.fn(),
}));

describe('Bookmark component', () => {
  const mockSave = jest.fn();
  const mockRemove = jest.fn();
  const mockCheck = jest.fn();

  beforeEach(() => {
    (useFavStorageContext as jest.Mock).mockReturnValue({
      save: mockSave,
      remove: mockRemove,
      check: mockCheck,
    });
  });

  test('displays the filled bookmark icon if the item is in favorites', () => {
    mockCheck.mockReturnValue(true);
    render(<Bookmark id={1} />);

    const icon = screen.getByAltText('bookmark filled icon');
    expect(icon).toBeInTheDocument();
  });

  test('displays the regular bookmark icon if the item is not in favorites', () => {
    mockCheck.mockReturnValue(false);
    render(<Bookmark id={1} />);

    const icon = screen.getByAltText('bookmark icon');
    expect(icon).toBeInTheDocument();
  });

  test('calls save when clicking on an item not in favorites', () => {
    mockCheck.mockReturnValue(false);
    render(<Bookmark id={1} />);

    const icon = screen.getByAltText('bookmark icon');
    fireEvent.click(icon);

    expect(mockSave).toHaveBeenCalledWith(1);
  });

  test('calls remove when clicking on an item already in favorites', () => {
    mockCheck.mockReturnValue(true);
    render(<Bookmark id={1} />);

    const icon = screen.getByAltText('bookmark filled icon');
    fireEvent.click(icon);

    expect(mockRemove).toHaveBeenCalledWith(1);
  });

  test('toggles the bookmark state on click', () => {
    mockCheck.mockReturnValue(false);
    render(<Bookmark id={1} />);

    const icon = screen.getByAltText('bookmark icon');
    fireEvent.click(icon);

    expect(mockSave).toHaveBeenCalledWith(1);
    expect(mockCheck).toHaveBeenCalled();
  });

  test('prevents click event propagation', () => {
    const handleClick = jest.fn();
    render(<Bookmark id={1} />);

    const icon = screen.getByAltText('bookmark icon');
    fireEvent.click(icon);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
