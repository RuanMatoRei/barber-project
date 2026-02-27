import { prisma } from '../lib/prisma.js';

interface UpdateRequest {
  userId: string;
  photoUrl?: string;
  description?: string;
  specialty?: string;
  isWalkIn?: boolean;
}

export class UpdateBarberProfileService {
  async execute({ userId, ...data }: UpdateRequest) {
    return prisma.barberProfile.update({
      where: { userId },
      data
    });
  }
}