import AppDataSource from '../../../database/db';
import Appointment from '../entities/Appointment';

class AppointmentsRepository {
    appointmentsRepository = AppDataSource.getRepository(Appointment).extend({
        async findByDate(date: Date): Promise<Appointment | null> {
            const findAppointment = await this.findOne({
                where: { date },
            });

            return findAppointment || null;
        },
    });
}

export default AppointmentsRepository;
