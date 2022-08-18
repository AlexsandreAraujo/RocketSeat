import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController =
  new ProviderMonthAvailabilityController();
const providerDayAvailabilityController =
  new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);
// Rotas devem Receber a requisição, chamar outro arquivo, devolver uma resposta

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:id/month-availability',
  providerMonthAvailabilityController.index,
);
providersRouter.get(
  '/:id/day-availability',
  providerDayAvailabilityController.index,
);

export default providersRouter;
