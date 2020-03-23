export const FETCH_MOVIE_LIST_REQUEST = 'FETCH_MOVIE_LIST_REQUEST';
export const FETCH_MOVIE_LIST_SUCCESS = 'FETCH_MOVIE_LIST_SUCCESS';
export const FETCH_MOVIE_LIST_FAILURE = 'FETCH_MOVIE_LIST_FAILURE';
export const FETCH_CURRENT_MOVIE_REQUEST = 'FETCH_CURRENT_MOVIE_REQUEST';
export const FETCH_CURRENT_MOVIE_SUCCESS = 'FETCH_CURRENT_MOVIE_SUCCESS';
export const FETCH_CURRENT_MOVIE_FAILURE = 'FETCH_CURRENT_MOVIE_FAILURE';
export const SET_ACTIVE_GENRE = 'SET_ACTIVE_GENRE';
export const SET_MOVIES_SORT_BY = 'SET_MOVIES_SORT_BY';
export const SET_FAMILY_FILTER = 'SET_FAMILY_FILTER';

// Typings for 'set active genre'
export interface SetActiveGenreType {
  type: typeof SET_ACTIVE_GENRE
  activeGenre: string
}

export type SetMoviesSortFilterTypes =
  | SetMoviesSortByType
  | SetFamilyFilterType

// Typings for sorting and filtering
interface SetMoviesSortByType {
  type: typeof SET_MOVIES_SORT_BY
  sortBy: string
}


interface SetFamilyFilterType {
  type: typeof SET_FAMILY_FILTER
  familyFilter: boolean
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

// Typings for state
export interface State {
  movies: MovieState
}

export interface MovieState {
  list: ListState,
  current: CurrentMovieState
  activeGenre: string | null
}

interface ListState {
  isLoading: boolean
  data: ListElement[]
  error?: string | null
  familyFilter: boolean,
  sortBy: string,
}

export interface ListElement {
  id: number,
  title: string,
  genre: string[],
  poster: string
  imdbRating: string
  year: string
  rated: string
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
