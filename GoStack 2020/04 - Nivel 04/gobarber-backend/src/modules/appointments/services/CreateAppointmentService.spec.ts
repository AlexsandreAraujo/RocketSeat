import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppoitmentsService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppoitmentsService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppoitmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('Shoud be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      providerId: '1234567',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1234567');
  });

  it('shoud not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      providerId: '123123',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        providerId: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud not be able to create appointments with a not valid providerId', async () => {
    const appointmentDate = new Date();

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        providerId: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
