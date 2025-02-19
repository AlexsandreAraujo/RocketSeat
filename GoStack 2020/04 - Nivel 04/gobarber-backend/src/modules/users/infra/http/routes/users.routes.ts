import { Router } from 'express';

import multer from 'multer';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);
// Rotas devem Receber a requisição, chamar outro arquivo, devolver uma resposta
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
