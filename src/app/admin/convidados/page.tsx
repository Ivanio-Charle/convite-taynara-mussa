'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import GuestDetailModal from '@/components/admin/GuestDetailModal';
import QuickAddModal from '@/components/admin/QuickAddModal';
import { FormattedGuest, RsvpStatus } from '@/types';
import {
  Search,
  Filter,
  Plus,
  Download,
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  Phone,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';

export default function AdminGuestsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [guests, setGuests] = useState<FormattedGuest[]>([]);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'CONFIRMADO' | 'PENDENTE' | 'NAO_VAI'>('ALL');

  const [selectedGuest, setSelectedGuest] = useState<FormattedGuest | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (
    guestId: string,
    status: RsvpStatus,
    numberOfPeople: number
  ) => {
    try {
      const res = await fetch('/api/admin/guests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guestId, status, numberOfPeople }),
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddGuest = async (name: string, phone: string) => {
    try {
      const res = await fetch('/api/admin/guests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Filter & Search Logic
  const filteredGuests = guests.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.phone.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'ALL') return true;
    return g.status === activeFilter;
  });

  return (
    <div className="min-h-screen bg-sand-100 pb-20">
      <AdminHeader title="Lista de Convidados" onRefresh={fetchData} isRefreshing={loading} />

      <main className="max-w-md mx-auto px-4 pt-4 space-y-4">
        {/* Top Control Row: Search & Add */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar por nome ou telefone..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-sand-300 bg-white text-sm focus:outline-none focus:border-champagne-400 shadow-sm"
            />
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="p-3 rounded-2xl bg-charcoal-900 text-white shadow-sm hover:bg-charcoal-800 transition-colors flex items-center justify-center shrink-0"
            title="Adicionar convidado"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-medium">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-3.5 py-2 rounded-full border whitespace-nowrap transition-all ${
              activeFilter === 'ALL'
                ? 'bg-charcoal-900 border-charcoal-900 text-white shadow-sm'
                : 'bg-white border-sand-300 text-charcoal-700 hover:bg-sand-50'
            }`}
          >
            Todos ({guests.length})
          </button>
          <button
            onClick={() => setActiveFilter('CONFIRMADO')}
            className={`px-3.5 py-2 rounded-full border whitespace-nowrap transition-all ${
              activeFilter === 'CONFIRMADO'
                ? 'bg-emerald-700 border-emerald-700 text-white shadow-sm'
                : 'bg-white border-sand-300 text-charcoal-700 hover:bg-sand-50'
            }`}
          >
            Confirmados ({guests.filter((g) => g.status === 'CONFIRMADO').length})
          </button>
          <button
            onClick={() => setActiveFilter('PENDENTE')}
            className={`px-3.5 py-2 rounded-full border whitespace-nowrap transition-all ${
              activeFilter === 'PENDENTE'
                ? 'bg-amber-600 border-amber-600 text-white shadow-sm'
                : 'bg-white border-sand-300 text-charcoal-700 hover:bg-sand-50'
            }`}
          >
            Pendentes ({guests.filter((g) => g.status === 'PENDENTE').length})
          </button>
          <button
            onClick={() => setActiveFilter('NAO_VAI')}
            className={`px-3.5 py-2 rounded-full border whitespace-nowrap transition-all ${
              activeFilter === 'NAO_VAI'
                ? 'bg-rose-700 border-rose-700 text-white shadow-sm'
                : 'bg-white border-sand-300 text-charcoal-700 hover:bg-sand-50'
            }`}
          >
            Não Irão ({guests.filter((g) => g.status === 'NAO_VAI').length})
          </button>
        </div>

        {/* Guest List Cards */}
        <div className="space-y-2.5">
          {filteredGuests.map((g) => (
            <div
              key={g.id}
              onClick={() => setSelectedGuest(g)}
              className="p-4 rounded-2xl bg-white border border-sand-300 shadow-sm active:scale-98 transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="space-y-1 max-w-[70%]">
                <div className="flex items-center gap-2">
                  <p className="font-serif font-bold text-charcoal-900 text-base leading-tight truncate">
                    {g.name}
                  </p>
                  {g.observation && (
                    <MessageSquare className="w-3.5 h-3.5 text-champagne-500 shrink-0" />
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs text-charcoal-800 font-light">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-charcoal-700" />
                    {g.phone}
                  </span>
                  {g.status === 'CONFIRMADO' && (
                    <span className="font-medium text-emerald-700">
                      • {g.numberOfPeople} pessoa(s)
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${
                    g.status === 'CONFIRMADO'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : g.status === 'NAO_VAI'
                      ? 'bg-rose-50 border-rose-200 text-rose-800'
                      : 'bg-amber-50 border-amber-200 text-amber-800'
                  }`}
                >
                  {g.status === 'CONFIRMADO'
                    ? 'CONFIRMADO'
                    : g.status === 'NAO_VAI'
                    ? 'NÃO VAI'
                    : 'PENDENTE'}
                </span>
                <ChevronRight className="w-4 h-4 text-sand-400" />
              </div>
            </div>
          ))}

          {filteredGuests.length === 0 && (
            <div className="py-12 text-center bg-white rounded-3xl border border-sand-300 p-6">
              <Users className="w-10 h-10 text-sand-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-charcoal-800">
                Nenhum convidado encontrado.
              </p>
              <p className="text-xs text-charcoal-800/80 mt-1">
                Tente ajustar os filtros ou pesquisar com outro termo.
              </p>
            </div>
          )}
        </div>

        {/* Bottom Floating Export Button */}
        <div className="fixed bottom-4 left-0 right-0 max-w-md mx-auto px-4 pointer-events-none">
          <a
            href="/api/admin/export"
            download
            className="pointer-events-auto w-full py-3.5 px-6 rounded-full bg-champagne-500 text-white font-medium text-xs tracking-widest uppercase shadow-xl hover:bg-champagne-600 transition-all flex items-center justify-center gap-2 border border-champagne-400"
          >
            <Download className="w-4 h-4" />
            <span>EXPORTAR LISTA EM CSV</span>
          </a>
        </div>
      </main>

      {/* Guest Detail Modal */}
      <GuestDetailModal
        guest={selectedGuest}
        onClose={() => setSelectedGuest(null)}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* Quick Add Guest Modal */}
      <QuickAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddGuest={handleAddGuest}
      />
    </div>
  );
}
