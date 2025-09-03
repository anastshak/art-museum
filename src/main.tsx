import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router/router';

import './styles/index.scss';
import { FavStorageProvider } from './hooks/useFavStorageProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FavStorageProvider>
      <RouterProvider router={router} />
    </FavStorageProvider>
  </StrictMode>,
);
