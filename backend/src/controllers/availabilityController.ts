import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ListAvailabilityService } from '../services/ListAvailabilityService.js';
import { AppError } from '../errors/appError.js';
import { error } from 'console';

const availabilityQuerySchema = z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be in YYYY-MM-DD format') 
})

export async function availabilityController(
    req: FastifyRequest,
    res: FastifyReply
){
    const parsed = availabilityQuerySchema.safeParse(req.query);

    if(!parsed.success) {
        return res.status(400).send({
            message: 'Invalid query parameters',
            errors: parsed.error.format()
        })
    }

    const { date } = parsed.data;

    try {
        const service = new ListAvailabilityService();
        const data = await service.execute({ date });

        return res.status(200).send(data);
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).send({ message: error.message });
        }
    } throw error; // Erro desconhecido, será tratado pelo handler global
}