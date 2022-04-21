export interface TheMovieDbServiceOptions {
  apiKey: string;
  apiUrl: string;
  movieCreditsRoute: (id: number) => string;
  movieRoute: (id: number) => string;
  personRoute: (id: number) => string;
}
