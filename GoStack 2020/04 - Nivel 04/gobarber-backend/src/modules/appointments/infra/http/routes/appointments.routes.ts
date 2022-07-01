import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);
// Rotas devem Receber a requisição, chamar outro arquivo, devolver uma resposta

appointmentsRouter.get('/', appointmentsController.list);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
