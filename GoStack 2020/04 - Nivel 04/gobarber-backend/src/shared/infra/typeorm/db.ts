import { DataSource } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'alexla@1',
    port: 5432,
    database: 'gostack_gobarber',
    migrations: ['./src/database/migrations/**/*{.ts,.js}'],
    entities: [Appointment, User],
});

export default AppDataSource;
