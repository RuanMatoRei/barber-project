// backend/src/services/listBarber.ts
import { prisma } from '../lib/prisma.js';

export class ListBarberService {
    async execute () {
        const barbers = await prisma.barber.findMany({
            where: {
                active: true
            }
        })

        return barbers;
    }
}