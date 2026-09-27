'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { UtensilsCrossed, X, ZoomIn, FileText } from 'lucide-react';

export default function MenuSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const menuPages = [
    { src: '/images/menu/menu-1.jpg', title: 'Sangrias, Vinhos & Cocktails', subtitle: 'Bebidas e Licores' },
    { src: '/images/menu/menu-2.jpg', title: 'Águas, Cafés & Cervejas', subtitle: 'Refrescos e Cervejas' },
    { src: '/images/menu/menu-3.jpg', title: 'Entradas & Petisco', subtitle: 'Para Partilhar' },
    { src: '/images/menu/menu-4.jpg', title: 'Pratos Principais', subtitle: 'Marisco & Especialidades' },
    { src: '/images/menu/menu-5.jpg', title: 'Grelhados & Carnes', subtitle: 'Opções da Casa' },
    { src: '/images/menu/menu-6.jpg', title: 'Sobremesas & Extras', subtitle: 'Doces e Digestivos' },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 bg-sand-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <div className="w-12 h-12 rounded-full bg-champagne-100 flex items-center justify-center mx-auto mb-4 text-champagne-600">
            <UtensilsCrossed className="w-5 h-5" />
          </div>

          <span className="text-xs uppercase tracking-widest text-champagne-600 font-medium bg-champagne-50/80 px-4 py-1.5 rounded-full border border-champagne-200">
            Consumo Individual
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-light mt-3 mb-2">
            Menu & Preços
          </h2>

          <div className="w-16 h-[1px] bg-champagne-400 mx-auto mt-2 mb-4" />

          <p className="text-xs sm:text-sm text-charcoal-800 font-light max-w-md mx-auto leading-relaxed">
            Consulte as opções de bebidas e pratos do <span className="font-medium text-charcoal-900">Restaurante Ouriço</span> com os respetivos preços. Toque em qualquer imagem para ampliar.
          </p>
        </motion.div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {menuPages.map((menu, index) => (
            <motion.div
              key={menu.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(menu.src)}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md cursor-pointer group bg-white border border-sand-300"
            >
              <Image
                src={menu.src}
                alt={menu.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Hover / Touch Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/40 to-transparent opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-left">
                <div className="flex items-center justify-between text-white mb-1">
                  <span className="text-[10px] font-medium tracking-widest text-champagne-300 uppercase">
                    {menu.subtitle}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <ZoomIn className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <p className="font-serif text-sm font-semibold text-white leading-snug">
                  {menu.title}
                </p>
                <p className="text-[10px] text-sand-200 mt-0.5">Toque para ampliar preços</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-charcoal-900/95 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-4"
          >
            <div className="relative w-full max-w-2xl h-[82vh] rounded-2xl overflow-hidden shadow-2xl bg-black">
              <Image
                src={selectedImage}
                alt="Menu Ampliado"
                fill
                className="object-contain"
                priority
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/80 transition-colors border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-sand-200 mt-3 font-light">
              Toque fora ou no X para fechar
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
