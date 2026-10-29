import { useMemo } from 'react';
import styled from 'styled-components';
import GenreNav from '../components/GenreNav';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import StatusMessage from '../components/StatusMessage';
import useActiveSection from '../hooks/useActiveSection';
import { fetchMovieList } from '../state/moviesSlice';
import {
  selectFeaturedMovie, selectGenres, selectListError, selectListStatus, selectMovies,
} from '../state/selectors';
import { useAppDispatch, useAppSelector } from '../state/store';
import { RetryButton, Skeleton } from '../styles/shared';

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);

  @media (min-width: 900px) {
    grid-template-columns: 220px minmax(0, 1fr);
  }
`;

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 8px;
  /* Let the last genre scroll up far enough to become the active one */
  padding-bottom: max(64px, calc(70vh - 420px));
`;

const SkeletonPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: calc(var(--header-height) + 64px) var(--gutter);
`;

const SkeletonRow = styled.div`
  display: flex;
  gap: 14px;
  overflow: hidden;
`;

function LoadingState() {
  return (
    <SkeletonPage aria-busy aria-label="Loading movies">
      <Skeleton $width="min(420px, 70%)" $height="56px" />
      <Skeleton $width="min(560px, 90%)" $height="80px" />
      {[0, 1].map((row) => (
        <SkeletonRow key={row}>
          {[0, 1, 2, 3, 4, 5].map((card) => (
            <Skeleton key={card} $width="180px" $height="270px" $radius="10px" style={{ flexShrink: 0 }} />
          ))}
        </SkeletonRow>
      ))}
    </SkeletonPage>
  );
}

export default function Home() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectListStatus);
  const error = useAppSelector(selectListError);
  const movies = useAppSelector(selectMovies);
  const genres = useAppSelector(selectGenres);
  const featured = useAppSelector(selectFeaturedMovie);

  const genreNames = useMemo(() => genres.map((genre) => genre.name), [genres]);
  const { active, register, scrollTo } = useActiveSection(genreNames);

  if (status === 'failed') {
    return (
      <StatusMessage
        emoji="📡"
        title="Couldn't reach the movie server"
        action={<RetryButton type="button" onClick={() => dispatch(fetchMovieList())}>Try again</RetryButton>}
      >
        {error}
        . Is the API server running?
      </StatusMessage>
    );
  }

  if (status !== 'succeeded' || !featured) return <LoadingState />;

  return (
    <>
      <Hero movie={featured} />
      <Layout>
        <GenreNav genres={genres} active={active} onSelect={scrollTo} />
        <Rows>
          {genres.map((genre) => (
            <MovieRow
              key={genre.name}
              ref={register(genre.name)}
              sectionKey={genre.name}
              title={genre.name}
              movies={movies.filter((movie) => movie.genre.includes(genre.name))}
            />
          ))}
        </Rows>
      </Layout>
    </>
  );
}
