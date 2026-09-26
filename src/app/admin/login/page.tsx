'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Falha ao iniciar sessão.');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Erro ao realizar login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-sand-100 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Soft Background Accents */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-blush-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-champagne-200/40 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm"
      >
        {/* Header Icon */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-champagne-100 border border-champagne-300/80 flex items-center justify-center mx-auto mb-3 text-champagne-600 shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl font-light text-charcoal-900">
            Painel da Anfitriã
          </h1>
          <p className="text-xs text-charcoal-800 font-light mt-1">
            Aniversário da Taynara Mussa — Restaurante Ouriço
          </p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-blush-200/80 shadow-xl">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider text-charcoal-800 font-medium mb-1.5 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-champagne-500" />
                <span>E-mail</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-sand-300 bg-white/90 text-charcoal-900 text-sm focus:outline-none focus:border-champagne-400 focus:ring-2 focus:ring-champagne-200"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-charcoal-800 font-medium mb-1.5 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-champagne-500" />
                <span>Palavra-passe</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-sand-300 bg-white/90 text-charcoal-900 text-sm focus:outline-none focus:border-champagne-400 focus:ring-2 focus:ring-champagne-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-full bg-charcoal-900 text-white font-medium text-xs tracking-widest uppercase shadow-lg hover:bg-charcoal-800 transition-all flex items-center justify-center gap-2 border border-charcoal-700 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <>
                  <span>ENTRAR NO PAINEL</span>
                  <ArrowRight className="w-4 h-4 text-champagne-400" />
                </>
              )}
            </button>
          </form>

        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-charcoal-800 hover:text-champagne-600 transition-colors uppercase tracking-wider"
          >
            ← Voltar ao Convite Principal
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
