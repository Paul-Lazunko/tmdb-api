import { Request, Response, NextFunction } from 'express';
import { EHttpStatus } from '../../constants';

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(EHttpStatus.BAD_REQUEST).json({
    message: error.message,
  });
}
