import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../src/components/Header/Header';
import styles from '../src/components/Header/Header.module.scss';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Header component', () => {
  test('renders museum logo', () => {
    renderWithRouter(<Header />);
    const logo = screen.getByAltText(/museum logo/i);
    expect(logo).toBeInTheDocument();
  });

  test('renders Home link when not on home page', () => {
    renderWithRouter(<Header />);
    const homeLink = screen.queryByText(/Home/i);
    expect(homeLink).not.toBeInTheDocument();
  });

  test('renders favorites link', () => {
    renderWithRouter(<Header />);
    const favoritesLink = screen.getByText(/Your favorites/i);
    expect(favoritesLink).toBeInTheDocument();
  });

  test('burger button opens and closes menu', () => {
    renderWithRouter(<Header />);
    const burgerButton = screen.getByRole('button');

    expect(burgerButton).not.toHaveClass(styles.active);

    fireEvent.click(burgerButton);
    expect(burgerButton).toHaveClass(styles.active);

    fireEvent.click(burgerButton);
    expect(burgerButton).not.toHaveClass(styles.active);
  });
});
