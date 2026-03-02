import { FastifyInstance } from 'fastify'
import { availabilityController } from '../controllers/availabilityController.js'

export async function availabilityRoutes(app: FastifyInstance) {
  app.get('/availability', availabilityController)
}