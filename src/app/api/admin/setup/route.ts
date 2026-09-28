import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { ensureSchemaInitialized } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await ensureSchemaInitialized();

    // Ensure default event exists
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

    const guestCount = await prisma.guest.count();
    const rsvpCount = await prisma.rsvp.count();

    return NextResponse.json({
      status: 'ok',
      message: 'Base de dados PostgreSQL inicializada e sincronizada com sucesso!',
      event,
      totalGuestsInDb: guestCount,
      totalRsvpsInDb: rsvpCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Setup endpoint error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Erro ao conectar ou inicializar base de dados PostgreSQL.',
        error: error.message || String(error),
      },
      { status: 500 }
    );
  }
}
