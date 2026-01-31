// backend/src/routes/users.route.ts
import { FastifyInstance } from 'fastify';
import { createUserController } from '../controllers/createUserController.js';
import { getUserController } from '../controllers/getUserController.js';
import { loginController } from '../controllers/loginController.js';
import { authenticate } from '../middlewares/authenticate.js';

export async function usersRoutes(app: FastifyInstance) {
    app.post('/register', createUserController);
    app.get('/users', { preHandler: [authenticate] }, getUserController);
    app.post('/login',
        {
            config: {
                rateLimit: {
                    max: 5,
                    timeWindow: '1 minute' 
                }
            }
        },
        loginController);
}