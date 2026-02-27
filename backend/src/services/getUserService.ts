// backend/src/services/getUserService.ts
import { prisma } from '../lib/prisma.js';

export class GetUserService {
    async execute(){
    const users = await prisma.user.findMany({
        include: {
            barberProfile: true
        }
    })
        return users;
    }
}