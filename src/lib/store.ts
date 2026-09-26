import { prisma } from './db';
import { FormattedGuest, AdminStats, RsvpStatus } from '@/types';

// In-memory fallback state in case MySQL server is offline during dev/demo
let fallbackGuests: Array<{
  id: string;
  name: string;
  phone: string;
  attending: boolean | null;
  numberOfPeople: number;
  observation: string;
  respondedAt: string | null;
  createdAt: string;
}> = [
  {
    id: '1',
    name: 'Ana Silva',
    phone: '+258 84 123 4567',
    attending: true,
    numberOfPeople: 2,
    observation: 'Com muito gosto!',
    respondedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    phone: '+258 82 987 6543',
    attending: true,
    numberOfPeople: 1,
    observation: 'Confirmadíssimo!',
    respondedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
  },
  {
    id: '3',
    name: 'Sofia & Pedro',
    phone: '+258 84 555 1234',
    attending: true,
    numberOfPeople: 2,
    observation: 'Mal podemos esperar pela festa no Ouriço ✨',
    respondedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: '4',
    name: 'Mariana Costa',
    phone: '+258 86 333 9999',
    attending: false,
    numberOfPeople: 1,
    observation: 'Infelizmente estarei fora da cidade nesta data.',
    respondedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 10).toISOString(),
  },
  {
    id: '5',
    name: 'João Paulo',
    phone: '+258 84 777 8888',
    attending: null,
    numberOfPeople: 1,
    observation: '',
    respondedAt: null,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
];

export async function submitRsvp(data: {
  name: string;
  phone: string;
  attending: boolean;
  numberOfPeople: number;
  observation?: string;
}) {
  try {
    // 1. Try DB first
    let event = await prisma.event.findFirst();
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
    }

    // Check if guest exists by phone or name
    let guest = await prisma.guest.findFirst({
      where: {
        OR: [{ phone: data.phone }, { name: data.name }],
      },
    });

    if (!guest) {
      guest = await prisma.guest.create({
        data: {
          event_id: event.id,
          name: data.name,
          phone: data.phone,
        },
      });
    } else {
      // Update phone if needed
      await prisma.guest.update({
        where: { id: guest.id },
        data: { phone: data.phone, name: data.name },
      });
    }

    // Delete previous RSVPs for this guest if any, to keep latest response
    await prisma.rsvp.deleteMany({
      where: { guest_id: guest.id },
    });

    const rsvp = await prisma.rsvp.create({
      data: {
        guest_id: guest.id,
        attending: data.attending,
        number_of_people: data.attending ? data.numberOfPeople : 0,
        observation: data.observation || '',
      },
    });

    return { success: true, guest, rsvp };
  } catch (error) {
    console.warn('DB connection error, using in-memory fallback for RSVP:', error);
    // In-memory fallback
    const existingIndex = fallbackGuests.findIndex(
      (g) => g.phone === data.phone || g.name.toLowerCase() === data.name.toLowerCase()
    );

    const now = new Date().toISOString();
    const guestItem = {
      id: existingIndex >= 0 ? fallbackGuests[existingIndex].id : String(Date.now()),
      name: data.name,
      phone: data.phone,
      attending: data.attending,
      numberOfPeople: data.attending ? data.numberOfPeople : 0,
      observation: data.observation || '',
      respondedAt: now,
      createdAt: existingIndex >= 0 ? fallbackGuests[existingIndex].createdAt : now,
    };

    if (existingIndex >= 0) {
      fallbackGuests[existingIndex] = guestItem;
    } else {
      fallbackGuests.unshift(guestItem);
    }

    return { success: true, fallback: true, guest: guestItem };
  }
}

