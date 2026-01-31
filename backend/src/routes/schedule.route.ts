// backend/src/routes/schedule.route.ts
import { FastifyInstance } from 'fastify'
import { Prisma } from '@prisma/client'
import { scheduleController } from '../controllers/schedule.js'
import { authenticate } from '../middlewares/authenticate.js'
import { verifyRole } from '../middlewares/middleware.role.js'

export interface UpdateBarberRoute {
  Params: {
    id: string
  }
  Body: Prisma.BarberUpdateInput
}

export async function scheduleRoutes(app: FastifyInstance) {
  app.put<UpdateBarberRoute>(
    '/schedule/:id/schedule',
    {
      preHandler: [
        authenticate,
        verifyRole(['ADMIN', 'BARBER'])
      ]
    },
    scheduleController
  )
}
