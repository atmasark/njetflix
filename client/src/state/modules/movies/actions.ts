import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_CURRENT_MOVIE_REQUEST,
  FETCH_CURRENT_MOVIE_SUCCESS,
  FETCH_CURRENT_MOVIE_FAILURE,
  FetchCurrentMovieActionTypes,
  FetchMoviesActionTypes,
  ListElement,
  Movie,
} from './types';

// Actions for fetching movie list
export const fetchMoviesRequest = (): FetchMoviesActionTypes => ({
  type: FETCH_MOVIES_REQUEST,
});

export const fetchMoviesSuccess = (list: ListElement[]): FetchMoviesActionTypes => ({
  type: FETCH_MOVIES_SUCCESS,
  list,
});

export const fetchMoviesFailure = (error: string): FetchMoviesActionTypes => ({
  type: FETCH_MOVIES_FAILURE,
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
