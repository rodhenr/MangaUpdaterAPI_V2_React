import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { queryClient } from './api/query-client.ts';
import ContextProvider from './context/ContextProvider.tsx';
import './global.scss';
import './index.css';
import Root from './layouts/Index.tsx';
import Home from './pages/home/Index.tsx';
import Library from './pages/library/Index.tsx';
import Manga from './pages/manga/Index.tsx';
import PageNotFound from './pages/notFound/Index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'library', Component: Library },
      { path: 'manga/:mangaId', Component: Manga },
    ],
  },
  {
    path: '*',
    Component: PageNotFound,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
