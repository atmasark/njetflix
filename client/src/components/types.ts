export interface State {
  movies: MovieState
}
// Typings for state
export interface MovieState {
  list: ListState,
  current: CurrentMovieState
}

interface ListState {
  isLoading: boolean
  data: ListElement[]
  error?: string | null
}

export interface ListElement {
  id: number,
  title: string,
  genre: string[],
  poster: string
}

interface CurrentMovieState {
  isLoading: boolean
  data: Movie | {}
  error?: string | null
}

export interface Movie {
  id: number;
  title: string
  year: string
  rated: string
  genre: string[]
  director: string
  actors: string
  plot: string
  poster: string
  imdbRating: string
}

export interface Genre {
  name: string
  count: number
}
