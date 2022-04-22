import { NextFunction, Request, Response } from 'express';

import { MovieDto, PersonDto } from '../contracts';
import {EHttpStatus, EOperands} from '../constants';
import { HttpController } from './http.controller';
import { PersonService } from '../services';

export class PersonController extends HttpController {

  protected service: PersonService;

  constructor() {
    super();
    this.service = new PersonService();
  }

  public get(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const person: Partial<PersonDto> = this.service.getPerson(parseInt(id, 10))
    res.status(this.getResponseStatus(person)).json({ person: person || null })
  }

  public getPersonsByRolesCount(req: Request, res: Response, next: NextFunction) {
    const { operand, value } = req.params;
    const persons: Partial<PersonDto>[] = this.service
      .getPersonsByRolesCount(operand as EOperands, parseInt(value, 10));
    res.status(EHttpStatus.OK).json({ person: persons })
  }

  public movies(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data: { person: Partial<PersonDto>, movies: Partial<MovieDto>[] } = this.service.getPersonMovies(parseInt(id, 10))
    res.status(this.getResponseStatus(data)).json({ person: data?.person||null, movies: data?.movies || [] })
  }

  public similar(req: Request, res: Response, next: NextFunction) {
    const data: { persons: Partial<PersonDto>[], character: string }[] = this.service.getSimilarCharacterPersons();
    res.status(EHttpStatus.OK).json(data)
  }

  protected getResponseStatus(data: any): EHttpStatus {
    return data ? EHttpStatus.OK : EHttpStatus.NOT_FOUND;
  }

}

export const personController = new PersonController();
