import axios from 'axios';
import { Dispatch } from 'redux';
import {
  fetchMovieListRequest,
  fetchMovieListSuccess,
  fetchMovieListFailure,
  fetchCurrentMovieRequest,
  fetchCurrentMovieFailure,
  fetchCurrentMovieSuccess,
  setActiveGenre,
  setFamilyFilter,
  setMoviesSortBy,
  setTitleFilter,
} from './actions';

import { FetchMovieListActionTypes, FetchCurrentMovieActionTypes } from './types';

export const fetchMovieList = () => async (dispatch: Dispatch<FetchMovieListActionTypes>) => {
  try {
    dispatch(fetchMovieListRequest());
    const response = await axios.get('http://localhost:2500/api/movie/getAll');
    return dispatch(fetchMovieListSuccess(response.data.list));
  } catch (err) {
    dispatch(fetchMovieListFailure(err.response.data.msg));
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

export {
  setActiveGenre,
  setFamilyFilter,
  setMoviesSortBy,
  setTitleFilter,
};
