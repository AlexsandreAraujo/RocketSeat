import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Shoud be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Alex',
      email: 'alexsandre@aaag.com',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Alexsandre',
      email: 'alex@aaag.com',
    });

    expect(updatedUser.name).toBe('Alexsandre');
    expect(updatedUser.email).toBe('alex@aaag.com');
  });

  it('Shoud not be able to update to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Arthur',
      email: 'arthur@aaag.com',
      password: '123123',
    });

    const user = await fakeUsersRepository.create({
      name: 'Alex',
      email: 'alexsandre@aaag.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Alex',
        email: 'arthur@aaag.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Shoud not be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Alex',
      email: 'alexsandre@aaag.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Alex',
      email: 'arthur@aaag.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('Shoud not be able to update the profile from non-existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Test',
        email: 'test@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Shoud not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Alex',
      email: 'alexsandre@aaag.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Alex',
        email: 'arthur@aaag.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Shoud not be able to update the password with wrong password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Alex',
      email: 'alexsandre@aaag.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Alex',
        email: 'arthur@aaag.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
