import axios from 'axios';
import { Dispatch } from 'redux';
import {
  fetchMoviesRequest,
  fetchMoviesSuccess,
  fetchMoviesFailure,
  fetchCurrentMovieRequest,
  fetchCurrentMovieFailure,
  fetchCurrentMovieSuccess,
} from './actions';

import { FetchMoviesActionTypes, FetchCurrentMovieActionTypes } from './types';

export const fetchMovies = () => async (dispatch: Dispatch<FetchMoviesActionTypes>) => {
  try {
    dispatch(fetchMoviesRequest());
    const response = await axios.get('http://localhost:2500/api/movie/getAll');
    return dispatch(fetchMoviesSuccess(response.data.list));
  } catch (err) {
    dispatch(fetchMoviesFailure(err.response.data.msg));
  }
};

export const fetchCurrentMovie = (id: number) => async (
  dispatch: Dispatch<FetchCurrentMovieActionTypes>,
) => {
  try {
    dispatch(fetchCurrentMovieRequest());
    const response = await axios.get(`http://localhost:2500/api/movie/getSingle?id=${id}`);
    return dispatch(fetchCurrentMovieSuccess(response.data.current));
  } catch (err) {
    dispatch(fetchCurrentMovieFailure(err.response.data.msg));
  }
};
