import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { Repository } from 'typeorm';

export default interface IAppoitmentsRepository {
    appointmentsRepository: Repository<Appointment> & {
        findByDate(date: Date): Promise<Appointment | undefined>;
    };

    create(data: ICreateAppointmentDTO): Promise<Appointment | undefined>;
}
