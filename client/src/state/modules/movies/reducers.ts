import {
  FETCH_MOVIE_LIST_REQUEST,
  FETCH_MOVIE_LIST_SUCCESS,
  FETCH_MOVIE_LIST_FAILURE,
  FETCH_CURRENT_MOVIE_REQUEST,
  FETCH_CURRENT_MOVIE_SUCCESS,
  FETCH_CURRENT_MOVIE_FAILURE,
  SET_ACTIVE_GENRE,
  SetActiveGenreType,
  MovieState,
  FetchMovieListActionTypes,
  FetchCurrentMovieActionTypes,

} from './types';

const initialState = {
  list: {
    isLoading: false,
    data: [],
    error: null,
  },
  current: {
    isLoading: false,
    data: {},
    error: null,
  },
  activeGenre: null
};


export default (
  state: MovieState = initialState,
  action: FetchMovieListActionTypes | FetchCurrentMovieActionTypes | SetActiveGenreType,
) => {
  switch (action.type) {
    case FETCH_MOVIE_LIST_REQUEST:
      return {
        ...state,
        list: {
          ...state.list,
          isLoading: true,
        },
      };
    case FETCH_MOVIE_LIST_SUCCESS:
      return {
        ...state,
        list: {
          isLoading: false,
          data: action.list,
        },
      };
    case FETCH_MOVIE_LIST_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          isLoading: false,
          error: action.error,
        },
      };
    case FETCH_CURRENT_MOVIE_REQUEST:
      return {
        ...state,
        current: {
          ...state.current,
          isLoading: true,
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
          ...state.current,
          isLoading: false,
          error: action.error,
        },
      };
    case SET_ACTIVE_GENRE:
      return {
        ...state,
        activeGenre: action.activeGenre
      };
    default:
      return state;
  }
};
