import { Request, Response, NextFunction } from 'express';
import { MeshResponse } from './response';

export const meshInterceptor = (
  value: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void | Promise<unknown> => {
  if (value instanceof Promise)
    return value
      .then((result) => res.send(new MeshResponse(result, null, 'SUCCESS', res.statusCode ?? 200)))
      .catch((err) => next(err));
};
