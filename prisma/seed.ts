import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // 1. Create or update Admin User
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
  console.log('👤 Created Admin User:', user.email);

  // 2. Create or update Event
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
    console.log('🎉 Created Event:', event.name);
  } else {
    console.log('🎉 Found existing Event:', event.name);
  }

  // 3. Create initial sample guests & RSVPs if empty
  const countGuests = await prisma.guest.count();
  if (countGuests === 0 && event) {
    const sampleGuests = [
      { name: 'Ana Silva', phone: '+258 84 123 4567', attending: true, people: 2, obs: 'Com muito gosto!' },
      { name: 'Carlos Mendes', phone: '+258 82 987 6543', attending: true, people: 1, obs: '' },
      { name: 'Sofia & Pedro', phone: '+258 84 555 1234', attending: true, people: 2, obs: 'Mal podemos esperar!' },
      { name: 'Mariana Costa', phone: '+258 86 333 9999', attending: false, people: 1, obs: 'Infelizmente estarei fora da cidade nesta data.' },
      { name: 'João Paulo', phone: '+258 84 777 8888', attending: null, people: 1, obs: null }, // Pending
    ];

    for (const g of sampleGuests) {
      const guest = await prisma.guest.create({
        data: {
          event_id: event.id,
          name: g.name,
          phone: g.phone,
        },
      });

      if (g.attending !== null) {
        await prisma.rsvp.create({
          data: {
            guest_id: guest.id,
            attending: g.attending,
            number_of_people: g.people,
            observation: g.obs,
          },
        });
      }
    }
    console.log('👥 Created sample guests and RSVPs');
  }

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
