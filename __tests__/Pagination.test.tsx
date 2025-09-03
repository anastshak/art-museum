import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../src/components/Pagination/Pagination';

describe('Pagination component', () => {
  const mockChangePage = jest.fn();

  test('displays current page and total pages correctly', () => {
    render(<Pagination currentPage={2} totalPages={5} changePage={mockChangePage} />);

    expect(screen.getByText('2 / 5')).toBeInTheDocument();
  });

  test('calls changePage with correct page number on previous page click', () => {
    render(<Pagination currentPage={2} totalPages={5} changePage={mockChangePage} />);

    const prevButton = screen.getByRole('button', { name: /</i });
    fireEvent.click(prevButton);

    expect(mockChangePage).toHaveBeenCalledWith(1);
  });

  test('calls changePage with correct page number on next page click', () => {
    render(<Pagination currentPage={2} totalPages={5} changePage={mockChangePage} />);

    const nextButton = screen.getByRole('button', { name: />/i });
    fireEvent.click(nextButton);

    expect(mockChangePage).toHaveBeenCalledWith(3);
  });

  test('disables previous button on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} changePage={mockChangePage} />);

    const prevButton = screen.getByRole('button', { name: /</i });
    expect(prevButton).toBeDisabled();
  });

  test('disables next button on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} changePage={mockChangePage} />);

    const nextButton = screen.getByRole('button', { name: />/i });
    expect(nextButton).toBeDisabled();
  });
});
