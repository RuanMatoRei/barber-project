// backend/src/controllers/barberAvaibillityController.ts
import { FastifyReply, FastifyRequest } from "fastify";
import { checkBarberAvaibilityService } from "../services/checkBarberAvaibilityService.js";

export async function checkBarberAvaibilityController(
  request: FastifyRequest<{
    Params: { id: string };
    Querystring: { date: string };
  }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const { date } = request.query;

  const service = new checkBarberAvaibilityService();

  const availability = await service.execute({
    barberId: id,
    date
  });

  return reply.status(200).send(availability);
}
