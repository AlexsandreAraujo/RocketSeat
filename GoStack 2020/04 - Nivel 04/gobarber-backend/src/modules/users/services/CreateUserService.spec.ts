import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUsersService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('Shoud be able to create a new user', async () => {
    const User = await createUser.execute({
      name: 'Alex',
      email: 'alexsandre@aaag.com',
      password: '123123',
    });

    expect(User).toHaveProperty('id');
  });

  it('Shoud not be able to create a new user with same email from another', async () => {
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
