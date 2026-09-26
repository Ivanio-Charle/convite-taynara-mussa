'use client';

import { motion } from 'framer-motion';
import { CreditCard, Info } from 'lucide-react';

export default function AccountSection() {
  return (
    <section className="py-12 sm:py-16 px-4 bg-sand-100 relative">
      <div className="max-w-xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-sand-300 shadow-md relative overflow-hidden"
        >
          {/* Top Decorative Border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-champagne-400 to-transparent" />

          <div className="w-10 h-10 rounded-full bg-champagne-100 flex items-center justify-center mx-auto mb-3 text-champagne-600">
            <CreditCard className="w-5 h-5" />
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-light mb-2">
            Sobre a Conta
          </h3>

          <div className="w-12 h-[1px] bg-champagne-300 mx-auto mb-4" />

          <p className="text-sm sm:text-base font-light text-charcoal-800 leading-relaxed max-w-sm mx-auto">
            "Cada convidado será responsável pela sua própria conta."
          </p>

          <p className="text-xs text-charcoal-800/80 mt-3 italic">
            Para podermos desfrutar do menu e bebidas do Restaurante Ouriço com total conforto e liberdade.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
