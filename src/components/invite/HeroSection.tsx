'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import FloatingParticles from './FloatingParticles';

interface HeroSectionProps {
  onConfirmClick: () => void;
}

export default function HeroSection({ onConfirmClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-between items-center text-center px-4 pt-10 pb-8 overflow-hidden bg-gradient-to-b from-sand-100 via-sand-50 to-sand-100">
      <FloatingParticles />

      {/* Decorative Top Border Ring */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-[2px] bg-gradient-to-r from-transparent via-champagne-400 to-transparent opacity-60" />

      {/* Top Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-champagne-300/60 bg-white/70 backdrop-blur-md text-xs tracking-widest text-champagne-600 uppercase font-medium shadow-sm"
      >
        <Sparkles className="w-3.5 h-3.5 text-champagne-500" />
        <span>Convite de Aniversário</span>
        <Sparkles className="w-3.5 h-3.5 text-champagne-500" />
      </motion.div>

      {/* Main Hero Card Container */}
      <div className="z-10 my-auto py-6 max-w-lg w-full flex flex-col items-center">
        {/* Script Subtitle */}
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-script text-4xl sm:text-5xl text-blush-400 mb-1"
        >
          Celebração dos meus 18 anos 
        </motion.p>

        {/* Main Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl font-light text-charcoal-900 tracking-tight leading-tight"
        >
          Taynara Mussa
        </motion.h1>

        {/* Decorative Gold Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-champagne-400 to-transparent my-4"
        />

        {/* Invitation Sentence */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-lg font-light text-charcoal-800 italic max-w-xs sm:max-w-sm mx-auto leading-relaxed px-2"
        >
          "Um dia especial merece ser celebrado com pessoas especiais."
        </motion.p>

        {/* Event Date Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 mb-8 p-4 sm:p-5 rounded-2xl glass-card border border-blush-200/80 shadow-md w-full max-w-xs sm:max-w-sm"
        >
          <div className="flex items-center justify-center gap-3 text-charcoal-900 font-serif text-lg sm:text-xl font-medium tracking-wider">
            <span>05</span>
            <span className="text-champagne-500 font-bold">•</span>
            <span className="uppercase text-base sm:text-lg">OUTUBRO</span>
            <span className="text-champagne-500 font-bold">•</span>
            <span>14:30</span>
          </div>
          <div className="mt-2 text-xs font-sans text-charcoal-800 tracking-wide flex items-center justify-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blush-400 inline" />
            <span>Restaurante Ouriço — Macuti, Beira</span>
          </div>
          <div className="mt-2 pt-2 border-t border-sand-200/80 text-[11px] text-champagne-700 font-medium tracking-wide flex items-center justify-center gap-1">
            <Calendar className="w-3 h-3 text-champagne-500" />
            <span>Favor confirmar até 03 de Outubro</span>
          </div>
        </motion.div>

        {/* Confirm Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onConfirmClick}
          className="w-full max-w-xs py-4 px-8 rounded-full bg-gradient-to-r from-champagne-500 via-champagne-400 to-champagne-500 text-white font-medium text-sm tracking-widest uppercase shadow-lg shadow-champagne-500/20 hover:shadow-champagne-500/35 transition-all duration-300 flex items-center justify-center gap-2 group border border-champagne-300"
        >
          <span>CONFIRMAR PRESENÇA</span>
          <Sparkles className="w-4 h-4 text-white/90 group-hover:rotate-12 transition-transform" />
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="z-10 flex flex-col items-center gap-1 text-charcoal-800 text-xs tracking-wider"
      >
        <span className="font-light">Deslize para descobrir o convite</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-champagne-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
