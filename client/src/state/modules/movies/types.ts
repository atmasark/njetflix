export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';
export const FETCH_CURRENT_MOVIE_REQUEST = 'FETCH_CURRENT_MOVIE_REQUEST';
export const FETCH_CURRENT_MOVIE_SUCCESS = 'FETCH_CURRENT_MOVIE_SUCCESS';
export const FETCH_CURRENT_MOVIE_FAILURE = 'FETCH_CURRENT_MOVIE_FAILURE';

// Typings for fetching all movies
interface FetchMoviesRequestAction {
  type: typeof FETCH_MOVIES_REQUEST
}

interface FetchMoviesSuccessAction {
  type: typeof FETCH_MOVIES_SUCCESS
  list: ListElement[]
}

interface FetchMoviesFailureAction {
  type: typeof FETCH_MOVIES_FAILURE
}

export type FetchMoviesActionTypes =
  | FetchMoviesRequestAction
  | FetchMoviesSuccessAction
  | FetchMoviesFailureAction

// Typings for fetching single movie
interface FetchCurrentMovieRequestAction {
  type: typeof FETCH_CURRENT_MOVIE_REQUEST
}

interface FetchCurrentMovieSuccessAction {
  type: typeof FETCH_CURRENT_MOVIE_SUCCESS
  current: Movie
}

interface FetchCurrentMovieFailureAction {
  type: typeof FETCH_CURRENT_MOVIE_FAILURE
}

export type FetchCurrentMovieActionTypes =
  | FetchCurrentMovieRequestAction
  | FetchCurrentMovieSuccessAction
  | FetchCurrentMovieFailureAction


// Typings for state
export interface MovieState {
  list: ListState,
  current: CurrentMovieState
}

interface ListState {
  isLoading: boolean
  data: ListElement[]
}

export interface ListElement {
  id: number,
  title: string,
  poster: string
}

interface CurrentMovieState {
  isLoading: boolean
  data: Movie | {}
}

export interface Movie {
  id: number;
  title: string
  year: string
  rated: string
  genre: string
  director: string
  actors: string
  plot: string
  poster: string
  imdbRating: string
}
