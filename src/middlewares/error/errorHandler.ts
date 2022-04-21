import { Request, Response, NextFunction } from 'express';
import { EHttpStatus } from '../../constants';

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.error && error.error.isJoi) {
    return res.status(EHttpStatus.BAD_REQUEST).json({
      message: error.error.message,
    });
  }
  return res.status(EHttpStatus.SERVER_ERROR).json({
    message: error.message,
  });
}
