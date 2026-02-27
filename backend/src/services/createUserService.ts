// backend/src/services/createUserService.ts
import { prisma } from '../lib/prisma.js';
import { AppError } from '../errors/appError.js';
import { hash } from 'bcrypt';
import { randomInt } from 'node:crypto';

interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: 'USER' | 'ADMIN' | 'BARBER';
}

export class CreateUserService {
    async execute({ name, email, password, phone, role }: CreateUserRequest) {
        if (!name || !email || !password || !phone || !role) {
            throw new AppError('All fields are required', 400);
        }
        const userExists = await prisma.user.findUnique({where: {email}});

        if (userExists) throw new AppError('User already exists', 409);

        const randomSalt = randomInt(10, 16);
        const hashedPassword = await hash(password, randomSalt);


        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone,
                role,
                ...(role === 'BARBER' && {
                    barberProfile: {
                        create: {}
                    },
                    barber: {
                        create: {
                            name,
                            active: true
                        }
                    }
                })
            },
            include: {
                barberProfile: true
            }
        })
        return user;
    }
}