/**
 * Centralized Prisma Client Configuration
 * For Prisma 7+, we use the Neon adapter for serverless environments
 */

import type { PrismaClient as PrismaClientType } from '@/generated/prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientType | undefined;
};

function createPrismaClient(): PrismaClientType {
  // Only import these on the server side
  const { neonConfig } = require('@neondatabase/serverless');
  const { PrismaNeon } = require('@prisma/adapter-neon');
  const { PrismaClient } = require('@/generated/prisma/client');
  
  // Configure Neon to use WebSocket (server-side only)
  if (typeof window === 'undefined') {
    const ws = require('ws');
    neonConfig.webSocketConstructor = ws;
  }
  
  const connectionString = `${process.env.DATABASE_URL}`;
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
}

// Lazy initialization - only create when accessed
function getPrismaClientSingleton(): PrismaClientType {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClientType, {
  get(target, prop) {
    const client = getPrismaClientSingleton();
    return (client as any)[prop];
  }
});

/**
 * Helper function to get a new Prisma client instance
 * Use this in contexts where you need a fresh connection (e.g., serverless functions)
 */
export function getPrismaClient(): PrismaClientType {
  return createPrismaClient();
}

