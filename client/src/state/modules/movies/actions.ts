import {
  FETCH_MOVIE_LIST_REQUEST,
  FETCH_MOVIE_LIST_SUCCESS,
  FETCH_MOVIE_LIST_FAILURE,
  FETCH_CURRENT_MOVIE_REQUEST,
  FETCH_CURRENT_MOVIE_SUCCESS,
  FETCH_CURRENT_MOVIE_FAILURE,
  SET_ACTIVE_GENRE,
  SetActiveGenreType,
  FetchCurrentMovieActionTypes,
  FetchMovieListActionTypes,
  ListElement,
  Movie,
} from './types';

// Actions for fetching movie list
export const fetchMovieListRequest = (): FetchMovieListActionTypes => ({
  type: FETCH_MOVIE_LIST_REQUEST,
});

export const fetchMovieListSuccess = (list: ListElement[]): FetchMovieListActionTypes => ({
  type: FETCH_MOVIE_LIST_SUCCESS,
  list,
});

export const fetchMovieListFailure = (error: string): FetchMovieListActionTypes => ({
  type: FETCH_MOVIE_LIST_FAILURE,
  error,
});

// Actions for fetching a single movie
export const fetchCurrentMovieRequest = (): FetchCurrentMovieActionTypes => ({
  type: FETCH_CURRENT_MOVIE_REQUEST,
});

export const fetchCurrentMovieSuccess = (current: Movie): FetchCurrentMovieActionTypes => ({
  type: FETCH_CURRENT_MOVIE_SUCCESS,
  current,
});

export const fetchCurrentMovieFailure = (error: string): FetchCurrentMovieActionTypes => ({
  type: FETCH_CURRENT_MOVIE_FAILURE,
  error,
});

// Action for setting a genre active
export const setActiveGenre = (activeGenre: string): SetActiveGenreType => ({
  type: SET_ACTIVE_GENRE,
  activeGenre
})