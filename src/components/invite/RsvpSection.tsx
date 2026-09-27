'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, User, Phone, MessageSquare, Loader2, UserCheck } from 'lucide-react';

export default function RsvpSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState<boolean | null>(true);
  const [observation, setObservation] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedStatus, setSubmittedStatus] = useState<'CONFIRMED' | 'DECLINED' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Por favor introduza o seu nome completo.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Por favor introduza o seu contacto telefónico.');
      return;
    }
    if (attending === null) {
      setErrorMsg('Por favor selecione se vai estar presente.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          attending,
          numberOfPeople: attending ? 1 : 0, // Convites estritamente individuais
          observation,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao enviar a resposta.');
      }

      setSubmittedStatus(attending ? 'CONFIRMED' : 'DECLINED');
    } catch (err: any) {
      setErrorMsg(err.message || 'Ocorreu um erro ao comunicar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" className="py-16 sm:py-24 px-4 bg-sand-50 relative">
      <div className="max-w-xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-6 sm:p-10 rounded-3xl glass-card border border-blush-200 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blush-200/30 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-champagne-200/30 rounded-full blur-2xl pointer-events-none" />

          <span className="text-xs uppercase tracking-widest text-champagne-600 font-medium">
            Confirmação de Presença
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-light mt-2 mb-2">
            Confirme a Sua Presença
          </h2>

          <div className="w-16 h-[1px] bg-champagne-400 mx-auto mb-6" />

          {/* Individual Invitation Badge */}
          <div className="mb-6 p-3 rounded-xl bg-champagne-100/70 border border-champagne-200/80 inline-flex items-center gap-2 text-xs font-medium text-champagne-700">
            <UserCheck className="w-4 h-4 text-champagne-600" />
            <span>Convite Individual (1 pessoa por confirmação)</span>
          </div>

          <AnimatePresence mode="wait">
            {submittedStatus ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="py-10 px-4 text-center flex flex-col items-center"
              >
                {submittedStatus === 'CONFIRMED' ? (
                  <>
                    <div className="w-20 h-20 rounded-full bg-blush-100 border-2 border-blush-300 flex items-center justify-center text-blush-500 mb-6 shadow-lg shadow-blush-200/50">
                      <Sparkles className="w-10 h-10 animate-pulse text-champagne-500" />
                    </div>
                    <h3 className="font-serif text-3xl text-charcoal-900 font-light mb-3">
                      Presença confirmada ✨
                    </h3>
                    <p className="font-serif text-lg text-charcoal-800 italic max-w-md mx-auto leading-relaxed">
                      "Obrigado por fazer parte deste momento especial."
                    </p>
                    <p className="text-xs text-charcoal-800/80 mt-6 bg-white/80 py-2 px-4 rounded-full border border-sand-200">
                      Esperamos por si no dia <span className="font-semibold">05 de Outubro às 14:30</span> no Restaurante Ouriço.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 rounded-full bg-sand-200 border-2 border-sand-300 flex items-center justify-center text-charcoal-600 mb-6 shadow-md">
                      <CheckCircle2 className="w-10 h-10 text-charcoal-700" />
                    </div>
                    <h3 className="font-serif text-2xl text-charcoal-900 font-light mb-2">
                      Obrigado pela resposta.
                    </h3>
                    <p className="text-sm font-light text-charcoal-800 max-w-md mx-auto">
                      Sentiremos a sua falta na celebração, mas agradecemos muito o seu carinho!
                    </p>
                  </>
                )}

                <button
                  onClick={() => setSubmittedStatus(null)}
                  className="mt-8 text-xs font-medium text-champagne-600 hover:text-champagne-700 underline tracking-wider uppercase"
                >
                  Alterar minha resposta
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6 text-left"
              >
                {errorMsg && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium text-center">
                    {errorMsg}
                  </div>
                )}

                {/* Nome Completo */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal-800 font-medium mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-champagne-500" />
                    <span>Nome completo *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome e sobrenome"
                    className="w-full px-4 py-3.5 rounded-xl border border-sand-300 bg-white/90 text-charcoal-900 placeholder:text-charcoal-800/40 text-sm focus:outline-none focus:border-champagne-400 focus:ring-2 focus:ring-champagne-200 transition-all shadow-sm"
                  />
                </div>

                {/* Telefone */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal-800 font-medium mb-2 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-champagne-500" />
                    <span>Telefone *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+258 84 000 0000"
                    className="w-full px-4 py-3.5 rounded-xl border border-sand-300 bg-white/90 text-charcoal-900 placeholder:text-charcoal-800/40 text-sm focus:outline-none focus:border-champagne-400 focus:ring-2 focus:ring-champagne-200 transition-all shadow-sm"
                  />
                </div>

                {/* Question: Vai estar presente? */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal-800 font-medium mb-3">
                    Vai estar presente? *
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      type="button"
                      onClick={() => setAttending(true)}
                      className={`w-full p-4 rounded-xl border text-left text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                        attending === true
                          ? 'border-champagne-400 bg-champagne-50/80 text-charcoal-900 shadow-md ring-1 ring-champagne-300'
                          : 'border-sand-300 bg-white/80 text-charcoal-800 hover:bg-sand-100/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            attending === true
                              ? 'border-champagne-500 bg-champagne-500 text-white'
                              : 'border-sand-400'
                          }`}
                        >
                          {attending === true && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span>Sim, estarei presente</span>
                      </div>
                      <Sparkles className="w-4 h-4 text-champagne-500" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttending(false)}
                      className={`w-full p-4 rounded-xl border text-left text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                        attending === false
                          ? 'border-charcoal-400 bg-sand-200/70 text-charcoal-900 shadow-md ring-1 ring-charcoal-300'
                          : 'border-sand-300 bg-white/80 text-charcoal-800 hover:bg-sand-100/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            attending === false
                              ? 'border-charcoal-600 bg-charcoal-700 text-white'
                              : 'border-sand-400'
                          }`}
                        >
                          {attending === false && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span>Infelizmente, não poderei estar</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Observação (opcional) */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal-800 font-medium mb-2 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-champagne-500" />
                    <span>Observação (opcional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={observation}
                    onChange={(e) => setObservation(e.target.value)}
                    placeholder="Alguma mensagem especial para a aniversariante?"
                    className="w-full px-4 py-3 rounded-xl border border-sand-300 bg-white/90 text-charcoal-900 placeholder:text-charcoal-800/40 text-sm focus:outline-none focus:border-champagne-400 focus:ring-2 focus:ring-champagne-200 transition-all shadow-sm resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-8 rounded-full bg-gradient-to-r from-champagne-500 via-champagne-400 to-champagne-500 text-white font-medium text-xs tracking-widest uppercase shadow-lg shadow-champagne-500/25 hover:shadow-champagne-500/40 transition-all duration-300 flex items-center justify-center gap-2 border border-champagne-300 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>GRAVANDO RESPOSTA...</span>
                    </>
                  ) : (
                    <>
                      <span>CONFIRMAR PRESENÇA</span>
                      <Sparkles className="w-4 h-4 text-white" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
