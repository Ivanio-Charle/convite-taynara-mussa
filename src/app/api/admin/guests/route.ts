import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getAllGuestsFormatted, updateGuestStatusManually, addGuestManually } from '@/lib/store';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  try {
    const data = await getAllGuestsFormatted();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching admin guests:', error);
    return NextResponse.json({ error: 'Erro ao carregar convidados.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  try {
    const { name, phone } = await request.json();
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Nome é obrigatório.' }, { status: 400 });
    }

    const result = await addGuestManually(name.trim(), phone?.trim() || '');
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error adding guest:', error);
    return NextResponse.json({ error: 'Erro ao adicionar convidado.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  try {
    const { guestId, status, numberOfPeople } = await request.json();
    if (!guestId || !status) {
      return NextResponse.json({ error: 'Dados insuficientes.' }, { status: 400 });
    }

    const result = await updateGuestStatusManually(guestId, status, numberOfPeople);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating guest status:', error);
    return NextResponse.json({ error: 'Erro ao atualizar estado do convidado.' }, { status: 500 });
  }
}
