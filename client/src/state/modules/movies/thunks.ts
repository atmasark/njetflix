import axios from 'axios';
import { Dispatch } from 'redux';
import {
  fetchMoviesRequest,
  fetchMoviesSuccess,
  fetchMoviesFailure,
} from './actions';

import { FetchMoviesActionTypes } from './types';

const fetchMovies = () => async (dispatch: Dispatch<FetchMoviesActionTypes>) => {
  try {
    dispatch(fetchMoviesRequest());
    const response = await axios.get('http://localhost:2500/api/movie/getAll');
    return dispatch(fetchMoviesSuccess(response.data.list));
  } catch (err) {
    dispatch(fetchMoviesFailure());
  }
};

export default fetchMovies;
