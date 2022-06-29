import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();
// Rotas devem Receber a requisição, chamar outro arquivo, devolver uma resposta

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const usersRepository = new UsersRepository();
    const authenticateUserService = new AuthenticateUserService(
        usersRepository,
    );

    const { user, token } = await authenticateUserService.execute({
        email,
        password,
    });

    delete user.password;

    return response.json({ user, token });
});

export default sessionsRouter;
