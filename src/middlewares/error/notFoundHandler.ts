import { Request, Response } from 'express';
import { EHttpStatus } from '../../constants';

export function notFoundHandler(req: Request, res: Response) {
  return res.status(EHttpStatus.NOT_FOUND).json({
    message: 'Not found',
  });
}
