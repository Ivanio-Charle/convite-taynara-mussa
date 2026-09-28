'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function WhenWhereSection() {
  const googleMapsUrl =
    'https://www.google.com/maps/search/?api=1&query=Restaurante+Ouri%C3%A7o+Macuti+Beira+Mo%C3%A7ambique';

  return (
    <section className="py-16 sm:py-24 px-4 bg-sand-100 relative overflow-hidden">
      <div className="max-w-xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="text-xs uppercase tracking-widest text-champagne-600 font-medium bg-champagne-100/80 px-4 py-1.5 rounded-full border border-champagne-200">
            Detalhes do Evento
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-light mt-4 mb-2">
            Quando & Onde
          </h2>
          <div className="w-16 h-[1px] bg-champagne-400 mx-auto mt-2" />
        </motion.div>

        {/* Info Grid Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-3xl p-6 sm:p-8 border border-blush-200/80 shadow-xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
            {/* Date Card */}
            <div className="p-4 rounded-2xl bg-white/80 border border-sand-200 shadow-sm flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blush-100 flex items-center justify-center mb-3 text-blush-400">
                <Calendar className="w-5 h-5" />
              </div>
              <p className="text-xs uppercase tracking-wider text-charcoal-800 font-medium">Data</p>
              <p className="font-serif text-2xl text-charcoal-900 font-medium mt-1">05 de Outubro</p>
            </div>

            {/* Time Card */}
            <div className="p-4 rounded-2xl bg-white/80 border border-sand-200 shadow-sm flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-champagne-100 flex items-center justify-center mb-3 text-champagne-600">
                <Clock className="w-5 h-5" />
              </div>
              <p className="text-xs uppercase tracking-wider text-charcoal-800 font-medium">Horário</p>
            </div>
          </div>

          {/* RSVP Deadline Notice */}
          <div className="mt-4 p-3.5 rounded-2xl bg-champagne-50/90 border border-champagne-200 text-xs text-charcoal-900 font-medium flex items-center justify-center gap-2 shadow-sm">
            <Calendar className="w-4 h-4 text-champagne-600 shrink-0" />
            <span>Favor confirmar a sua presença até dia <strong className="text-champagne-700">03 de Outubro</strong></span>
          </div>

          {/* Location Block */}
          <div className="mt-6 p-6 rounded-2xl bg-white/90 border border-champagne-200/60 shadow-sm text-center">
            <div className="w-12 h-12 rounded-full bg-champagne-100 flex items-center justify-center mx-auto mb-3 text-champagne-600">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-charcoal-900 font-medium mb-1">
              Restaurante Ouriço
            </h3>
            <p className="text-sm text-charcoal-800 font-light">Macuti, Beira</p>
            <p className="text-xs text-charcoal-800/80 mt-1 font-light">Moçambique</p>

            {/* Location Button */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 py-3 px-6 rounded-full bg-charcoal-900 text-sand-50 hover:bg-charcoal-800 text-xs tracking-widest uppercase font-medium shadow-md transition-all duration-300 hover:shadow-lg active:scale-98"
            >
              <span>VER LOCALIZAÇÃO</span>
              <ExternalLink className="w-3.5 h-3.5 text-champagne-400" />
            </a>
          </div>

          {/* Secondary Photo Row */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm">
              <Image
                src="/images/ourico-entrance.jpg"
                alt="Entrada Restaurante Ouriço"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm">
              <Image
                src="/images/ourico-beach.jpg"
                alt="Vista Praia Ouriço"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
