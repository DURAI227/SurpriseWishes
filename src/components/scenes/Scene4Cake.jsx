import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wind, ArrowRight } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import { triggerCannons, triggerStarConfetti } from '../../utils/confetti';
import CrescentMoon from '../CrescentMoon';
import { bounceSpring, luxuryEase } from '../../utils/motionVariants';

export default function Scene4Cake({ config, onNext }) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [isBlowing, setIsBlowing] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowOut = () => {
    if (!candlesLit || isBlowing) return;

    setIsBlowing(true);
    sounds.playBlow();

    // After breeze passes, extinguish flames and release smoke
    setTimeout(() => {
      setCandlesLit(false);
      setIsBlowing(false);

      setTimeout(() => {
        sounds.playFanfare();
        triggerStarConfetti();
        triggerCannons();
        setWishMade(true);
      }, 500);
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 relative z-10 text-center">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7, ease: luxuryEase }}
        className="max-w-xl mx-auto mb-6"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#FFF8E7] font-serif-title mb-2">
          {config.scene4.heading}
        </h2>
        <p className="text-[#FFF8E7]/70 text-sm md:text-base max-w-md mx-auto font-serif">
          {config.scene4.subtitle}
        </p>
      </motion.div>

      {/* Cake Container with Candles & Flames + Three-Day Crescent Moon */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: luxuryEase }}
        className="relative my-4 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
      >
        {/* Dynamic Ambient Candle Glow */}
        <div
          className={`absolute inset-0 rounded-full blur-3xl transition-all duration-1000 -z-10 ${
            candlesLit
              ? 'bg-[#D6B56D]/25 scale-125'
              : 'bg-[#1E2D4A]/45 scale-100'
          }`}
        />

        {/* Three-Day Crescent Moon beside Cake */}
        <div className="flex flex-col items-center">
          <CrescentMoon size={130} showStar={true} />
          <span className="text-xs font-serif italic text-[#D6B56D] mt-2 max-w-[200px]">
            {candlesLit
              ? "Make your biggest birthday wish, my friend!"
              : "Your wish has ascended to the heavens! ✨"}
          </span>
        </div>

        {/* Cake Card with 3D Depth */}
        <div className="p-8 md:p-10 rounded-3xl glass-panel relative flex flex-col items-center border border-[#D6B56D]/45 shadow-2xl overflow-hidden">
          {/* Ethereal Breeze Animation while Blowing */}
          <AnimatePresence>
            {isBlowing && (
              <motion.div
                initial={{ x: -160, opacity: 0 }}
                animate={{ x: 200, opacity: [0, 0.9, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="absolute inset-0 pointer-events-none flex flex-col justify-center gap-4 z-30"
              >
                <div className="h-0.5 w-36 bg-gradient-to-r from-transparent via-white/80 to-transparent blur-[0.5px]" />
                <div className="h-0.5 w-48 bg-gradient-to-r from-transparent via-[#E5C07B] to-transparent ml-8 blur-[0.5px]" />
                <div className="h-0.5 w-40 bg-gradient-to-r from-transparent via-white/70 to-transparent ml-4 blur-[0.5px]" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-52 h-52 md:w-60 md:h-60 relative flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]">
              {/* Stand / Plate */}
              <ellipse cx="100" cy="175" rx="85" ry="15" fill="#0B0F19" />
              <ellipse cx="100" cy="172" rx="80" ry="12" fill="#1E2D4A" stroke="#D6B56D" strokeWidth="2.5" />

              {/* Bottom Tier */}
              <rect x="40" y="115" width="120" height="52" rx="12" fill="#172338" stroke="#D6B56D" strokeWidth="1.5" />
              <path
                d="M40 128 Q 55 142 70 128 Q 85 142 100 128 Q 115 142 130 128 Q 145 142 160 128 L 160 115 L 40 115 Z"
                fill="#D6B56D"
              />
              <circle cx="70" cy="148" r="4" fill="#FFF8E7" />
              <circle cx="100" cy="148" r="4" fill="#D6B56D" />
              <circle cx="130" cy="148" r="4" fill="#FFF8E7" />

              {/* Top Tier */}
              <rect x="60" y="75" width="80" height="42" rx="10" fill="#1E2D4A" stroke="#D6B56D" strokeWidth="1.5" />
              <path
                d="M60 86 Q 73 98 87 86 Q 100 98 113 86 Q 127 98 140 86 L 140 75 L 60 75 Z"
                fill="#FFF8E7"
              />

              {/* Candle 1 (Left) */}
              <rect x="72" y="48" width="6" height="28" rx="2" fill="#D6B56D" />
              <line x1="75" y1="42" x2="75" y2="48" stroke="#FFF8E7" strokeWidth="1.5" />

              {/* Candle 2 (Center) */}
              <rect x="97" y="40" width="6" height="36" rx="2" fill="#FFF8E7" stroke="#D6B56D" strokeWidth="0.8" />
              <line x1="100" y1="34" x2="100" y2="40" stroke="#FFF8E7" strokeWidth="1.5" />

              {/* Candle 3 (Right) */}
              <rect x="122" y="48" width="6" height="28" rx="2" fill="#D6B56D" />
              <line x1="125" y1="42" x2="125" y2="48" stroke="#FFF8E7" strokeWidth="1.5" />

              {/* Candle Flames with Multi-Layer Glow or Rising Smoke */}
              {candlesLit && (
                <g className={isBlowing ? '' : 'animate-flame'}>
                  {/* Left Flame */}
                  <g style={{ transformOrigin: '75px 36px' }} className={isBlowing ? 'rotate-45 transition-transform' : ''}>
                    <ellipse cx="75" cy="36" rx="5" ry="9" fill="#FFF8E7" />
                    <ellipse cx="75" cy="37" rx="3" ry="6" fill="#E5C07B" />
                    <circle cx="75" cy="38" r="1.8" fill="#FFFAEE" />
                  </g>

                  {/* Center Flame */}
                  <g style={{ transformOrigin: '100px 28px' }} className={isBlowing ? 'rotate-45 transition-transform' : ''}>
                    <ellipse cx="100" cy="28" rx="5.5" ry="10" fill="#FFF8E7" />
                    <ellipse cx="100" cy="29" rx="3.5" ry="7" fill="#E5C07B" />
                    <circle cx="100" cy="30" r="2" fill="#FFFAEE" />
                  </g>

                  {/* Right Flame */}
                  <g style={{ transformOrigin: '125px 36px' }} className={isBlowing ? 'rotate-45 transition-transform' : ''}>
                    <ellipse cx="125" cy="36" rx="5" ry="9" fill="#FFF8E7" />
                    <ellipse cx="125" cy="37" rx="3" ry="6" fill="#E5C07B" />
                    <circle cx="125" cy="38" r="1.8" fill="#FFFAEE" />
                  </g>
                </g>
              )}

              {/* Dissipating Smoke Wisps & Stardust Sparks when Extinguished */}
              {!candlesLit && (
                <g className="smoke-wisps">
                  <path
                    d="M 75 42 Q 72 32 78 22 T 74 12"
                    fill="none"
                    stroke="#FFF8E7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.6"
                    className="animate-pulse"
                  />
                  <path
                    d="M 100 34 Q 96 22 104 14 T 98 4"
                    fill="none"
                    stroke="#D6B56D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.7"
                    className="animate-pulse"
                  />
                  <path
                    d="M 125 42 Q 128 32 122 22 T 126 12"
                    fill="none"
                    stroke="#FFF8E7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.6"
                    className="animate-pulse"
                  />
                </g>
              )}
            </svg>
          </div>

          {/* Action Button: Blow Out the Candles */}
          {candlesLit && (
            <motion.button
              onClick={handleBlowOut}
              disabled={isBlowing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-8 py-3 rounded-full gold-gradient-btn text-[#101827] font-bold text-sm shadow-xl font-luxury flex items-center gap-2 cursor-pointer transition-transform"
            >
              <Wind className={`w-4 h-4 text-[#101827] ${isBlowing ? 'animate-spin' : ''}`} />
              <span>{isBlowing ? 'Blowing gently...' : config.scene4.blowButton}</span>
            </motion.button>
          )}

          {/* Wish Granted Celebration Banner */}
          {wishMade && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={bounceSpring}
              className="mt-4 p-4 rounded-2xl bg-[#172338]/90 border border-[#D6B56D]/50 text-center max-w-xs shadow-xl"
            >
              <div className="flex items-center justify-center gap-1.5 text-[#D6B56D] font-bold text-xs uppercase tracking-wider font-luxury mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D6B56D]" />
                <span>{config.scene4.wishGrantedTitle}</span>
              </div>
              <p className="text-[11px] text-[#FFF8E7]/80 font-serif">
                {config.scene4.wishGrantedSub}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Continue to Letter Button */}
      <AnimatePresence>
        {wishMade && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ease: luxuryEase }}
            className="mt-6"
          >
            <button
              onClick={() => {
                sounds.playChime();
                onNext();
              }}
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-base font-bold text-[#101827] gold-gradient-btn shadow-xl shadow-[#D6B56D]/30 hover:scale-105 active:scale-95 transition-all font-luxury cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-[#101827] animate-spin" style={{ animationDuration: '3s' }} />
              <span>{config.scene4.continueButton}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
