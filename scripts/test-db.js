const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

async function testConnection() {
  console.log('Testing connection to DATABASE_URL...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  try {
    const userCount = await prisma.user.count();
    console.log('SUCCESS! User count in DB:', userCount);
    const guestCount = await prisma.guest.count();
    console.log('SUCCESS! Guest count in DB:', guestCount);
  } catch (error) {
    console.error('FAILED to connect to DB:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
