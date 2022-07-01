import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

export default interface IAppoitmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;

  create(data: ICreateAppointmentDTO): Promise<Appointment | undefined>;
}
