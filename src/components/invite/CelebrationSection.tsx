'use client';

import { motion } from 'framer-motion';
import { Heart, Sun, Sunset } from 'lucide-react';
import Image from 'next/image';

export default function CelebrationSection() {
  return (
    <section className="relative py-16 sm:py-24 px-4 bg-sand-50 overflow-hidden">
      {/* Background Decorative Gradient Wave */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-sand-100 to-transparent" />

      <div className="max-w-xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-8 sm:p-10 rounded-3xl glass-card border border-blush-200/60 shadow-xl relative"
        >
          {/* Subtle Decorative Icon */}
          <div className="w-12 h-12 rounded-full bg-blush-100 flex items-center justify-center mx-auto mb-6 text-blush-400">
            <Heart className="w-5 h-5 fill-blush-300 stroke-blush-400" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-light mb-4 leading-snug">
            A Celebração
          </h2>

          <div className="w-16 h-[1px] bg-champagne-300 mx-auto mb-6" />

          {/* Main Emotional Quote */}
          <p className="font-serif text-lg sm:text-xl text-charcoal-800 italic leading-relaxed mb-6">
            "Há momentos que ficam ainda mais especiais quando são partilhados."
          </p>

          <p className="text-sm sm:text-base font-light text-charcoal-800 leading-relaxed max-w-md mx-auto">
            Gostaria muito de contar com a sua presença para celebrarmos juntos mais um ano de vida num final de tarde descontraído à beira-mar.
          </p>

          {/* Venue Preview Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 relative rounded-2xl overflow-hidden shadow-md aspect-[16/9] group"
          >
            <Image
              src="/images/ourico-sunset.jpg"
              alt="Restaurante Ouriço ao por do sol"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-charcoal-900/20 to-transparent flex items-end p-4">
              <div className="text-left text-white">
                <p className="text-xs uppercase tracking-widest text-champagne-300 font-medium flex items-center gap-1.5">
                  <Sunset className="w-3.5 h-3.5" />
                  <span>Ambiente à Beira-Mar</span>
                </p>
                <p className="font-serif text-base sm:text-lg">Restaurante Ouriço — Beira</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
