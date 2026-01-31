// backend/src/controllers/listBarber.ts
import { FastifyReply, FastifyRequest } from "fastify";
import { ListBarberService } from "../services/listBarber.js";

export async function listBarberController(
    req: FastifyRequest,
    res: FastifyReply
) {
    const getListBarberService = new ListBarberService();
    const listBarbers = await getListBarberService.execute();
    return res.status(200).send(listBarbers);
}
