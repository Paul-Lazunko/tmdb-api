import { NextFunction, Request, Response } from 'express';
import { THttpRequestProperty } from '../constants';

export function createValidator(schema: { validateAsync: Function }, path: THttpRequestProperty, joiOptions: any) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const validationResult: any = await schema.validateAsync(req[path], joiOptions);
      for ( const key in validationResult ) {
        if ( validationResult[key] instanceof Promise ) {
          try {
            validationResult[key] = await validationResult[key];
            if ( validationResult[key].error ) {
              return next(new Error(validationResult[key].error))
            }
          } catch(e) {
            return next(e);
          }
        }
      }
      next()
    } catch(e) {
      next(e);
    }
  }
}
