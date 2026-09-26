'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import StatsCard from '@/components/admin/StatsCard';
import { FormattedGuest, AdminStats } from '@/types';
import {
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  UserCheck,
  ChevronRight,
  Download,
  Plus,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [guests, setGuests] = useState<FormattedGuest[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    totalResponses: 0,
    confirmed: 0,
    pending: 0,
    declined: 0,
    totalPeopleConfirmed: 0,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/guests');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      if (data.guests) setGuests(data.guests);
      if (data.stats) setStats(data.stats);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-sand-100 pb-12">
      <AdminHeader title="Dashboard" onRefresh={fetchData} isRefreshing={loading} />

      <main className="max-w-md mx-auto px-4 pt-6 space-y-6">
        {/* Banner Welcome Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-r from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-[10px] uppercase tracking-widest text-champagne-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 inline" />
              <span>Resumo do Evento</span>
            </span>
            <h2 className="font-serif text-2xl font-light mt-1">
              Oi, Amor (gostosa) ✨
            </h2>
            <p className="text-xs text-sand-200/90 font-light mt-1">
              Aqui está a contagem em tempo real da presença dos teus convidados.
            </p>
          </div>

          {/* Background Decorative Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-champagne-500/10 rounded-full blur-2xl" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatsCard
            title="Total Respostas"
            value={stats.totalResponses}
            icon={<Users className="w-4 h-4 text-charcoal-700" />}
            subtitle="Convidados que responderam"
          />

          <StatsCard
            title="Confirmados"
            value={stats.confirmed}
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            bgColor="bg-emerald-50/50"
            subtitle="Convites aceitos"
          />

          <StatsCard
            title="Pendentes"
            value={stats.pending}
            icon={<Clock className="w-4 h-4 text-amber-600" />}
            bgColor="bg-amber-50/50"
            subtitle="Aguardando confirmação"
          />

          <StatsCard
            title="Não Irão"
            value={stats.declined}
            icon={<XCircle className="w-4 h-4 text-rose-600" />}
            bgColor="bg-rose-50/50"
            subtitle="Infelizmente indisponíveis"
          />
        </div>

        {/* Highlight Card: Total People Confirmed */}
        <div className="p-6 rounded-3xl bg-white border-2 border-champagne-300 shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-champagne-600 font-bold flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-champagne-500" />
              <span>Pessoas Confirmadas</span>
            </span>
            <p className="font-serif text-4xl font-bold text-charcoal-900">
              {stats.totalPeopleConfirmed}
            </p>
            <p className="text-xs text-charcoal-800 font-light">
              Total acumulado incluindo acompanhantes
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-champagne-100 flex items-center justify-center text-champagne-600 font-serif font-bold text-2xl shadow-inner">
            🎉
          </div>
        </div>

        {/* Recent RSVPs Preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-serif text-lg font-semibold text-charcoal-900">
              Últimas Respostas
            </h3>
            <Link
              href="/admin/convidados"
              className="text-xs font-semibold text-champagne-600 hover:underline flex items-center gap-0.5"
            >
              <span>Ver todos</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-sand-300 divide-y divide-sand-200 overflow-hidden shadow-sm">
            {guests.slice(0, 4).map((g) => (
              <div key={g.id} className="p-3.5 flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-charcoal-900">{g.name}</p>
                  <p className="text-xs text-charcoal-800/70 font-light">{g.phone}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                      g.status === 'CONFIRMADO'
                        ? 'bg-emerald-100 text-emerald-800'
                        : g.status === 'NAO_VAI'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {g.status === 'CONFIRMADO'
                      ? `Sim (${g.numberOfPeople})`
                      : g.status === 'NAO_VAI'
                      ? 'Não'
                      : 'Pendente'}
                  </span>
                </div>
              </div>
            ))}

            {guests.length === 0 && (
              <div className="p-8 text-center text-xs text-charcoal-800 font-light">
                Nenhuma resposta registrada ainda.
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 grid grid-cols-2 gap-3">
          <Link
            href="/admin/convidados"
            className="py-3.5 px-4 rounded-full bg-charcoal-900 text-white text-xs font-medium uppercase tracking-wider text-center shadow-md hover:bg-charcoal-800 transition-all flex items-center justify-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Ver Convidados</span>
          </Link>

          <a
            href="/api/admin/export"
            download
            className="py-3.5 px-4 rounded-full bg-white border border-sand-300 text-charcoal-900 text-xs font-medium uppercase tracking-wider text-center shadow-sm hover:bg-sand-50 transition-all flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-champagne-600" />
            <span>Exportar CSV</span>
          </a>
        </div>
      </main>
    </div>
  );
}
