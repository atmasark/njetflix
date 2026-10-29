import { useEffect } from 'react';
import {
  createBrowserRouter, Outlet, RouterProvider, ScrollRestoration,
} from 'react-router';
import styled from 'styled-components';
import Header from './components/Header';
import AllMovies from './pages/AllMovies';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import NotFound from './pages/NotFound';
import { fetchMovieList } from './state/moviesSlice';
import { useAppDispatch } from './state/store';
import GlobalStyle from './styles/GlobalStyle';

const Footer = styled.footer`
  padding: 32px var(--gutter);
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.875rem;
  text-align: center;
`;

function Layout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMovieList());
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer>🍿 This isn&apos;t Netflix. No actual internjet required.</Footer>
      <ScrollRestoration />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'all', element: <AllMovies /> },
      { path: 'movie/:id', element: <MovieDetails /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
