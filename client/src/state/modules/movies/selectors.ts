import { createSelector } from 'reselect';
import { Genre, ListElement, State } from './types';

const moviesSelector = (state: State) => state.movies.list.data;

export const movieSortingSelector = (state: State) => state.movies.list.sortBy;
export const familyFilterSelector = (state: State) => state.movies.list.familyFilter;
export const titleFilterSelector = (state: State) => state.movies.list.titleFilter;


export const getSortedMovies = createSelector(
  [movieSortingSelector, moviesSelector],
  (moviesSortBy, movies) => {
    switch (moviesSortBy) {
      case 'IMDB_RATING':
        return [...movies].sort(
          (a, b) => Number(b.imdbRating)
            - Number(a.imdbRating),
        );
      case 'YEAR':
        return [...movies].sort(
          (a, b) => Number(b.year)
            - Number(a.year),
        );
      case 'AZ':
        return [...movies].sort(
          (a, b) => a.title.localeCompare(b.title),
        );
      default:
        return [...movies].sort(
          (a, b) => a.title.localeCompare(b.title),
        );
    }
  },
);

export const getFamilyFilteredMovies = createSelector(
  [familyFilterSelector, getSortedMovies],
  (familyFilter, movies) => {
    if (!familyFilter) return movies;
    return movies.filter((movie) => ['G', 'PG', 'PG-13'].includes(movie.rated));
  },
);

export const getTitleFilteredMovies = createSelector(
  [titleFilterSelector, getFamilyFilteredMovies],
  (titleFilter, movies) => {
    if (!titleFilter) return movies;
    return movies.filter((movie) => movie.title.toLowerCase().includes(titleFilter.toLowerCase()));
  },
);

export const getAllGenres = createSelector(
  [moviesSelector],
  (movies) => {
    const genres: Genre[] = [];
    movies.map((movie: ListElement) => {
      movie.genre.map((moviesGenre: string) => {
        let genreIndex = genres.find((g: Genre) => g.name === moviesGenre);
        if (genreIndex) {
          genreIndex = { ...genreIndex, count: genreIndex.count += 1 };
        } else {
          genres.push({ name: moviesGenre, count: 1 });
        }
      });
    });
    return genres;
  },
);
