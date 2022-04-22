import { theMovieDBServiceOptions } from '../configs';
import { TheMovieDbService, DataSourceService } from '../services';
import { CharacterDto, MovieCreditsDto, MovieDto, PersonDto } from '../contracts';
import { concatArrayHelper } from '../helpers';

export class DataSourceController {

  protected theMovieDbService: TheMovieDbService;
  protected dataSourceService: DataSourceService;

  constructor() {
    this.theMovieDbService = new TheMovieDbService(theMovieDBServiceOptions);
    this.dataSourceService = new DataSourceService();
  }

  public async init(config: Record<string, number>, persons: string[]): Promise<void> {
    console.log('\x1b[1m', 'Starting fetching The Movie DB');
    console.time('runtime');
    for (const movieName in config) {
      console.log(`Fetching movie "${movieName}"`)
      const movieId = config[movieName];
      const movie: MovieDto = await this.theMovieDbService.getMovie(movieId);
      movie.persons = [];
      movie.characters = [];
      const credits: MovieCreditsDto = await this.theMovieDbService.getMovieCredits(movieId);
      const creditsCastFiltered = credits.cast.filter((c: any) => persons.includes(c.name));
      for (const c of creditsCastFiltered) {
        const { id, character } = c;
        const characters = character.split(' / ');
        for ( let i=0; i < characters.length; i = i+ 1 ) {
          console.log(`Fetching character "${characters[i]}"`)
          let ch: CharacterDto = {
            name: characters[i],
            persons: [ id ],
            movies: [ movie.id ]
          }
          if ( this.dataSourceService.characterExists(ch.name) ) {
            const oldCharacter = this.dataSourceService.getCharacter(ch.name);
            ch = {
              name: ch.name,
              persons: concatArrayHelper(oldCharacter.persons, ch.persons),
              movies: concatArrayHelper(oldCharacter.movies, ch.movies)
            }
          }
          this.dataSourceService.setCharacter(ch);
          movie.characters.push(characters[i])
        }
        let p = { id, characters, movies: [movieId] }
        if ( this.dataSourceService.personExists(c.id)) {
          p = this.dataSourceService.getPerson(c.id);
          p.characters = concatArrayHelper(p.characters, characters);
          p.movies = concatArrayHelper(p.movies, [movieId]);
        } else {
          p.characters = characters;
          p.movies = [movieId];
        }
        this.dataSourceService.setPerson(p as PersonDto);
        movie.persons.push(p.id);
      }
      if ( this.dataSourceService.movieExists(movieId)) {
        const m = this.dataSourceService.getMovie(movieId);
        movie.persons = concatArrayHelper(movie.persons, m.persons)
        movie.characters = concatArrayHelper(movie.characters, m.characters)
      }
      this.dataSourceService.setMovie(movie);
    }
    const personsHolder: [number, PersonDto][] = this.dataSourceService.getPersons();
    await Promise.all(personsHolder.map(async ([pid, entity]: [number, PersonDto]) => {
      const person: PersonDto = await this.theMovieDbService.getPerson(pid);
      console.log(`Fetching person "${person.name}"`)
      this.dataSourceService.setPerson(Object.assign(entity, person));
    }));
    console.log('Fetching The Movie DB was successfully done');
    console.timeEnd('runtime')
  }
}

export const dataSourceController = new DataSourceController();
