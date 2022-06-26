import { Router } from 'express';
import { parseISO } from 'date-fns';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// Rotas devem Receber a requisição, chamar outro arquivo, devolver uma resposta

appointmentsRouter.get('/', async (request, response) => {
    const appointments = await Appointment.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    const { providerId, date } = request.body;

    const parsedDate = parseISO(date);

    const CreateAppointment = new CreateAppointmentService();

    const appointment = await CreateAppointment.execute({
        date: parsedDate,
        providerId,
    });

    return response.json(appointment);
});

export default appointmentsRouter;
