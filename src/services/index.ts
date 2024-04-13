import type { Application } from '../declarations';
import { userRouter } from '../modules/user/user.controller';

export const services = (app: Application) => {
  app.use('/api', userRouter);
};
