// backend/src/middlewares/authenticate.ts
import { FastifyReply, FastifyRequest } from 'fastify';

export async function authenticate(
    req: FastifyRequest,
    res: FastifyReply
) {
    try {
        // Verificar o token JWT
        await req.jwtVerify();
    } catch (err) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
}

