import { getPrismaClient, PrismaClient } from '@sample/database/client';
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const prismaClient =
  globalForPrisma.prisma ||
  getPrismaClient({
    connectionString: process.env.DATABASE_URL!,
  });

// In development, always create a new instance to ensure hot reloading works
if (process.env.NODE_ENV === 'development') globalForPrisma.prisma = prismaClient;

export { prismaClient };
