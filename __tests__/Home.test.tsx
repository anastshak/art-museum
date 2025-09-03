import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Home } from '../src/pages/Home/Home';

jest.mock('@/components/Header/Header', () => ({
  Header: function (): React.JSX.Element {
    return <div>Mocked Header</div>;
  },
}));

jest.mock('@/components/Footer/Footer', () => ({
  Footer: () => <div>Mocked Footer</div>,
}));

jest.mock('@/components/MainHome/Main', () => ({
  Main: () => <div>Mocked Main</div>,
}));

describe('Home component', () => {
  test('renders Header, Outlet, Main, and Footer components', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    expect(screen.getByText('Mocked Header')).toBeInTheDocument();
    expect(screen.getByText('Mocked Main')).toBeInTheDocument();
    expect(screen.getByText('Mocked Footer')).toBeInTheDocument();
  });
});
