// backend/src/routes/barber.route.ts
import { FastifyInstance } from 'fastify';
import { listBarberController } from '../controllers/listBarber.js';
import { checkBarberAvaibilityController } from '../controllers/barberAvaibilityController.js';

export async function barberRoutes(app: FastifyInstance) {
    app.get('/barbers', listBarberController);

    app.get(
        '/barbers/:id/availability',
        checkBarberAvaibilityController
    )

}