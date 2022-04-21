import { MovieCreditsCastDto } from './movie-credits-cast.dto';

export interface MovieCreditsDto {
  id: number,
  cast: MovieCreditsCastDto[]
}
