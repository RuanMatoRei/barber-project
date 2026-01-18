// backend/src/controllers/loginController.ts
import {FastifyReply, FastifyRequest} from 'fastify';
import { z } from 'zod';
import { LoginService } from '../services/loginService.js';
import { AppError } from '../errors/appError.js';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(16),
});

export async function loginController(
    req: FastifyRequest,
    res: FastifyReply  
) {
    const parsedBody = loginSchema.safeParse(req.body);
    
    if (!parsedBody.success) {
        return res.status(400).send({
            message: 'Invalid request body',
            errors: parsedBody.error.format()
        });
    }

    const loginService = new LoginService();

    
    try {
        const user = await loginService.execute(parsedBody.data);

        // 🔑 Gerar JWT 
        const token = await res.jwtSign({
            sub: user.id,
            role: user.role
        }, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        return res.status(200).send({ token, user });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).send({ message: error.message });
        }

        // unknown error
        return res.status(500).send({ message: 'Internal server error' });
    }
}