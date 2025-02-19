import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;

    let appointments = await this.cacheProvider.recovery<Appointment[]>(
      cacheKey,
    );

    if (!appointments) {
      appointments =
        await this.appointmentsRepository.findAllInMonthFromProvider({
          provider_id,
          year,
          month,
        });

      console.log('Buscou no banco');

      await this.cacheProvider.save(cacheKey, appointments);
    }
    return appointments;
  }
}

export default ListProviderAppointmentsService;
