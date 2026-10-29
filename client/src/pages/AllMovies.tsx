import styled from 'styled-components';
import MovieCard from '../components/MovieCard';
import StatusMessage from '../components/StatusMessage';
import {
  fetchMovieList, setFamilyFriendly, setSortBy, setTitleFilter,
} from '../state/moviesSlice';
import {
  selectFilters, selectListError, selectListStatus, selectMovies, selectVisibleMovies,
} from '../state/selectors';
import { useAppDispatch, useAppSelector } from '../state/store';
import { PageContainer, RetryButton, Skeleton } from '../styles/shared';
import type { SortBy } from '../types';

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: 'AZ', label: 'A–Z' },
  { value: 'IMDB_RATING', label: 'Rating' },
  { value: 'YEAR', label: 'Year' },
];

const TitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 16px;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.01em;
`;

const ResultCount = styled.p`
  color: var(--text-muted);
`;

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 28px;
  margin-bottom: 32px;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--surface);
`;

const Search = styled.label`
  position: relative;
  flex: 1 1 260px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 14px;
    width: 16px;
    height: 16px;
    background: var(--text-muted);
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cpath d='m20 20-3.5-3.5'/%3E%3C/svg%3E") center / contain no-repeat;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 14px 10px 40px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  transition: border-color 0.2s;

  &::placeholder {
    color: var(--text-muted);
  }

  &:focus {
    border-color: var(--accent);
    outline: none;
  }
`;

const Switch = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;

  &::before {
    content: '';
    flex-shrink: 0;
    width: 40px;
    height: 22px;
    border-radius: 999px;
    background: var(--surface-raised);
    box-shadow: inset 0 0 0 1px var(--border);
    transition: background 0.2s;
  }

  &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    margin-left: 3px;
    border-radius: 50%;
    background: #fff;
    transition: transform 0.2s ease;
  }

  &[aria-checked='true']::before {
    background: var(--accent);
  }

  &[aria-checked='true']::after {
    transform: translateX(18px);
  }
`;

const SortGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SortLabel = styled.span`
  color: var(--text-muted);
  font-size: 0.875rem;
`;

const Segmented = styled.div`
  display: flex;
  padding: 3px;
  border-radius: 9px;
  background: var(--bg);
  box-shadow: inset 0 0 0 1px var(--border);
`;

const Segment = styled.button`
  padding: 6px 14px;
  border: 0;
  border-radius: 7px;
  background: none;
  color: var(--text-muted);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  &[aria-pressed='true'] {
    background: var(--surface-raised);
    color: var(--text);
  }
`;

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(170px, 40vw), 1fr));
  gap: 24px 18px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ClearButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  color: var(--accent);
  font-weight: 600;
  cursor: pointer;
`;

export default function AllMovies() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectListStatus);
  const error = useAppSelector(selectListError);
  const total = useAppSelector(selectMovies).length;
  const movies = useAppSelector(selectVisibleMovies);
  const { familyFriendly, sortBy, title } = useAppSelector(selectFilters);

  const clearFilters = () => {
    dispatch(setTitleFilter(''));
    dispatch(setFamilyFriendly(false));
  };

  const renderResults = () => {
    if (status === 'failed') {
      return (
        <StatusMessage
          emoji="📡"
          title="Couldn't reach the movie server"
          action={<RetryButton type="button" onClick={() => dispatch(fetchMovieList())}>Try again</RetryButton>}
        >
          {error}
        </StatusMessage>
      );
    }
    if (status !== 'succeeded') {
      return (
        <Grid aria-busy aria-label="Loading movies">
          {Array.from({ length: 10 }, (_, i) => (
            <li key={i}><Skeleton $height="auto" $radius="10px" style={{ aspectRatio: '2 / 3' }} /></li>
          ))}
        </Grid>
      );
    }
    if (movies.length === 0) {
      return (
        <StatusMessage
          emoji="🍿"
          title="Njet movies found"
          action={<ClearButton type="button" onClick={clearFilters}>Clear filters</ClearButton>}
        >
          Nothing matches your filters. Try a different search.
        </StatusMessage>
      );
    }
    return (
      <Grid>
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </Grid>
    );
  };

  return (
    <PageContainer>
      <title>All movies · Njetflix</title>
      <TitleRow>
        <Title>All movies</Title>
        {status === 'succeeded' && (
          <ResultCount aria-live="polite">
            {movies.length === total ? `${total} movies` : `${movies.length} of ${total} movies`}
          </ResultCount>
        )}
      </TitleRow>
      <Toolbar>
        <Search>
          <SearchInput
            type="search"
            placeholder="Search by title"
            aria-label="Search by title"
            value={title}
            onChange={(event) => dispatch(setTitleFilter(event.target.value))}
          />
        </Search>
        <Switch
          type="button"
          role="switch"
          aria-checked={familyFriendly}
          onClick={() => dispatch(setFamilyFriendly(!familyFriendly))}
        >
          Family-friendly
        </Switch>
        <SortGroup role="group" aria-labelledby="sort-label">
          <SortLabel id="sort-label">Sort by</SortLabel>
          <Segmented>
            {SORT_OPTIONS.map((option) => (
              <Segment
                key={option.value}
                type="button"
                aria-pressed={sortBy === option.value}
                onClick={() => dispatch(setSortBy(option.value))}
              >
                {option.label}
              </Segment>
            ))}
          </Segmented>
        </SortGroup>
      </Toolbar>
      {renderResults()}
    </PageContainer>
  );
}
