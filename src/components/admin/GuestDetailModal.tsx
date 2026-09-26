'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormattedGuest, RsvpStatus } from '@/types';
import { X, Phone, User, Users, Calendar, MessageSquare, Check, Clock, AlertCircle } from 'lucide-react';

interface GuestDetailModalProps {
  guest: FormattedGuest | null;
  onClose: () => void;
  onUpdateStatus: (guestId: string, status: RsvpStatus, numberOfPeople: number) => Promise<void>;
}

export default function GuestDetailModal({ guest, onClose, onUpdateStatus }: GuestDetailModalProps) {
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState<RsvpStatus>(guest?.status || 'PENDENTE');
  const [people, setPeople] = useState<number>(guest?.numberOfPeople || 1);

  if (!guest) return null;

  const handleSave = async (newStatus: RsvpStatus) => {
    setUpdating(true);
    try {
      await onUpdateStatus(guest.id, newStatus, people);
      setStatus(newStatus);
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(false);
    }
  };

  const statusBadges = {
    CONFIRMADO: { bg: 'bg-emerald-50 border-emerald-200 text-emerald-800', label: 'CONFIRMADO' },
    PENDENTE: { bg: 'bg-amber-50 border-amber-200 text-amber-800', label: 'PENDENTE' },
    NAO_VAI: { bg: 'bg-rose-50 border-rose-200 text-rose-800', label: 'NÃO VAI' },
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-sand-300 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-sand-200 flex items-center justify-between bg-sand-50">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-charcoal-800 font-semibold">
                Detalhes do Convidado
              </span>
              <h3 className="font-serif text-xl font-bold text-charcoal-900 leading-tight">
                {guest.name}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-sand-200 flex items-center justify-center text-charcoal-700 hover:bg-sand-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4 overflow-y-auto flex-1">
            {/* Status Badge */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-sand-100/70 border border-sand-200">
              <span className="text-xs uppercase tracking-wider text-charcoal-800 font-medium">
                Estado Atual
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusBadges[guest.status].bg}`}
              >
                {statusBadges[guest.status].label}
              </span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-sand-200">
              <Phone className="w-4 h-4 text-champagne-600" />
              <div>
                <p className="text-[10px] uppercase text-charcoal-800 font-medium">Telefone</p>
                <a
                  href={`tel:${guest.phone}`}
                  className="text-sm font-semibold text-charcoal-900 hover:underline"
                >
                  {guest.phone}
                </a>
              </div>
            </div>

            {/* Number of People */}
            <div className="p-3 rounded-xl bg-white border border-sand-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-champagne-600" />
                  <span className="text-xs uppercase text-charcoal-800 font-medium">
                    Pessoas Acompanhantes
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPeople(Math.max(1, people - 1))}
                    className="w-7 h-7 rounded-md bg-sand-100 border border-sand-300 font-bold text-xs"
                  >
                    -
                  </button>
                  <span className="font-serif font-bold text-sm w-4 text-center">{people}</span>
                  <button
                    type="button"
                    onClick={() => setPeople(Math.min(10, people + 1))}
                    className="w-7 h-7 rounded-md bg-sand-100 border border-sand-300 font-bold text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Observation */}
            {guest.observation ? (
              <div className="p-3 rounded-xl bg-white border border-sand-200">
                <div className="flex items-center gap-2 text-xs uppercase text-charcoal-800 font-medium mb-1">
                  <MessageSquare className="w-4 h-4 text-champagne-600" />
                  <span>Observação</span>
                </div>
                <p className="text-xs text-charcoal-800 italic bg-sand-50 p-2 rounded-lg border border-sand-100">
                  "{guest.observation}"
                </p>
              </div>
            ) : null}

            {/* Response Date */}
            <div className="flex items-center gap-2 text-xs text-charcoal-800 font-light px-1">
              <Calendar className="w-3.5 h-3.5 text-champagne-500" />
              <span>
                Resposta em:{' '}
                {guest.respondedAt
                  ? new Date(guest.respondedAt).toLocaleString('pt-PT', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'Sem resposta ainda'}
              </span>
            </div>

            {/* Manual Status Alteration */}
            <div className="pt-2">
              <label className="block text-xs uppercase tracking-wider text-charcoal-800 font-medium mb-2">
                Alterar Estado Manualmente
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  disabled={updating}
                  onClick={() => handleSave('CONFIRMADO')}
                  className="py-2.5 px-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold shadow-sm hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Confirmado</span>
                </button>

                <button
                  disabled={updating}
                  onClick={() => handleSave('PENDENTE')}
                  className="py-2.5 px-2 rounded-xl bg-amber-500 text-white text-xs font-semibold shadow-sm hover:bg-amber-600 active:scale-95 transition-all flex items-center justify-center gap-1"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Pendente</span>
                </button>

                <button
                  disabled={updating}
                  onClick={() => handleSave('NAO_VAI')}
                  className="py-2.5 px-2 rounded-xl bg-rose-600 text-white text-xs font-semibold shadow-sm hover:bg-rose-700 active:scale-95 transition-all flex items-center justify-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Não Vai</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
