// src/controllers/getUserController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { GetUserService } from '../services/getUserService.js';

export async function getUserController(
    req: FastifyRequest,
    res: FastifyReply  
) { 
    const getUserService = new GetUserService();

    const users = await getUserService.execute();

    return res.status(200).send(users);
}