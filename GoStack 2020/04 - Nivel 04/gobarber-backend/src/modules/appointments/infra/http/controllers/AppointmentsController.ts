import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { providerId, date } = request.body;

    const CreateAppointment = container.resolve(CreateAppointmentService);

    const appointment = await CreateAppointment.execute({
      date,
      providerId,
      user_id,
    });

    return response.json(appointment);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const appointments = await Appointment.find();

    return response.json(appointments);
  }
}
