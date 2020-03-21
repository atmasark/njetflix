import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  MovieActionTypes,
  ListElement,
} from './types';

export const fetchMoviesRequest = (): MovieActionTypes => ({
  type: FETCH_MOVIES_REQUEST,
});

export const fetchMoviesSuccess = (list: ListElement[]): MovieActionTypes => ({
  type: FETCH_MOVIES_SUCCESS,
  list,
});

export const fetchMoviesFailure = (): MovieActionTypes => ({
  type: FETCH_MOVIES_FAILURE,
});
