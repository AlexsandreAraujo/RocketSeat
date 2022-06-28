import { startOfHour } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

interface IRequest {
    providerId: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ date, providerId }: IRequest): Promise<Appointment> {
        if (!providerId) {
            throw new AppError('Please insert the providerId');
        }

        const { appointmentsRepository } = new AppointmentsRepository();

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate =
            await appointmentsRepository.findByDate(appointmentDate);

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        const appointment = appointmentsRepository.create({
            provider_id: providerId,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
