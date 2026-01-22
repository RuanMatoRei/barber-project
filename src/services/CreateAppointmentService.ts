// backend/src/services/CreateAppointmentService.ts
import { prisma } from '../lib/prisma.js';
import { AppError } from '../errors/appError.js';
import { ValidateAppointmentTimeService } from './ValidateAppointmentTimeService.js';

interface CreateAppointmentRequest {
    userId: string
    barberId: string;
    serviceId: string;
    dateTime: Date;
}

export class CreateAppointmentService {
    async execute({ userId, barberId, serviceId, dateTime }: CreateAppointmentRequest) {

        // Não permite marcar horario no passado
        if(dateTime < new Date()){
            throw new AppError("Cannot schudele in the past", 400)
        }

        // Extrai data e horario
        const date = dateTime.toISOString().split('T')[0] // YYYY-MM-DD
        const time = dateTime.toISOString().substring(11, 16) //hh:mm

        // Verifica se o horário existe na disponibilidade
        const validateService = new ValidateAppointmentTimeService()
        validateService.execute({ barberId, date, time })

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