import { PrismaPg } from '@prisma/adapter-pg'
import { Prisma, PrismaClient } from './prisma/generated/prisma/client';
export { PrismaClient, Prisma }
import { enhance } from '@zenstackhq/runtime';
export type PrismaSuperClient = Prisma.DefaultPrismaClient
export type PrismaExtension = ReturnType<typeof Prisma.defineExtension>
export type GetPrismaClientParams = {
  connectionString: string
  extensions?: Array<PrismaExtension>
}

export function getPrismaClient({ connectionString, extensions }: GetPrismaClientParams): PrismaClient {
  const pool = new PrismaPg({ 
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? {
      rejectUnauthorized: false,
    } : false,
  })
  let prisma = new PrismaClient({ adapter: pool }) as unknown as Prisma.DefaultPrismaClient

  const enhancedPrisma = enhance(prisma)
  if (extensions && extensions.length > 0) {
    for (const entry of extensions) {
      prisma = prisma.$extends(entry) as unknown as Prisma.DefaultPrismaClient
    }
  }

  return prisma as unknown as PrismaClient
}