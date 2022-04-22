import { DataSource } from '../data-source';
import { CharacterDto, MovieDto, PersonDto } from '../contracts';
import { EOperands } from '../constants';
import { rolesCountHelper } from '../helpers';

export class PersonService {

  public getPerson(id: number): Partial<PersonDto> {
    if ( DataSource.PERSONS.has(id) ) {
      const { movies, characters, ...person } = DataSource.PERSONS.get(id);
      return person;
    }
  }

  public getPersonsByRolesCount(operand: EOperands, value: number): Partial<PersonDto>[] {
    const result: Partial<PersonDto>[] = [];
    const handler: (person: PersonDto) => boolean = rolesCountHelper(operand, value);
    DataSource.PERSONS.forEach((p: PersonDto) => {
      if (handler(p) ) {
        const { movies, characters, ...person } = p
        result.push(person);
      }
    });
    return result;
  }

  public getPersonMovies(id: number): { person: Partial<PersonDto>, movies: Partial<MovieDto>[] } {
    if ( DataSource.PERSONS.has(id) ) {
      const { movies, characters, ...person } = DataSource.PERSONS.get(id);
      const moviesFiltered = [];
      DataSource.MOVIES.forEach((movie: MovieDto) => {
        if ( movie.persons.includes(id) ) {
          const { characters, persons, ...movieEntity } = movie;
          moviesFiltered.push(movieEntity)
        }
      })
      return { person, movies: moviesFiltered };
    }
  }

  public getSimilarCharacterPersons() {
    const data: { character: string, persons: Partial<PersonDto>[] }[] = [];
    DataSource.CHARACTERS.forEach((entity: CharacterDto, character: string) => {
      const personsCount: number = Array.isArray(entity.persons )? entity.persons.length : 0;
      if ( personsCount > 1) {
          const persons: Partial<PersonDto>[] = [];
          for (const id of entity.persons) {
            if ( DataSource.PERSONS.has(id) ) {
              const { movies, characters, ...person} = DataSource.PERSONS.get(id);
              persons.push(person);
            }
          }
       data.push({ character, persons })
      }
    });
    return data;
  }

}
