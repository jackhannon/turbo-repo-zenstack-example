import { PrismaPg } from '@prisma/adapter-pg'
import { Prisma, PrismaClient } from './prisma/generated/prisma/client';
export { PrismaClient, Prisma }
export { enhance } from '@zenstackhq/runtime'
export type PrismaSuperClient = Prisma.DefaultPrismaClient  
export type PrismaExtension = ReturnType<typeof Prisma.defineExtension>
export type GetPrismaClientParams = {
  connectionString: string
}

export function getPrismaClient({ connectionString }: GetPrismaClientParams): PrismaClient {
  const pool = new PrismaPg({ 
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? {
      rejectUnauthorized: false,
    } : false,
  })
  let prisma = new PrismaClient({ adapter: pool }) as unknown as Prisma.DefaultPrismaClient

  return prisma as unknown as PrismaClient
}