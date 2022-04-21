import {TheMovieDbServiceOptions} from '../contracts';

export const theMovieDBServiceOptions: TheMovieDbServiceOptions = {
  apiKey: process.env.TMDB_API_KEY,
  apiUrl: 'https://api.themoviedb.org/3',
  movieCreditsRoute: (id: number) => `/movie/${id}/credits`,
  movieRoute: (id: number) => `/movie/${id}`,
  personRoute: (id: number) => `/person/${id}`
}
