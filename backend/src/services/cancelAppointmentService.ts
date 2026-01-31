// backend/src/services/cancelAppointmentService.ts
import { prisma } from '../lib/prisma.js';
import { AppError } from '../errors/appError.js';

export class CancelAppointmentService {
  async execute(appointmentId: string, requestId: string, role: string) {
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId }
    });

    if (!appointment) {
      throw new AppError('Appointment not found', 404);
    }

    if (appointment.status === 'CANCELED') {
      throw new AppError('Appointment already canceled', 400)
    }

    // Regra para USER
    if(role === 'USER'){
      if(appointment.userId !== requestId){
        throw new AppError('Appointment already canceled', 400)
      }
    }

    const now = new Date()
    const diffiMs = appointment.dateTime.getTime() - now.getTime()
    const diffMinutes = diffiMs / 1000 / 60

    if(diffMinutes <= 80){
      throw new AppError(
        'You can only cacel up to 80 minutes before the appointemen', 403
      )
    }

    // ✅ BARBER ou ADMIN passam direto
    const canceled = prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: 'CANCELED' }
    });

    return canceled
  }
}
