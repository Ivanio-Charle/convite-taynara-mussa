const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Cleaning database and starting seed...');

  // 1. Clear all RSVPs and Guests
  await prisma.rsvp.deleteMany({});
  await prisma.guest.deleteMany({});
  console.log('✅ Cleared all guest responses');

  // 2. Create or update Admin User
  const passwordHash = await bcrypt.hash('senha123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'admin@convite.com' },
    update: {
      password_hash: passwordHash,
      name: 'Anfitria',
    },
    create: {
      name: 'Anfitria',
      email: 'admin@convite.com',
      password_hash: passwordHash,
    },
  });
  console.log('👤 Admin User ready:', user.email);

  // 3. Create or update Event
  const existingEvent = await prisma.event.findFirst();
  let event = existingEvent;

  if (!event) {
    event = await prisma.event.create({
      data: {
        name: 'Aniversário da Taynara Mussa',
        date: '05 de Outubro',
        time: '14:30',
        location: 'Restaurante Ouriço',
        zone: 'Macuti, Beira',
        dress_code: 'Branco, Cinza Claro ou Rosa Claro',
        account_information: 'Cada convidado será responsável pela sua própria conta.',
      },
    });
    console.log('🎉 Event ready:', event.name);
  } else {
    console.log('🎉 Event ready:', event.name);
  }

  console.log('✨ Seed completed with 0 sample guests. Database is clean and ready for real RSVPs!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
