export interface MovieSummary {
  id: number;
  title: string;
  year: string;
  rated: string;
  genre: string[];
  plot: string;
  poster: string;
  imdbRating: string;
}

export interface Movie extends MovieSummary {
  director: string[];
  actors: string[];
}

export interface Genre {
  name: string;
  count: number;
}

export type SortBy = 'AZ' | 'IMDB_RATING' | 'YEAR';
