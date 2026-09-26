import { NextResponse } from 'next/server';
import { submitRsvp } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, attending, numberOfPeople, observation } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Por favor informe o seu nome completo.' }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return NextResponse.json({ error: 'Por favor informe o seu telefone.' }, { status: 400 });
    }

    if (typeof attending !== 'boolean') {
      return NextResponse.json({ error: 'Por favor selecione se vai estar presente.' }, { status: 400 });
    }

    const numPeople = typeof numberOfPeople === 'number' && numberOfPeople > 0 ? numberOfPeople : 1;

    const result = await submitRsvp({
      name: name.trim(),
      phone: phone.trim(),
      attending,
      numberOfPeople: numPeople,
      observation: observation ? String(observation).trim() : '',
    });

    return NextResponse.json({ success: true, message: 'RSVP registrado com sucesso!', result });
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao processar sua resposta. Tente novamente.' },
      { status: 500 }
    );
  }
}
