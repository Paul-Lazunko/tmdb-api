import {
  TheMovieDbServiceOptions,
  MovieCreditsDto,
  MovieDto,
  PersonDto
} from '../contracts';
import {
  httpRequestHelper,
  jsonParseHelper
} from '../helpers';

export class TheMovieDbService {
  protected options: TheMovieDbServiceOptions;

  constructor(options: TheMovieDbServiceOptions) {
    this.options = options;
  }

  public async getMovieCredits(id: number): Promise<MovieCreditsDto> {
    return this.getData(id, 'movieCreditsRoute');
  }

  public async getMovie(id: number): Promise<MovieDto> {
    return this.getData(id, 'movieRoute');
  }

  public async getPerson(id: number): Promise<PersonDto> {
    return this.getData(id, 'personRoute');
  }

  protected async getData(
    id: number,
    pathResolver: keyof Pick<TheMovieDbServiceOptions, 'movieCreditsRoute' | 'movieRoute' | 'personRoute'>
  ): Promise<any> {
    const { apiKey, apiUrl } = this.options;
    const pathExtractor = this.options[pathResolver];
    const url: string = `${apiUrl}${pathExtractor(id)}?api_key=${apiKey}`;
    const data: string = await httpRequestHelper(url);
    return jsonParseHelper(data);
  }

}
