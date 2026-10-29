import { createSelector } from '@reduxjs/toolkit';
import type { Genre, MovieSummary, SortBy } from '../types';
import type { RootState } from './store';

export const FAMILY_FRIENDLY_RATINGS = ['G', 'PG', 'PG-13'];

const comparators: Record<SortBy, (a: MovieSummary, b: MovieSummary) => number> = {
  AZ: (a, b) => a.title.localeCompare(b.title),
  IMDB_RATING: (a, b) => Number(b.imdbRating) - Number(a.imdbRating),
  YEAR: (a, b) => Number(b.year) - Number(a.year),
};

export const selectMovies = (state: RootState) => state.movies.list.data;
export const selectListStatus = (state: RootState) => state.movies.list.status;
export const selectListError = (state: RootState) => state.movies.list.error;
export const selectFilters = (state: RootState) => state.movies.filters;

export const selectVisibleMovies = createSelector(
  [selectMovies, selectFilters],
  (movies, { familyFriendly, sortBy, title }) => {
    const query = title.trim().toLowerCase();
    return movies
      .filter((movie) => !familyFriendly || FAMILY_FRIENDLY_RATINGS.includes(movie.rated))
      .filter((movie) => !query || movie.title.toLowerCase().includes(query))
      .sort(comparators[sortBy]);
  },
);

// Genres in order of first appearance, with how many movies each has
export const selectGenres = createSelector([selectMovies], (movies) => {
  const counts = new Map<string, number>();
  movies.forEach((movie) => movie.genre.forEach((name) => {
    counts.set(name, (counts.get(name) ?? 0) + 1);
  }));
  return [...counts].map(([name, count]): Genre => ({ name, count }));
});

export const selectFeaturedMovie = createSelector(
  [selectMovies],
  (movies) => movies.toSorted(comparators.IMDB_RATING)[0] ?? null,
);
