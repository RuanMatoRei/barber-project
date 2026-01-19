// backend/src/services/CreateAppointmentService.ts
import { prisma } from '../lib/prisma.js';
import { AppError } from '../errors/appError.js';

interface CreateAppointmentRequest {
    userId: string
    barberId: string;
    serviceId: string;
    dateTime: Date;
}

export class CreateAppointmentService {
    async execute({ userId, barberId, serviceId, dateTime }: CreateAppointmentRequest) {

        // Verifica se o horário já está agendado
        const existingAppointment = await prisma.appointment.findFirst({
            where: {
                barberId,
                dateTime,
                status: { not: 'CANCELED' }
            }
        })

        if (existingAppointment) {
            throw new AppError('Schedule not available', 409);
        }

        // Cria o agendamento
        const appointment = await prisma.appointment.create({
            data: {
                userId,
                barberId,
                serviceId,
                dateTime,
                status: 'SCHEDULED'
            }

        })

        return appointment;
    }   
}