'use client';

import HeroSection from '@/components/invite/HeroSection';
import CelebrationSection from '@/components/invite/CelebrationSection';
import WhenWhereSection from '@/components/invite/WhenWhereSection';
import DressCodeSection from '@/components/invite/DressCodeSection';
import AccountSection from '@/components/invite/AccountSection';
import MenuSection from '@/components/invite/MenuSection';
import PhotoGallerySection from '@/components/invite/PhotoGallerySection';
import RsvpSection from '@/components/invite/RsvpSection';
import AudioPlayer from '@/components/invite/AudioPlayer';

export default function PublicInvitePage() {
  const scrollToRsvp = () => {
    const rsvpElement = document.getElementById('rsvp');
    if (rsvpElement) {
      rsvpElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-sand-50 relative overflow-x-hidden">
      {/* Background Ambient Music Player (Only on public invite page) */}
      <AudioPlayer />

      {/* 1. Hero Section */}
      <HeroSection onConfirmClick={scrollToRsvp} />

      {/* 2. Celebration Section */}
      <CelebrationSection />

      {/* 3. When & Where Section */}
      <WhenWhereSection />

      {/* 4. Dress Code Section */}
      <DressCodeSection />

      {/* 5. Account Section */}
      <AccountSection />

      {/* 6. Menu & Preços */}
      <MenuSection />

      {/* 7. Venue Gallery */}
      <PhotoGallerySection />

      {/* 8. RSVP Section */}
      <RsvpSection />

      {/* Footer */}
      <footer className="py-10 px-4 bg-sand-200/60 border-t border-sand-300 text-center relative z-10">
        <div className="max-w-md mx-auto flex flex-col items-center gap-2">
          <p className="font-serif text-lg text-charcoal-900 font-light">
            Taynara Mussa <span className="text-champagne-500 font-bold">•</span> Aniversário
          </p>
          <p className="text-xs text-charcoal-800 font-light flex items-center justify-center gap-1">
            <span>05 de Outubro</span>
            <span>•</span>
            <span>Restaurante Ouriço</span>
          </p>
          <div className="mt-4 pt-4 border-t border-sand-300/80 w-full flex items-center justify-between text-[11px] text-charcoal-800/80 font-light">
            <span>Beira, Moçambique</span>
            <a
              href="/admin/login"
              className="hover:text-champagne-600 transition-colors uppercase tracking-widest text-[10px]"
            >
              Área Administrativa
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
