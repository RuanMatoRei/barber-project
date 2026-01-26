// backend/src/routes/appointment.route.ts
import { FastifyInstance } from 'fastify';
import { authenticate } from '../middlewares/authenticate.js';
import { verifyRole } from '../middlewares/middleware.role.js';

import { listUserAppointmentsController } from '../controllers/userController.js';
import { listBarberAppointmentsController } from '../controllers/barberController.js';
import { createAppointmentController } from '../controllers/createAppointmentController.js';
import { CancelAppointmentService } from '../services/cancelAppointmentService.js'

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

  app.post(
  '/appointments',
  {
    preHandler: [authenticate, verifyRole(['USER'])],
    config: {
      max: 10,
      timeWindow: '1 minute'
    }  
    },
    createAppointmentController
  )

  app.patch<{
    Params: { id: string }
  }>(
    '/appointment/:id/cancel',
    { preHandler: [authenticate] },
    async (req, reply) => {
      const service = new CancelAppointmentService()

      const result = await service.execute(
        req.params.id,
        req.user.sub,
        req.user.role
      )

      return reply.send(result)
    }
  )
}
