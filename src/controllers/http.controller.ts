import { Request, Response, NextFunction } from 'express';

export abstract class HttpController {

  protected context: HttpController;

  protected constructor() {
    this.context = this;
  }

  public get try() {
    return new Proxy(this.context, {
      get(target: any, name: string) {
        if (typeof target[name] === 'function') {
          return async function (
            req: Request,
            res: Response,
            next: NextFunction
          ) {
            try {
              return await target[name].apply(target, [req, res, next]);
            } catch (e) {
              next(e);
            }
          };
        }
        return target[name];
      },
    });
  }

}
