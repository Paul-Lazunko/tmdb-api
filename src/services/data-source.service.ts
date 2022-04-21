import { DataSource } from '../data-source';
import { CharacterDto, MovieDto, PersonDto } from '../contracts';

export class DataSourceService {

  public movieExists(id: number): boolean {
    return DataSource.MOVIES.has(id);
  }

  public getMovie(id: number): MovieDto {
    return DataSource.MOVIES.get(id);
  }

  public setMovie(movie: MovieDto) {
    return DataSource.MOVIES.set(movie.id, movie);
  }

  public personExists(id: number): boolean {
    return DataSource.PERSONS.has(id);
  }

  public getPerson(id: number): PersonDto {
    return DataSource.PERSONS.get(id);
  }

  public setPerson(person: PersonDto) {
    return DataSource.PERSONS.set(person.id, person);
  }

  public characterExists(name: string): boolean {
    return DataSource.CHARACTERS.has(name);
  }

  public getCharacter(name: string): CharacterDto {
    return DataSource.CHARACTERS.get(name);
  }

  public setCharacter(character: CharacterDto) {
    return DataSource.CHARACTERS.set(character.name, character);
  }

  public getPersons(): [number, PersonDto][] {
    return Array.from(DataSource.PERSONS.entries());
  }

}
