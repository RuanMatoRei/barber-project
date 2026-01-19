// backend/src/@types/fastify-jwt.d.ts
import '@fastify/jwt'
import { UserRole } from '@prisma/client'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string
      role: UserRole
    }
  }
}
