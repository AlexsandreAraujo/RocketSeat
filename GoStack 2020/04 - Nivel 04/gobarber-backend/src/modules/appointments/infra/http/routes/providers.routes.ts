import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAuthenticated);
// Rotas devem Receber a requisição, chamar outro arquivo, devolver uma resposta

providersRouter.get('/', providersController.index);

export default providersRouter;
