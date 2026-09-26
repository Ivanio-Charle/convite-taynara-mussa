import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getAllGuestsFormatted } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  try {
    const { guests } = await getAllGuestsFormatted();

    // UTF-8 BOM for proper Portuguese accents display in Excel
    let csvContent = '\uFEFF';
    csvContent += 'Nome,Telefone,Estado,Número de Pessoas,Observação,Data da Resposta\n';

    guests.forEach((g) => {
      const statusLabel =
        g.status === 'CONFIRMADO'
          ? 'CONFIRMADO'
          : g.status === 'NAO_VAI'
          ? 'NÃO VAI'
          : 'PENDENTE';

      const respondedDate = g.respondedAt
        ? new Date(g.respondedAt).toLocaleDateString('pt-PT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : '-';

      const cleanName = `"${(g.name || '').replace(/"/g, '""')}"`;
      const cleanPhone = `"${(g.phone || '').replace(/"/g, '""')}"`;
      const cleanObs = `"${(g.observation || '').replace(/"/g, '""')}"`;

      csvContent += `${cleanName},${cleanPhone},${statusLabel},${g.numberOfPeople || 1},${cleanObs},${respondedDate}\n`;
    });

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="lista_convidados_taynara_mussa_${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    console.error('CSV Export error:', error);
    return NextResponse.json({ error: 'Erro ao gerar exportação CSV.' }, { status: 500 });
  }
}
