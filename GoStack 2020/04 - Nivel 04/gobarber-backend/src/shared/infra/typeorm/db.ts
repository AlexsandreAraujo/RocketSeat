import { DataSource } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'alexla@1',
  port: 5432,
  database: 'gostack_gobarber',
  migrations: ['./src/shared/infra/typeorm/migrations/**/*{.ts,.js}'],
  entities: [Appointment, User, UserToken],
});

export default AppDataSource;
