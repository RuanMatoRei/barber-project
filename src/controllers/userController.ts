// backend/src/controllers/userController.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { ListAppointmentsService } from '../services/user.appointment.js';

export async function listUserAppointmentsController(
    req: FastifyRequest,
    res: FastifyReply
) {
    const service = new ListAppointmentsService();

    const appointments = await service.execute({ userId: req.user.id });

    return res.status(200).send(appointments);
}