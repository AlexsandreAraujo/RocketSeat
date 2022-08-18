import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/fakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppoitmentsService from './CreateAppointmentService';

let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppoitmentsService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointment = new CreateAppoitmentsService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );
  });

  it('Shoud be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2022, 4, 10, 13),
      user_id: 'user-id',
      providerId: 'provider-id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
  });

  it('shoud not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2022, 4, 10, 12).getTime();
    });

    const appointmentDate = new Date(2022, 4, 10, 13);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user-id',
      providerId: 'provider-id',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'user-id',
        providerId: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud not be able to create appointments with a not valid providerId', async () => {
    const appointmentDate = new Date();

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'user-id',
        providerId: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Shoud not be able to create appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2022, 4, 10, 11),
        user_id: 'user-id',
        providerId: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Shoud not be able to create appointment with the same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2022, 4, 10, 13),
        user_id: 'user-id',
        providerId: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Shoud not be able to create appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2022, 4, 11, 7),
        user_id: 'user-id',
        providerId: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2022, 4, 11, 18),
        user_id: 'user-id',
        providerId: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
