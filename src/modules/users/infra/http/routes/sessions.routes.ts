import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CreateSessionController from '@modules/users/infra/http/controllers/CreateSessionController';

const sessionsRouter = Router();
const createSessionController = new CreateSessionController();
// Cria uma session
sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  createSessionController.create,
);

export default sessionsRouter;
