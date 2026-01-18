import { prisma } from '../lib/prisma.js';

interface ListBarberAppointmentsDTO {
  barberId: string;
}

export class ListBarberAppointmentsService {
  async execute({ barberId }: ListBarberAppointmentsDTO) {
    return prisma.appointment.findMany({
      where: { barberId },
      orderBy: { dateTime: 'asc' },
      include: {
        user: true,
        service: true,
      },
    });
  }
}
