import { createSelector } from 'reselect';
import { Genre, ListElement, State } from './types';

const moviesSelector = (state: State) => state.movies.list.data;

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
