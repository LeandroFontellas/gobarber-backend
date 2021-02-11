/* eslint-disable camelcase */
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';

import CreateUserController from '@modules/users/infra/http/controllers/CreateUserController';
import UpdateAvatarController from '@modules/users/infra/http/controllers/UpdateAvatarController';

import ensureAuthenticated from '../middlewares/EnsureAuthenticated';

const userRouter = Router();
const upload = multer(uploadConfig);
const createUserController = new CreateUserController();
const updateAvatarController = new UpdateAvatarController();

// Cria um user
userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  createUserController.create,
);

userRouter.use(ensureAuthenticated);

// usamos aqui o upload.single como middleware
userRouter.patch(
  '/avatar',
  upload.single('avatar'),
  updateAvatarController.update,
);

export default userRouter;
