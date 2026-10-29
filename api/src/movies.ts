/*
 * Loads the mock data and normalizes it into the shape the API serves.
 * The mock data was fetched from a public API, so it has PascalCase keys and
 * some list fields are joined into a single comma-separated string.
 */
import { readFileSync } from 'node:fs';

export interface Movie {
  id: number;
  title: string;
  year: string;
  rated: string;
  genre: string[];
  director: string[];
  actors: string[];
  plot: string;
  poster: string;
  imdbRating: string;
}

export type MovieSummary = Pick<
  Movie,
  'id' | 'title' | 'year' | 'rated' | 'genre' | 'plot' | 'poster' | 'imdbRating'
>;

interface RawMovie {
  Title: string;
  Year: string;
  Rated: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
}

const splitList = (value: string) => value.split(',').map((item) => item.trim()).filter(Boolean);

// Same depth from src/ and dist/, so this resolves in both dev and production
const raw: RawMovie[] = JSON.parse(
  readFileSync(new URL('../mockdata.json', import.meta.url), 'utf8'),
);

export const movies: Movie[] = raw.map((movie, index) => ({
  id: index,
  title: movie.Title,
  year: movie.Year,
  rated: movie.Rated,
  genre: splitList(movie.Genre),
  director: splitList(movie.Director),
  actors: splitList(movie.Actors),
  plot: movie.Plot,
  poster: movie.Poster,
  imdbRating: movie.imdbRating,
}));

export const toSummary = ({
  id, title, year, rated, genre, plot, poster, imdbRating,
}: Movie): MovieSummary => ({
  id, title, year, rated, genre, plot, poster, imdbRating,
});
