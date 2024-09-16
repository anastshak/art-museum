import { createBrowserRouter } from 'react-router-dom';
import { Home } from '@/pages/Home/Home';
import { ErrorNotFoundPage } from '@/pages/NotFound/ErrorNotFound';
import { ErrorBoundary } from '@/components/Error-boundary/Error-boundary';

const routes = [
  {
    path: '/',
    element: <Home />,
    // children: [
    //   {
    //     path: "details/:cardId",
    //     element: <CardDetails id={cardId} />,
    //   },
    // ],
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
