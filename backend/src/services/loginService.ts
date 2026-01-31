// backend/src/services/loginService.ts
import { prisma } from "../lib/prisma.js";
import { AppError } from "../errors/appError.js";
import * as bcrypt from "bcrypt";

interface LoginRequest {
    email: string;
    password: string;
}

export class LoginService {
    async execute({ email, password }: LoginRequest) {
        if (!email || !password) throw new AppError('Email and password are required', 400);

        const user = await prisma.user.findUnique({ where: { email}})

        if(!user) throw new AppError('Invalid email', 401);
    
        const passwordMatch = await bcrypt.compare(password, user.password)
    
        if(!passwordMatch) throw new AppError('Invalid email or password', 401);

        // Remove a senha antes de retornar
        const { password: _, ...userWithoutPassword } = user; 
        return userWithoutPassword;


    }
}
