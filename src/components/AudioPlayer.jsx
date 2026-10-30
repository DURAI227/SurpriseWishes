import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function AudioPlayer({ audioConfig }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [useSynthesizer, setUseSynthesizer] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    sounds.isMuted = isMuted;
  }, [isMuted]);

  const togglePlay = () => {
    if (!isPlaying) {
      if (audioRef.current && audioConfig?.url && !useSynthesizer) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setUseSynthesizer(true);
            sounds.startCelestialMusic();
            setIsPlaying(true);
          });
      } else {
        sounds.startCelestialMusic();
        setIsPlaying(true);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      sounds.stopCelestialMusic();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
    sounds.isMuted = nextMuted;
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      {audioConfig?.url && (
        <audio
          ref={audioRef}
          src={audioConfig.url}
          loop
          preload="metadata"
          onEnded={() => {
            if (audioRef.current) audioRef.current.play();
          }}
          onError={() => {
            setUseSynthesizer(true);
          }}
        />
      )}

      {/* Luxury Midnight Navy & Champagne Gold Music Pill Control */}
      <div className="glass-panel p-1.5 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1.5 sm:gap-2.5 shadow-xl border border-[#D6B56D]/45 backdrop-blur-md transition-all hover:border-[#D6B56D]">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          className="w-8 h-8 rounded-full gold-gradient-btn flex items-center justify-center text-[#101827] shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          )}
        </button>

        <div className="hidden sm:flex flex-col pr-1 select-none">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-[#D6B56D] font-luxury tracking-wider">
              {isPlaying ? 'Melody Playing' : 'Play Music'}
            </span>
            {/* Animated Equalizer Wave Bars */}
            {isPlaying && (
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 h-full bg-[#D6B56D] rounded-full animate-bounce" style={{ animationDuration: '0.8s' }} />
                <span className="w-0.5 h-2/3 bg-[#FFF8E7] rounded-full animate-bounce" style={{ animationDuration: '0.6s', animationDelay: '0.2s' }} />
                <span className="w-0.5 h-4/5 bg-[#D6B56D] rounded-full animate-bounce" style={{ animationDuration: '0.7s', animationDelay: '0.4s' }} />
              </div>
            )}
          </div>
          <span className="text-[9px] text-[#FFF8E7]/60 font-serif">
            {useSynthesizer ? 'Celestial Melody' : 'Royal Birthday Harmony'}
          </span>
        </div>

        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          className="p-1 rounded-full hover:bg-white/10 text-[#D6B56D] transition-colors cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-slate-400" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
