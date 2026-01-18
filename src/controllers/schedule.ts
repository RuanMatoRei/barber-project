import { FastifyReply, FastifyRequest } from 'fastify'
import { ScheduleService } from '../services/schedule.js'
import { UpdateBarberRoute } from '../routes/schedule.route.js'

export async function scheduleController(
  req: FastifyRequest<UpdateBarberRoute>,
  res: FastifyReply
) {
  const { id } = req.params

  const service = new ScheduleService()

  const result = await service.execute({
    barberId: id,
    user: req.user,
    data: req.body 
  })

  return res.status(200).send(result)
}
