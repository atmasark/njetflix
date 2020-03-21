import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FetchMoviesActionTypes,
  ListElement,
} from './types';

export const fetchMoviesRequest = (): FetchMoviesActionTypes => ({
  type: FETCH_MOVIES_REQUEST,
});

export const fetchMoviesSuccess = (list: ListElement[]): FetchMoviesActionTypes => ({
  type: FETCH_MOVIES_SUCCESS,
  list,
});

export const fetchMoviesFailure = (): FetchMoviesActionTypes => ({
  type: FETCH_MOVIES_FAILURE,
});
