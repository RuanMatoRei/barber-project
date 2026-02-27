// backend/src/controllers/createUserController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { CreateUserService } from '../services/createUserService.js';
import { AppError } from '../errors/appError.js';

const createUserSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(16),
    phone: z.string().min(10).max(15),
    role: z.enum(['USER', 'ADMIN', 'BARBER'])
});

export async function createUserController(
    req: FastifyRequest,
    res: FastifyReply  
) { 
    
    const parseBody = createUserSchema.safeParse(req.body);

    if(!parseBody.success) {
        return res.status(400).send({ 
            message: 'Invalid request body', 
            errors: parseBody.error.format() 
        });
    }

    const createUserService = new CreateUserService();

    try {
        const user = await createUserService.execute(parseBody.data);

        return res.status(201).send(user);
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).send({ message: error.message });
        }

        // erro desconhecido
        return res.status(500).send({ message: 'Internal server error' });
    }
}