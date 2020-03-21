import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_CURRENT_MOVIE_REQUEST,
  FETCH_CURRENT_MOVIE_SUCCESS,
  FETCH_CURRENT_MOVIE_FAILURE,
  MovieState,
  FetchMoviesActionTypes,
  FetchCurrentMovieActionTypes,

} from './types';

const initialState = {
  list: {
    isLoading: false,
    data: [],
  },
  current: {
    isLoading: false,
    data: {},
  },
};


export default (
  state: MovieState = initialState,
  action: FetchMoviesActionTypes | FetchCurrentMovieActionTypes,
) => {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
      return {
        ...state,
        list: {
          isLoading: true,
          ...state.list,
        },
      };
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        list: {
          isLoading: false,
          data: action.list,
        },
      };
    case FETCH_MOVIES_FAILURE:
      return {
        ...state,
        list: {
          isLoading: false,
          ...state.list,
        },
      };
    case FETCH_CURRENT_MOVIE_REQUEST:
      return {
        ...state,
        current: {
          isLoading: true,
          ...state.current,
        },
      };
    case FETCH_CURRENT_MOVIE_SUCCESS:
      return {
        ...state,
        current: {
          isLoading: false,
          data: action.current,
        },
      };
    case FETCH_CURRENT_MOVIE_FAILURE:
      return {
        ...state,
        current: {
          isLoading: false,
          ...state.current,
        },
      };
    default:
      return state;
  }
};
