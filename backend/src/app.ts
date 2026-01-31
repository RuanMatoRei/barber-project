// src/app.ts
import Fastify from 'fastify'
import jwt from '@fastify/jwt'
import { config } from 'dotenv'
import rateLimit from '@fastify/rate-limit'

import { healthRoutes } from './routes/health.route.js'
import { prismaRoutes } from './routes/prisma.route.js'
import { usersRoutes } from './routes/users.route.js'
import { appointmentRoutes } from './routes/appointment.route.js'
import { barberRoutes } from './routes/barber.route.js'
import { AppError } from './errors/appError.js'

config()

export const app = Fastify({
  logger: true
})


// 🔹 ERROR HANDLER GLOBAL (AQUI 👇)
app.setErrorHandler((error, request, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      message: error.message
    })
  }

  console.error(error)

  return reply.status(500).send({
    message: 'Internal server error'
  })
})

app.decorate('user', null)

app.register(jwt, {
  secret: process.env.JWT_SECRET as string
})

app.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute'
})

app.register(usersRoutes)
app.register(healthRoutes)
app.register(prismaRoutes)
app.register(appointmentRoutes)
app.register(barberRoutes)
