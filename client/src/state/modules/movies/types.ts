export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';

interface FetchMoviesRequestAction {
  type: typeof FETCH_MOVIES_REQUEST
}

interface FetchMoviesSuccessAction {
  type: typeof FETCH_MOVIES_SUCCESS
  list: ListElement[]
}

interface FetchMoviesFailureAction {
  type: typeof FETCH_MOVIES_FAILURE
}

export type FetchMoviesActionTypes =
  | FetchMoviesRequestAction
  | FetchMoviesSuccessAction
  | FetchMoviesFailureAction

export interface MovieState {
  list: ListState,
}

interface ListState {
  isLoading: boolean
  data: ListElement[]
}

export interface ListElement {
  id: number,
  title: string,
  poster: string
}
