import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import { triggerCannons, triggerStarConfetti } from '../../utils/confetti';
import CrescentMoon from '../CrescentMoon';
import { luxuryEase, bounceSpring, wordReveal } from '../../utils/motionVariants';

export default function Scene2Reveal({ config, onNext }) {
  useEffect(() => {
    sounds.playFanfare();
    triggerCannons();
    const timer = setTimeout(() => {
      triggerStarConfetti();
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    sounds.playChime();
    triggerCannons();
    onNext();
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 relative z-10 text-center">
      {/* Kinetic Staggered Animated Title */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.15 }}
        className="max-w-3xl mx-auto mb-6"
      >
        <motion.div variants={wordReveal} className="overflow-hidden">
          <span className="block text-2xl sm:text-3xl md:text-4xl font-luxury font-bold text-[#D6B56D] uppercase tracking-widest mb-2 drop-shadow-[0_2px_10px_rgba(214,181,109,0.3)]">
            {config.scene2.headingPrefix}
          </span>
        </motion.div>

        <motion.div variants={wordReveal} className="overflow-hidden">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight font-serif-title text-[#FFF8E7] drop-shadow-2xl leading-tight">
            <span className="shimmer-text">
              {config.recipientName}!
            </span>
          </h1>
        </motion.div>
      </motion.div>

      {/* Centerpiece: Royal Cake & Three-Day Crescent Moon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.3, ease: luxuryEase }}
        className="relative my-4 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-[#D6B56D]/15 rounded-full blur-3xl -z-10 scale-125 pointer-events-none" />

        <div className="p-6 md:p-8 rounded-3xl glass-panel relative flex flex-col sm:flex-row items-center gap-6 sm:gap-10 border border-[#D6B56D]/45 shadow-2xl">
          {/* Three-Day Crescent Moon beside Cake */}
          <div className="flex flex-col items-center">
            <CrescentMoon size={135} showStar={true} />
            <span className="text-xs font-serif italic text-[#D6B56D] mt-2 max-w-[200px]">
              "To the most wonderful friend, Fawzia Banu!" 🌙
            </span>
          </div>

          {/* Luxury Royal Midnight & Champagne Gold Cake */}
          <motion.div
            whileHover={{ scale: 1.04, rotate: 1 }}
            transition={bounceSpring}
            className="w-36 h-36 md:w-44 md:h-44 relative flex items-center justify-center cursor-pointer"
          >
            <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]">
              {/* Stand / Plate */}
              <ellipse cx="80" cy="140" rx="65" ry="12" fill="#0B0F19" />
              <ellipse cx="80" cy="138" rx="60" ry="10" fill="#1E2D4A" stroke="#D6B56D" strokeWidth="2" />

              {/* Bottom Tier */}
              <rect x="35" y="95" width="90" height="40" rx="8" fill="#172338" stroke="#D6B56D" strokeWidth="1.5" />
              <path d="M35 105 Q 45 115 55 105 Q 65 115 75 105 Q 85 115 95 105 Q 105 115 115 105 Q 125 115 125 105 L 125 95 L 35 95 Z" fill="#D6B56D" opacity="0.9" />

              {/* Top Tier */}
              <rect x="50" y="65" width="60" height="32" rx="6" fill="#1E2D4A" stroke="#D6B56D" strokeWidth="1.5" />
              <path d="M50 73 Q 60 80 70 73 Q 80 80 90 73 Q 100 80 110 73 L 110 65 L 50 65 Z" fill="#FFF8E7" />

              {/* Gold Pearls on Cake */}
              <circle cx="58" cy="98" r="3.5" fill="#FFF8E7" />
              <circle cx="80" cy="98" r="3.5" fill="#D6B56D" />
              <circle cx="102" cy="98" r="3.5" fill="#FFF8E7" />

              {/* Candles */}
              <rect x="62" y="44" width="5" height="22" rx="2" fill="#D6B56D" />
              <line x1="64.5" y1="40" x2="64.5" y2="44" stroke="#FFF8E7" strokeWidth="1.5" />

              <rect x="78" y="38" width="5" height="28" rx="2" fill="#FFF8E7" stroke="#D6B56D" strokeWidth="0.5" />
              <line x1="80.5" y1="34" x2="80.5" y2="38" stroke="#FFF8E7" strokeWidth="1.5" />

              <rect x="94" y="44" width="5" height="22" rx="2" fill="#D6B56D" />
              <line x1="96.5" y1="40" x2="96.5" y2="44" stroke="#FFF8E7" strokeWidth="1.5" />

              {/* Animated Candle Flames with Realistic Dance */}
              <g className="animate-flame" style={{ transformOrigin: '64.5px 36px' }}>
                <ellipse cx="64.5" cy="36" rx="4" ry="7" fill="#FFF8E7" />
                <ellipse cx="64.5" cy="37" rx="2.5" ry="5" fill="#E5C07B" />
                <circle cx="64.5" cy="38" r="1.5" fill="#FFFAEE" />
              </g>

              <g className="animate-flame" style={{ transformOrigin: '80.5px 30px', animationDelay: '0.2s' }}>
                <ellipse cx="80.5" cy="30" rx="4.5" ry="8" fill="#FFF8E7" />
                <ellipse cx="80.5" cy="31" rx="3" ry="6" fill="#E5C07B" />
                <circle cx="80.5" cy="32" r="1.8" fill="#FFFAEE" />
              </g>

              <g className="animate-flame" style={{ transformOrigin: '96.5px 36px', animationDelay: '0.4s' }}>
                <ellipse cx="96.5" cy="36" rx="4" ry="7" fill="#FFF8E7" />
                <ellipse cx="96.5" cy="37" rx="2.5" ry="5" fill="#E5C07B" />
                <circle cx="96.5" cy="38" r="1.5" fill="#FFFAEE" />
              </g>
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Sub-message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-xl mx-auto text-[#FFF8E7]/80 text-sm md:text-base leading-relaxed my-4 font-serif"
      >
        {config.scene2.subMessage}
      </motion.p>

      {/* Start Button with Golden Sweep */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.65, ease: luxuryEase }}
        className="mt-6"
      >
        <button
          onClick={handleStart}
          className="group relative overflow-hidden inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-base font-bold text-[#101827] gold-gradient-btn shadow-xl shadow-[#D6B56D]/25 hover:scale-105 active:scale-95 transition-all font-luxury cursor-pointer"
        >
          {/* Internal light sheen sweep */}
          <div className="absolute inset-0 w-1/3 bg-white/40 skew-x-12 animate-light-sweep pointer-events-none" />
          <Sparkles className="w-5 h-5 text-[#101827] group-hover:rotate-45 transition-transform" />
          <span>{config.scene2.ctaButton}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
}
