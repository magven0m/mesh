import { Type } from './type.interface';
import { Request, Response, NextFunction } from 'express';
import { ValidateCustom } from './validate-custom.';
import { MeshError } from './error';

export function ValidateBody(type: Type) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ValidateCustom(req.body, type);
      next();
    } catch (err) {
      const error = new MeshError(err);
      res.send(error);
      throw error;
    }
  };
}
