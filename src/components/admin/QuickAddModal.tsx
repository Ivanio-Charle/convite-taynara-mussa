'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, User, Phone, Loader2 } from 'lucide-react';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGuest: (name: string, phone: string) => Promise<void>;
}

export default function QuickAddModal({ isOpen, onClose, onAddGuest }: QuickAddModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      await onAddGuest(name.trim(), phone.trim());
      setName('');
      setPhone('');
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-sand-300"
        >
          <div className="p-4 border-b border-sand-200 flex items-center justify-between bg-sand-50">
            <div className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-champagne-600" />
              <h3 className="font-serif text-lg font-bold text-charcoal-900">
                Adicionar Convidado
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-sand-200 flex items-center justify-center text-charcoal-700 hover:bg-sand-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-charcoal-800 font-medium mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-champagne-500" />
                <span>Nome completo *</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Maria Santos"
                className="w-full px-4 py-3 rounded-xl border border-sand-300 bg-sand-50 text-sm focus:outline-none focus:border-champagne-400"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-charcoal-800 font-medium mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-champagne-500" />
                <span>Telefone</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+258 84 000 0000"
                className="w-full px-4 py-3 rounded-xl border border-sand-300 bg-sand-50 text-sm focus:outline-none focus:border-champagne-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-full bg-charcoal-900 text-white font-medium text-xs tracking-widest uppercase shadow-md hover:bg-charcoal-800 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span>Guardar Convidado</span>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
