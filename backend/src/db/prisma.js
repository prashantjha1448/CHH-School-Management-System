const { PrismaClient } = require('@prisma/client');

/**
 * Global Prisma Client Instance for PostgreSQL
 * Prevents multiple instances during development reloads
 */
const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
});

const connectPostgres = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      console.warn('⚠️  DATABASE_URL is not set. PostgreSQL features will remain in standby until DATABASE_URL is provided in .env');
      return null;
    }
    await prisma.$connect();
    console.log('✅ PostgreSQL (Prisma) Connected successfully!');
    return prisma;
  } catch (error) {
    console.error(`❌ PostgreSQL Connection Error: ${error.message}`);
    // Do not crash server completely if Postgres URL is not configured yet during dev
    return null;
  }
};

module.exports = {
  prisma,
  connectPostgres,
};
