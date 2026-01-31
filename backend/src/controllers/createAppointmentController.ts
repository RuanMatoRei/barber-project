// backend/src/controllers/createAppointmentController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateAppointmentService } from '../services/CreateAppointmentService.js';
import { z } from 'zod';

const createAppointmentBodySchema = z.object({
    barberId: z.string().uuid(),
    serviceId: z.string().uuid(),
    dateTime: z.string().datetime(),
});

export async function createAppointmentController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const pased = createAppointmentBodySchema.parse(request.body);

    if (!pased) {
        return reply.status(400).send({ error: 'Invalid request body' });
    }

    const { barberId, serviceId, dateTime } = pased;

    const service = new CreateAppointmentService();

    console.log(request.user)

    const appointment = await service.execute({
        userId: request.user.sub,
        barberId,
        serviceId,
        dateTime: new Date(dateTime)
    })

    return reply.status(201).send(appointment);
}