import { logger } from '../logger';
import { MeshResponse } from './response';
import { Request, Response, NextFunction } from 'express';

export class MeshError extends MeshResponse {
  constructor(message?: unknown, code?: number) {
    super(null, message, 'ERROR', code);
  }
}

export const meshErrorHandler = (
  error: { stack: unknown; message: unknown },
  req: Request,
  res: Response,
  next: NextFunction,
): void | Promise<unknown> => {
  if (error instanceof Promise)
    return error.catch((err) => meshErrorHandler(err, req, res, next));

  let err: MeshError;

  if (error instanceof MeshError) err = error;

  if (error.stack && error.message) err = new MeshError(error.message);

  res.status(err.code).send(err);

  logger.error(error.stack);
};
