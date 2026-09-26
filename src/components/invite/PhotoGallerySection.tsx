'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Camera, X, Sunset } from 'lucide-react';

export default function PhotoGallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const photos = [
    { src: '/images/ourico-sunset.jpg', title: 'Pôr do Sol no Ouriço', desc: 'Final de tarde deslumbrante à beira-mar' },
    { src: '/images/ourico-beach.jpg', title: 'Vista da Praia', desc: 'Guarda-sóis e brisa do oceano' },
    { src: '/images/ourico-entrance.jpg', title: 'Entrada Principal', desc: 'Estrutura artesanal em bambu' },
    { src: '/images/ourico-night.jpg', title: 'Iluminação Noturna', desc: 'Cordões de luzes e palmeiras' },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 bg-sand-100 relative">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <span className="text-xs uppercase tracking-widest text-champagne-600 font-medium bg-white/80 px-4 py-1.5 rounded-full border border-champagne-200">
            Ambiente & Atmosfera
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-light mt-3 mb-2">
            Restaurante Ouriço
          </h2>
          <div className="w-16 h-[1px] bg-champagne-400 mx-auto mt-2" />
        </motion.div>

        {/* Photos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedImage(photo.src)}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-md cursor-pointer group border border-sand-300"
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 text-left">
                <div className="text-white text-xs">
                  <p className="font-serif font-medium">{photo.title}</p>
                  <p className="text-[10px] text-champagne-200 opacity-90">{photo.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-charcoal-900/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="relative max-w-3xl w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image src={selectedImage} alt="Preview" fill className="object-contain" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center backdrop-blur-md hover:bg-white/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
