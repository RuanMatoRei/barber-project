import { FastifyInstance } from 'fastify';

export async function prismaRoutes(app: FastifyInstance) {
    app.get('/prisma', async () => {
        return {
            prisma: 'ok'
        };
    });
}