import { createBrowserRouter } from 'react-router-dom';
import { Home } from '@/pages/Home/Home';
import { ErrorNotFoundPage } from '@/pages/NotFound/ErrorNotFound';
import { ErrorBoundary } from '@/components/Error-boundary/Error-boundary';
import { ArtWork } from '@/pages/Artwork/Artwork';
import { Favorites } from '@/pages/Favorites/Favorites';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/artwork/:id',
    element: <ArtWork />,
    errorElement: <ErrorNotFoundPage />,
  },
  {
    path: '/favorites',
    element: <Favorites />,
  },
  {
    path: '*',
    element: <ErrorNotFoundPage />,
  },
].map((route) => ({
  ...route,
  element: <ErrorBoundary>{route.element}</ErrorBoundary>,
}));

export const router = createBrowserRouter(routes);
