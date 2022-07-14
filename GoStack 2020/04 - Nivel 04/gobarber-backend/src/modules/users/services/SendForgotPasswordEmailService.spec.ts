import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('Shoud be able to recover the passoword using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Alexsandre',
      email: 'alexsandre@aaag.com',
      password: '123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'alexsandre@aaag.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('Shoud not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'alexsandre@aaag.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Shoud generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Alexsandre',
      email: 'alexsandre@aaag.com',
      password: '123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'alexsandre@aaag.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
