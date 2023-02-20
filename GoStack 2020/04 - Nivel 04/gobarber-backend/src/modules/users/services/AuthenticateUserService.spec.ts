import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUsersService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let AuthenticateUser: AuthenticateUsersService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    AuthenticateUser = new AuthenticateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Shoud be able to Authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Alex',
      email: 'alexsandre@aaag.com',
      password: '123123',
    });

    const response = await AuthenticateUser.execute({
      email: 'alexsandre@aaag.com',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('Shoud not be able to authenticate with non existing user', async () => {
    await expect(
      AuthenticateUser.execute({
        email: 'alexsandre@aaag.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Shoud not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Alex',
      email: 'alexsandre@aaag.com',
      password: '123123',
    });

    await expect(
      AuthenticateUser.execute({
        email: 'alexsandre@aaag.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
