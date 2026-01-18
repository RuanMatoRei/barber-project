// backend/src/services/schedule.ts
import { prisma } from '../lib/prisma.js';
import { AppError } from '../errors/appError.js';

import { Prisma, UserRole } from '@prisma/client'

interface ExecuteScheduleDTO {
  barberId: string
  user: {
    id: string
    role: UserRole
  }
  data: Prisma.BarberUpdateInput
}

export class ScheduleService {
    async execute({ barberId, user, data }: ExecuteScheduleDTO) {

        if(user.role === "ADMIN") {
            if(user.id !== barberId){
                throw new AppError('Admin can only schedule for themselves', 403);
            }

            return prisma.barber.update({
                where: { id: barberId },
                data
            })
        }
    }
}
