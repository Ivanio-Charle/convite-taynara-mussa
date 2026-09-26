'use client';

import { motion } from 'framer-motion';
import { Sparkles, Palette } from 'lucide-react';

export default function DressCodeSection() {
  const colors = [
    {
      name: 'Branco',
      hex: '#FFFFFF',
      border: 'border-sand-300',
      shadow: 'shadow-white/80',
      description: 'Pureza & Elegância',
    },
    {
      name: 'Cinza Claro',
      hex: '#E5E7EB',
      border: 'border-gray-300',
      shadow: 'shadow-gray-300/50',
      description: 'Sofisticação Urbana',
    },
    {
      name: 'Rosa Claro',
      hex: '#F7EBE8',
      border: 'border-blush-300',
      shadow: 'shadow-blush-300/50',
      description: 'Romance & Suavidade',
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 bg-sand-50 relative overflow-hidden">
      <div className="max-w-xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-8 sm:p-10 rounded-3xl glass-card border border-blush-200/70 shadow-xl"
        >
          <div className="w-12 h-12 rounded-full bg-blush-100 flex items-center justify-center mx-auto mb-4 text-blush-400">
            <Palette className="w-5 h-5" />
          </div>

          <span className="text-xs uppercase tracking-widest text-champagne-600 font-medium">
            Sugestão de Traje
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-light mt-2 mb-3">
            Dress Code
          </h2>

          <div className="w-16 h-[1px] bg-champagne-400 mx-auto mb-6" />

          {/* Color Names Display */}
          <p className="font-serif text-xl sm:text-2xl text-charcoal-900 font-medium tracking-wide mb-6">
            Branco <span className="text-champagne-400">•</span> Cinza Claro <span className="text-champagne-400">•</span> Rosa Claro
          </p>

          {/* Color Swatches Grid */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 my-8 max-w-sm mx-auto">
            {colors.map((color, idx) => (
              <motion.div
                key={color.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="flex flex-col items-center group"
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 ${color.border} shadow-lg ${color.shadow} p-1 relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300 bg-white`}
                >
                  <div
                    className="w-full h-full rounded-full border border-black/5 shadow-inner"
                    style={{ backgroundColor: color.hex }}
                  />
                  {/* Outer Gold Ring Accent */}
                  <div className="absolute inset-0 rounded-full border border-champagne-300/40 pointer-events-none" />
                </div>
                <span className="mt-3 text-xs sm:text-sm font-medium text-charcoal-900">
                  {color.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Phrase */}
          <p className="font-serif text-base sm:text-lg text-charcoal-800 italic max-w-xs mx-auto leading-relaxed">
            "Escolha um dos tons e venha celebrar connosco."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
