import { Router } from '@feathersjs/express';
import { UserService } from './user.service';
import { ValidateBody } from '../../utils/validateBody.middleware';
import { RegistrationDTO } from './dtos/registration.dto';
import { AuthenticationDTO } from './dtos/authentication.dto';
import { Response, Request, NextFunction } from 'express';
import { RefreshTokenDTO } from './dtos/refresh.dto';

export const userRouter = Router();

const userService = new UserService();

userRouter.post(
  '/user/registration',
  ValidateBody(RegistrationDTO),
  (req: { body: RegistrationDTO }, res: Response, next: NextFunction) => {
    next(userService.create(req.body));
  },
);

userRouter.post(
  '/user/authentication',
  ValidateBody(AuthenticationDTO),
  (req: { body: AuthenticationDTO }, res: Response, next: NextFunction) => {
        console.log(req.body);
    next(userService.authenticate(req.body));
  },
);
userRouter.post(
  '/user/refresh',
  ValidateBody(RefreshTokenDTO),
  (req: { body: RefreshTokenDTO }, res: Response, next: NextFunction) => {
    next(userService.refreshToken(req.body.refreshToken));
  },
);
