import { describe, expect, it } from 'vitest';
import type { MovieSummary } from '../types';
import reducer, {
  fetchMovie, fetchMovieList, setFamilyFriendly, setSortBy, setTitleFilter,
} from './moviesSlice';
import {
  selectFeaturedMovie, selectGenres, selectVisibleMovies,
} from './selectors';
import type { RootState } from './store';

const movie = (overrides: Partial<MovieSummary>): MovieSummary => ({
  id: 0,
  title: 'Untitled',
  year: '2000',
  rated: 'R',
  genre: [],
  plot: '',
  poster: '',
  imdbRating: '5.0',
  ...overrides,
});

const movies = [
  movie({
    id: 0, title: 'The Lion King', year: '1994', rated: 'G', genre: ['Animation', 'Drama'], imdbRating: '8.5',
  }),
  movie({
    id: 1, title: 'Alien', year: '1979', rated: 'R', genre: ['Horror', 'Sci-Fi'], imdbRating: '8.5',
  }),
  movie({
    id: 2, title: 'Coco', year: '2017', rated: 'PG', genre: ['Animation'], imdbRating: '8.4',
  }),
  movie({
    id: 3, title: 'The Shawshank Redemption', year: '1994', genre: ['Drama'], imdbRating: '9.3',
  }),
];

const stateWith = (...actions: Parameters<typeof reducer>[1][]): RootState => ({
  movies: actions.reduce(reducer, reducer(undefined, fetchMovieList.fulfilled(movies, 'req'))),
});

const titles = (state: RootState) => selectVisibleMovies(state).map((m) => m.title);

describe('selectVisibleMovies', () => {
  it('sorts A–Z by default', () => {
    expect(titles(stateWith())).toEqual(['Alien', 'Coco', 'The Lion King', 'The Shawshank Redemption']);
  });

  it('sorts by rating and by year, highest first', () => {
    expect(titles(stateWith(setSortBy('IMDB_RATING')))[0]).toBe('The Shawshank Redemption');
    expect(titles(stateWith(setSortBy('YEAR')))[0]).toBe('Coco');
  });

  it('keeps only G, PG and PG-13 movies in family-friendly mode', () => {
    expect(titles(stateWith(setFamilyFriendly(true)))).toEqual(['Coco', 'The Lion King']);
  });

  it('filters by title, ignoring case and surrounding spaces', () => {
    expect(titles(stateWith(setTitleFilter('  THE ')))).toEqual(['The Lion King', 'The Shawshank Redemption']);
  });
});

describe('selectGenres', () => {
  it('counts movies per genre in order of first appearance', () => {
    expect(selectGenres(stateWith())).toEqual([
      { name: 'Animation', count: 2 },
      { name: 'Drama', count: 2 },
      { name: 'Horror', count: 1 },
      { name: 'Sci-Fi', count: 1 },
    ]);
  });
});

describe('selectFeaturedMovie', () => {
  it('picks the highest rated movie', () => {
    expect(selectFeaturedMovie(stateWith())?.title).toBe('The Shawshank Redemption');
  });
});

describe('movies reducer', () => {
  it('keeps the filters when the list loads (v1 reset them)', () => {
    const filtered = reducer(undefined, setFamilyFriendly(true));
    const loaded = reducer(filtered, fetchMovieList.fulfilled(movies, 'req'));
    expect(loaded.filters.familyFriendly).toBe(true);
  });

  it('ignores a late response for a movie the user navigated away from', () => {
    let state = reducer(undefined, fetchMovie.pending('a', 1));
    state = reducer(state, fetchMovie.pending('b', 2));
    state = reducer(state, fetchMovie.fulfilled({ ...movies[1]!, director: [], actors: [] }, 'a', 1));
    expect(state.current.data).toBeNull();
    expect(state.current.status).toBe('loading');
  });
});
