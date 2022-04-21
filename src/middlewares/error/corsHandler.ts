import { Request, Response, NextFunction } from 'express';
import { EHttpStatus } from '../../constants';

export function corsHandler(req: Request, res: Response, next: NextFunction) {
  res.setHeader('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'x-requested-with, content-type'
  );
  res.setHeader(
    'Access-Control-Expose-Headers',
    'x-request-id, x-error-message'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    res.status(EHttpStatus.NO_CONTENT).end();
  } else {
    next();
  }
}
