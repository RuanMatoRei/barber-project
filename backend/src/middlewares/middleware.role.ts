import { FastifyReply, FastifyRequest } from 'fastify';

export function verifyRole(roles: Array<'USER' | 'ADMIN' | 'BARBER'>) {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        if(!roles.includes(request.user.role)) {
            return reply.status(403).send({ message: 'Forbidden' });
    }
}
}
