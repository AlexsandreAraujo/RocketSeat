import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUserService';

describe('CreateUser', () => {
  it('Shoud be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const User = await createUser.execute({
      name: 'Alex',
      email: 'alexsandre@aaag.com',
      password: '123123',
    });

    expect(User).toHaveProperty('id');
  });

  it('Shoud not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Alex',
      email: 'alexsandre@aaag.com',
      password: '123123',
    });

    await expect(
      createUser.execute({
        name: 'Alex',
        email: 'alexsandre@aaag.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
