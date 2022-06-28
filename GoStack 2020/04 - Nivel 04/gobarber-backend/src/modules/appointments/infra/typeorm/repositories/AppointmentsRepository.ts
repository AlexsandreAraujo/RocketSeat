import AppDataSource from '@shared/infra/typeorm/db';
import IAppoitmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { Repository } from 'typeorm';
import ICreateAppointmentDTO from '../../dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppoitmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Appointment);
    }

    appointmentsRepository = AppDataSource.getRepository(Appointment).extend({
        async findByDate(date: Date): Promise<Appointment | undefined> {
            const findAppointment = await this.findOne({
                where: { date },
            });

            return findAppointment;
        },
    });

    public async create({
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({
            provider_id,
            date,
        });

        await AppDataSource.getRepository(Appointment).save(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
