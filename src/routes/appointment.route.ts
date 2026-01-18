// backend/src/routes/appointment.route.ts
import { FastifyInstance } from 'fastify';
import { authenticate } from '../middlewares/authenticate.js';
import { verifyRole } from '../middlewares/middleware.role.js';

import { listUserAppointmentsController } from '../controllers/userController.js';
import { listBarberAppointmentsController } from '../controllers/barberController.js';

export async function appointmentRoutes(app: FastifyInstance) {
  app.get(
    '/appointments/me',
    {
      preHandler: [authenticate, verifyRole(['USER'])],
    },
    listUserAppointmentsController
  );

  app.get(
    '/appointments/barber',
    {
      preHandler: [authenticate, verifyRole(['BARBER'])],
    },
    listBarberAppointmentsController
  );
}
