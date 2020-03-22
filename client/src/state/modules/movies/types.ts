export const FETCH_MOVIE_LIST_REQUEST = 'FETCH_MOVIE_LIST_REQUEST';
export const FETCH_MOVIE_LIST_SUCCESS = 'FETCH_MOVIE_LIST_SUCCESS';
export const FETCH_MOVIE_LIST_FAILURE = 'FETCH_MOVIE_LIST_FAILURE';
export const FETCH_CURRENT_MOVIE_REQUEST = 'FETCH_CURRENT_MOVIE_REQUEST';
export const FETCH_CURRENT_MOVIE_SUCCESS = 'FETCH_CURRENT_MOVIE_SUCCESS';
export const FETCH_CURRENT_MOVIE_FAILURE = 'FETCH_CURRENT_MOVIE_FAILURE';
export const SET_ACTIVE_GENRE = 'SET_ACTIVE_GENRE';

export interface setActiveGenreType {
  type: typeof SET_ACTIVE_GENRE
  activeGenre: string
}


// Typings for fetching all movies
interface FetchMovieListRequestAction {
  type: typeof FETCH_MOVIE_LIST_REQUEST
}

interface FetchMovieListSuccessAction {
  type: typeof FETCH_MOVIE_LIST_SUCCESS
  list: ListElement[]
}

interface FetchMovieListFailureAction {
  type: typeof FETCH_MOVIE_LIST_FAILURE
  error: string
}

export type FetchMovieListActionTypes =
  | FetchMovieListRequestAction
  | FetchMovieListSuccessAction
  | FetchMovieListFailureAction

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
  error: string
}

export type FetchCurrentMovieActionTypes =
  | FetchCurrentMovieRequestAction
  | FetchCurrentMovieSuccessAction
  | FetchCurrentMovieFailureAction

export interface State {
  movies: MovieState
}
// Typings for state
export interface MovieState {
  list: ListState,
  current: CurrentMovieState
  activeGenre: string | null
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
