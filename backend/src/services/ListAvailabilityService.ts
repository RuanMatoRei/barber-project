import { prisma } from '../lib/prisma.js';
import { checkBarberAvaibilityService } from './checkBarberAvaibilityService.js';

interface ListAvailabilityRequest {
    date: string; // YYYY-MM-DD
}

export class ListAvailabilityService {
    async execute({ date }: ListAvailabilityRequest) {
        const checkService = new checkBarberAvaibilityService();

        // Buscar berbeiros ativos
        const barber = await prisma.barber.findMany({
            where: { active: true },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        barberProfile: {
                            select: {
                                photoUrl: true,
                                specialty: true,
                                description: true,
                                isWalkIn: true
                            }
                        }
                    }
                }
            },
            orderBy: { name: 'asc' }
        })

        // calcular slots para cada barbeiro
        const results = await Promise.all(
            barber.map(async (barber) => {
                const availableSlots = await checkService.execute({
                    barberId: barber.id,
                    date
                })

                const profile = barber.user?.barberProfile
                const isWaklIn = profile?.isWalkIn ?? 'false'

                // Aparece ser tem slots ou é walk-in
                const shouldApper = availableSlots.length > 0 || isWaklIn

                if(!shouldApper) return null

                return {
                    barber: {
                        id: barber.id,
                        name: barber.user?.name,
                        photoUrl: profile?.photoUrl ?? null,
                        specialty: profile?.specialty ?? null,
                        description: profile?.description ?? null,
                    },
                    availableSlots,
                    isWaklIn
                }
            })
        )

        // Remover barbeiros sem slots e sem walk-in
        return results.filter((x): x is NonNullable<typeof x> => x !== null);
    }
}