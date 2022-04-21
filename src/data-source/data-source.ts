import {
  CharacterDto,
  MovieDto,
  PersonDto,
} from '../contracts';

export class DataSource {
  static MOVIES: Map<number, MovieDto> = new Map<number, MovieDto>();
  static CHARACTERS: Map<string, CharacterDto> = new Map<string, CharacterDto>();
  static PERSONS: Map<number, PersonDto> = new Map<number, PersonDto>();

  static flush() {
    DataSource.MOVIES = new Map<number, MovieDto>();
    DataSource.CHARACTERS = new Map<string, CharacterDto>();
    DataSource.PERSONS = new Map<number, PersonDto>();
  }
}
