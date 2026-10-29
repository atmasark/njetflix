import type { Movie, MovieSummary } from './types';

const getJson = async <T>(path: string, signal?: AbortSignal): Promise<T> => {
  const response = await fetch(path, { signal });
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(body?.msg ?? `Request failed with status ${response.status}`);
  }
  return body as T;
};

export const fetchMovies = async (signal?: AbortSignal) => {
  const body = await getJson<{ list: MovieSummary[] }>('/api/movies', signal);
  return body.list;
};

export const fetchMovieById = async (id: number, signal?: AbortSignal) => {
  const body = await getJson<{ current: Movie }>(`/api/movies/${id}`, signal);
  return body.current;
};
