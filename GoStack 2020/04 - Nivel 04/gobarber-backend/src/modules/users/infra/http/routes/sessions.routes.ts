import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
// Rotas devem Receber a requisição, chamar outro arquivo, devolver uma resposta
const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
