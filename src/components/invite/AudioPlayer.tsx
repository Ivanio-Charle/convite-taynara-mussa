'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    // Attempt autoplay immediately on page load
    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        // Autoplay policy prevented playback until user interaction
        setIsPlaying(false);
      }
    };

    tryAutoplay();

    // Listen to first user touch or click anywhere on screen to start audio smoothly
    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch(() => {});
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    window.addEventListener('scroll', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    }
  };

  return (
    <>
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src="/music/vaitimbora.mp3"
        loop
        preload="auto"
      />

      {/* Floating Ambient Music Control Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-5 right-5 z-40"
      >
        <button
          onClick={togglePlay}
          className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-full shadow-xl backdrop-blur-md transition-all duration-300 border ${
            isPlaying
              ? 'bg-charcoal-900/90 text-white border-champagne-400/60 ring-2 ring-champagne-400/20'
              : 'bg-white/90 text-charcoal-800 border-sand-300 hover:bg-white'
          }`}
          title={isPlaying ? 'Pausar Música' : 'Tocar Música'}
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            {isPlaying ? (
              <Disc className="w-5 h-5 text-champagne-400 animate-spin text-sm" style={{ animationDuration: '4s' }} />
            ) : (
              <Music className="w-4 h-4 text-charcoal-600" />
            )}
          </div>

          <span className="text-xs font-serif font-medium tracking-wide">
            {isPlaying ? 'Música' : 'Tocar Música 🎵'}
          </span>

          {/* Equalizer Bars Animation when Playing */}
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3 ml-0.5">
              <span className="w-0.5 bg-champagne-400 rounded-full animate-pulse h-3" />
              <span className="w-0.5 bg-champagne-300 rounded-full animate-pulse h-2" style={{ animationDelay: '0.2s' }} />
              <span className="w-0.5 bg-champagne-400 rounded-full animate-pulse h-3.5" style={{ animationDelay: '0.4s' }} />
            </div>
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-charcoal-400 ml-0.5" />
          )}
        </button>
      </motion.div>
    </>
  );
}
