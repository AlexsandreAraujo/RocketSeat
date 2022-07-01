import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppoitmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  providerId: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppoitmentsRepository')
    private appointmentsRepository: IAppoitmentsRepository,
  ) {}

  public async execute({ date, providerId }: IRequest): Promise<Appointment> {
    if (!providerId) {
      throw new AppError('Please insert the providerId');
    }

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate =
      await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider_id: providerId,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
