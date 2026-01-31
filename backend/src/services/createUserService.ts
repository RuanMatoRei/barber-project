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
}

export class CreateUserService {
    async execute({ name, email, password, phone }: CreateUserRequest) {
        if (!name || !email || !password || !phone) return 'All fields are required';

        const userExists = await prisma.user.findUnique({where: {email}});

        if (userExists) throw new AppError('User already exists', 409);

        const randomSalt = randomInt(10, 16);
        const hashedPassword = await hash(password, randomSalt);


        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone
            }
        });
        
        return user;
    }
}