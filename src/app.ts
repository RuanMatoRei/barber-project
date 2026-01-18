// src/app.ts
import Fastify from 'fastify'
import jwt from '@fastify/jwt'
import { config } from 'dotenv'

import { healthRoutes } from './routes/health.route.js'
import { prismaRoutes } from './routes/prisma.route.js'
import { usersRoutes } from './routes/users.route.js'
import { appointmentRoutes } from './routes/appointment.route.js'
import { barberRoutes } from './routes/barber.route.js'

config()

export const app = Fastify({
  logger: true
})

app.decorate('user', null)

app.register(jwt, {
  secret: process.env.JWT_SECRET as string
})

app.register(usersRoutes)
app.register(healthRoutes)
app.register(prismaRoutes)
app.register(appointmentRoutes)
app.register(barberRoutes)
