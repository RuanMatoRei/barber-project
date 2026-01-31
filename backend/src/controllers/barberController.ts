// backend/src/controllers/barberController.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { ListBarberAppointmentsService } from '../services/barber.appointment.js';

export async function listBarberAppointmentsController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const service = new ListBarberAppointmentsService();

  const appointments = await service.execute({
    barberId: req.user.id,
  });

  return res.status(200).send(appointments);
}
