import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import * as api from '../api';
import type { Movie, MovieSummary, SortBy } from '../types';

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface MoviesState {
  list: {
    status: Status;
    data: MovieSummary[];
    error: string | null;
  };
  current: {
    status: Status;
    requestedId: number | null;
    data: Movie | null;
    error: string | null;
  };
  filters: {
    familyFriendly: boolean;
    sortBy: SortBy;
    title: string;
  };
}

const initialState: MoviesState = {
  list: { status: 'idle', data: [], error: null },
  current: {
    status: 'idle', requestedId: null, data: null, error: null,
  },
  filters: { familyFriendly: false, sortBy: 'AZ', title: '' },
};

export const fetchMovieList = createAsyncThunk(
  'movies/fetchList',
  (_: void, { signal }) => api.fetchMovies(signal),
  {
    // Skip if the list is already loaded or on its way
    condition: (_, { getState }) => {
      const { status } = (getState() as { movies: MoviesState }).movies.list;
      return status !== 'loading' && status !== 'succeeded';
    },
  },
);

export const fetchMovie = createAsyncThunk(
  'movies/fetchOne',
  (id: number, { signal }) => api.fetchMovieById(id, signal),
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setFamilyFriendly(state, action: PayloadAction<boolean>) {
      state.filters.familyFriendly = action.payload;
    },
    setSortBy(state, action: PayloadAction<SortBy>) {
      state.filters.sortBy = action.payload;
    },
    setTitleFilter(state, action: PayloadAction<string>) {
      state.filters.title = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieList.pending, (state) => {
        state.list.status = 'loading';
        state.list.error = null;
      })
      .addCase(fetchMovieList.fulfilled, (state, action) => {
        state.list.status = 'succeeded';
        state.list.data = action.payload;
      })
      .addCase(fetchMovieList.rejected, (state, action) => {
        state.list.status = 'failed';
        state.list.error = action.error.message ?? 'Could not load movies';
      })
      .addCase(fetchMovie.pending, (state, action) => {
        state.current.status = 'loading';
        state.current.requestedId = action.meta.arg;
        state.current.error = null;
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        // Ignore responses for a movie the user already navigated away from
        if (action.meta.arg !== state.current.requestedId) return;
        state.current.status = 'succeeded';
        state.current.data = action.payload;
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        if (action.meta.aborted || action.meta.arg !== state.current.requestedId) return;
        state.current.status = 'failed';
        state.current.error = action.error.message ?? 'Could not load the movie';
      });
  },
});

export const { setFamilyFriendly, setSortBy, setTitleFilter } = moviesSlice.actions;
export default moviesSlice.reducer;
