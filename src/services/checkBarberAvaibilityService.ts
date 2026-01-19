import { prisma } from "../lib/prisma.js";

interface CheckAvailibity {
  barberId: string;
  date: string; // YYYY-MM-DD
}

export class CheckBarberAvaibikityService {
  async execute({ barberId, date }: CheckAvailibity) {
    const targetDate = new Date(`${date}T00:00:00.000Z`);
    const dayOfWeek = targetDate.getUTCDay(); // 0 (Sunday) to 6 (Saturday)

    const startOfDay = new Date(`${date}T00:00:00.000Z`);
    const endOfDay   = new Date(`${date}T23:59:59.999Z`);

    // 1️⃣ VERIFICA SE EXISTE HORÁRIO ESPECIAL PARA A DATA
    const specialDay = await prisma.specialWorkingDay.findFirst({
      where: {
        barberId,
        date: startOfDay
      }
    });

    let startTime: string;
    let endTime: string;

    // 2️⃣ DEFINE O INTERVALO DE TRABALHO DO DIA
    if (specialDay) {
      // 👉 exceção vence
      startTime = specialDay.startTime;
      endTime   = specialDay.endTime;
    } else {
      // 👉 horário normal
      const workingHour = await prisma.workingHour.findFirst({
        where: {
          barberId,
          dayOfWeek
        }
      });

      if (!workingHour) return [];

      startTime = workingHour.startTime;
      endTime   = workingHour.endTime;
    }

    // 3️⃣ AGENDAMENTOS DO DIA
    const appointments = await prisma.appointment.findMany({
      where: {
        barberId,
        dateTime: {
          gte: startOfDay,
          lte: endOfDay
        },
        status: { not: "CANCELED" }
      }
    });

    // 4️⃣ PAUSAS (TIME OFF)
    const breaks = await prisma.barberTimeOff.findMany({
      where: {
        barberId,
        startDateTime: { lte: endOfDay },
        endDateTime: { gte: startOfDay }
      }
    });

    // 5️⃣ GERAR SLOTS
    const slots: string[] = [];

    let current = new Date(`${date}T${startTime}:00.000Z`);
    const end   = new Date(`${date}T${endTime}:00.000Z`);

    while (current.getTime() + 40 * 60000 <= end.getTime()) {
      const slotEnd = new Date(current);
      slotEnd.setMinutes(slotEnd.getMinutes() + 40);

      const hasAppointment = appointments.some(
        a => a.dateTime >= current && a.dateTime < slotEnd
      );

      const isInBreak = breaks.some(
        off => current < off.endDateTime && slotEnd > off.startDateTime
      );

      if (!hasAppointment && !isInBreak) {
        slots.push(
          current.toISOString()
        );
      }

      current.setMinutes(current.getMinutes() + 40);
    }

    return slots;
  }
}
