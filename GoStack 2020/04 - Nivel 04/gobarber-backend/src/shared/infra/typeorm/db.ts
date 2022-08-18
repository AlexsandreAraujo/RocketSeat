import { DataSource } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'alexla@1',
  port: 5432,
  database: 'gostack_gobarber',
  migrations: ['./src/shared/infra/typeorm/migrations/**/*{.ts,.js}'],
  entities: [Appointment, User, UserToken],
});

export const AppDataSourceMongo = new DataSource({
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'gobarber',
  useUnifiedTopology: true,
  entities: [Notification],
});
