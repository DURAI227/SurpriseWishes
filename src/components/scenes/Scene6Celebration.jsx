import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCcw } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import { triggerFireworks, triggerCannons, triggerStarConfetti } from '../../utils/confetti';
import CrescentMoon from '../CrescentMoon';
import { luxuryEase, wordReveal } from '../../utils/motionVariants';

export default function Scene7Celebration({ config, onReplay }) {
  useEffect(() => {
    sounds.playFanfare();
    triggerCannons();
    triggerStarConfetti();
    triggerFireworks(3500);
  }, []);

  const handleReplayClick = () => {
    sounds.playChime();
    onReplay();
  };

  // Floating Sky Lanterns in background
  const lanterns = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: 10 + i * 16,
      delay: i * 1.8,
      duration: 12 + i * 2,
      size: 28 + (i % 3) * 6,
    }));
  }, []);

  const headingText =
    config.scene7?.heading || config.scene6?.heading || 'HAPPY BIRTHDAY ONCE AGAIN!';
  const subheadingText =
    config.scene7?.subheading ||
    config.scene6?.subheading ||
    "Thank you for being such an incredible friend! Here's to more shared adventures, endless laughter, and a year full of happiness, success, and big dreams coming true!";

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 relative z-10 text-center overflow-hidden">
      {/* Drifting Golden Sky Lanterns */}
      {lanterns.map((l) => (
        <motion.div
          key={l.id}
          className="absolute pointer-events-none"
          style={{ left: `${l.left}%`, width: l.size, height: l.size * 1.3 }}
          initial={{ bottom: '-15%', opacity: 0 }}
          animate={{
            bottom: '115%',
            opacity: [0, 0.75, 0.75, 0],
            x: [0, 15, -15, 0],
          }}
          transition={{
            duration: l.duration,
            repeat: Infinity,
            delay: l.delay,
            ease: 'easeInOut',
          }}
        >
          <div className="w-full h-full rounded-t-2xl rounded-b-md bg-gradient-to-t from-[#B8934A]/80 via-[#D6B56D]/80 to-[#FFF8E7]/90 shadow-[0_0_20px_rgba(214,181,109,0.6)] flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#FFF] animate-pulse" />
          </div>
        </motion.div>
      ))}

      {/* Grand Title with Kinetic Word Reveal */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.15 }}
        className="max-w-3xl mx-auto mb-6"
      >
        <motion.div variants={wordReveal} className="overflow-hidden">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight font-serif-title text-[#FFF8E7] leading-tight">
            <span className="shimmer-text block">{headingText}</span>
            <span className="text-2xl sm:text-3xl md:text-4xl font-luxury font-bold text-[#D6B56D] block mt-2 drop-shadow-[0_2px_12px_rgba(214,181,109,0.4)]">
              Dearest {config.recipientName}! 🌙
            </span>
          </h1>
        </motion.div>
      </motion.div>

      {/* Center Character & Celebration Card with Three-Day Crescent Moon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.3, ease: luxuryEase }}
        className="p-8 md:p-10 rounded-3xl glass-panel max-w-xl w-full my-6 relative overflow-hidden shadow-2xl border border-[#D6B56D]/50 flex flex-col items-center"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#D6B56D]/15 via-[#172554]/35 to-[#D6B56D]/15 blur-xl pointer-events-none" />

        {/* Three-Day Crescent Moon with Glowing Halo */}
        <div className="my-2 flex flex-col items-center">
          <CrescentMoon size={145} showStar={true} />
          <span className="text-xs font-serif italic text-[#D6B56D] mt-3">
            "To the truest, most amazing friend in the universe — Happy Birthday, Fawzia Banu!" 🌙
          </span>
        </div>

        <p className="text-[#FFF8E7]/90 text-sm sm:text-base leading-relaxed mt-4 font-serif">
          {subheadingText}
        </p>

        {/* Golden Sparkle Divider with Rotating Stars */}
        <div className="flex items-center justify-center gap-2 my-5 text-[#D6B56D]">
          <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
          <span className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D6B56D] to-transparent" />
          <span className="text-xs font-luxury text-[#FFF8E7]/70 italic tracking-wider">
            BEST FRIENDS FOREVER ✨
          </span>
          <span className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D6B56D] to-transparent" />
          <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
        </div>

        {/* Signoff */}
        <div className="text-right w-full pt-3 border-t border-[#D6B56D]/20">
          <span className="text-xs text-[#FFF8E7]/60 block font-serif">Always your friend,</span>
          <span className="font-handwriting text-2xl text-[#D6B56D] font-bold block">
            {config.senderName}
          </span>
        </div>
      </motion.div>

      {/* Action: Replay the Surprise with Golden Pulse */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, ease: luxuryEase }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4"
      >
        <button
          onClick={handleReplayClick}
          className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-base font-bold text-[#101827] gold-gradient-btn shadow-xl shadow-[#D6B56D]/30 hover:scale-105 active:scale-95 transition-all font-luxury cursor-pointer"
        >
          <RotateCcw className="w-5 h-5 group-hover:-rotate-90 transition-transform duration-300" />
          <span>{config.scene7?.replayButton || config.scene6?.replayButton || "Replay the Surprise 🔄"}</span>
        </button>
      </motion.div>
    </div>
  );
}
