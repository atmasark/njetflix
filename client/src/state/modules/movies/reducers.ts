import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  MovieState,
  FetchMoviesActionTypes,

} from './types';

const initialState = {
  list: {
    isLoading: false,
    data: [],
  },
};

const fetchMoviesReducer = (state: MovieState = initialState, action: FetchMoviesActionTypes) => {
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
    default:
      return state;
  }
};

export default fetchMoviesReducer;