export async function getAllGuestsFormatted(): Promise<{
  guests: FormattedGuest[];
  stats: AdminStats;
}> {
  try {
    const guestsWithRsvp = await prisma.guest.findMany({
      include: {
        rsvps: {
          orderBy: { responded_at: 'desc' },
          take: 1,
        },
      },
      orderBy: { created_at: 'desc' },
    });

    const formatted: FormattedGuest[] = guestsWithRsvp.map((g) => {
      const latestRsvp = g.rsvps[0];
      let status: RsvpStatus = 'PENDENTE';
      if (latestRsvp) {
        status = latestRsvp.attending ? 'CONFIRMADO' : 'NAO_VAI';
      }

      return {
        id: g.id,
        name: g.name,
        phone: g.phone,
        status,
        numberOfPeople: latestRsvp ? latestRsvp.number_of_people : 1,
        observation: latestRsvp?.observation || '',
        respondedAt: latestRsvp ? latestRsvp.responded_at.toISOString() : null,
        createdAt: g.created_at.toISOString(),
      };
    });

    const stats = computeStats(formatted);
    return { guests: formatted, stats };
  } catch (error) {
    console.warn('DB connection error, using fallback guests list:', error);
    const formatted: FormattedGuest[] = fallbackGuests.map((g) => {
      let status: RsvpStatus = 'PENDENTE';
      if (g.attending === true) status = 'CONFIRMADO';
      if (g.attending === false) status = 'NAO_VAI';

      return {
        id: g.id,
        name: g.name,
        phone: g.phone,
        status,
        numberOfPeople: g.numberOfPeople,
        observation: g.observation,
        respondedAt: g.respondedAt,
        createdAt: g.createdAt,
      };
    });

    const stats = computeStats(formatted);
    return { guests: formatted, stats };
  }
}

export async function updateGuestStatusManually(
  guestId: string,
  status: RsvpStatus,
  numberOfPeople?: number
) {
  try {
    const attending = status === 'CONFIRMADO' ? true : status === 'NAO_VAI' ? false : null;
    const num = status === 'CONFIRMADO' ? (numberOfPeople || 1) : 0;

    const guest = await prisma.guest.findUnique({ where: { id: guestId } });
    if (guest) {
      if (attending === null) {
        await prisma.rsvp.deleteMany({ where: { guest_id: guestId } });
      } else {
        await prisma.rsvp.deleteMany({ where: { guest_id: guestId } });
        await prisma.rsvp.create({
          data: {
            guest_id: guestId,
            attending,
            number_of_people: num,
          },
        });
      }
      return { success: true };
    }
  } catch (e) {
    // Fallback
    const item = fallbackGuests.find((g) => g.id === guestId);
    if (item) {
      if (status === 'CONFIRMADO') {
        item.attending = true;
        item.numberOfPeople = numberOfPeople || item.numberOfPeople || 1;
        item.respondedAt = new Date().toISOString();
      } else if (status === 'NAO_VAI') {
        item.attending = false;
        item.numberOfPeople = 0;
        item.respondedAt = new Date().toISOString();
      } else {
        item.attending = null;
        item.respondedAt = null;
      }
      return { success: true };
    }
  }
  return { success: false, error: 'Guest not found' };
}

export async function addGuestManually(name: string, phone: string) {
  try {
    const event = await prisma.event.findFirst();
    if (event) {
      const guest = await prisma.guest.create({
        data: {
          event_id: event.id,
          name,
          phone,
        },
      });
      return { success: true, guest };
    }
  } catch (e) {
    const now = new Date().toISOString();
    const guestItem = {
      id: String(Date.now()),
      name,
      phone,
      attending: null,
      numberOfPeople: 1,
      observation: '',
      respondedAt: null,
      createdAt: now,
    };
    fallbackGuests.unshift(guestItem);
    return { success: true, guest: guestItem };
  }
}

function computeStats(guests: FormattedGuest[]): AdminStats {
  const totalResponses = guests.filter((g) => g.status !== 'PENDENTE').length;
  const confirmed = guests.filter((g) => g.status === 'CONFIRMADO').length;
  const pending = guests.filter((g) => g.status === 'PENDENTE').length;
  const declined = guests.filter((g) => g.status === 'NAO_VAI').length;
  const totalPeopleConfirmed = guests
    .filter((g) => g.status === 'CONFIRMADO')
    .reduce((sum, g) => sum + (g.numberOfPeople || 1), 0);

  return {
    totalResponses,
    confirmed,
    pending,
    declined,
    totalPeopleConfirmed,
  };
}
