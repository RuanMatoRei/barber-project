// backend/src/services/user.appointment.ts
import { prisma } from '../lib/prisma.js';

interface ListAppointmentsDTO {
    userId: string;
}

export class ListAppointmentsService {
    async execute({ userId }: ListAppointmentsDTO) {
        return prisma.appointment.findMany({
            where: { 
                userId
             },
            orderBy: {
                dateTime: 'asc'
            },
            include: {
                barber: true,
                service: true
            }
        })

    }
}