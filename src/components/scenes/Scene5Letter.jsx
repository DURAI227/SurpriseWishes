import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, Eye, ArrowRight } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import { triggerStarConfetti } from '../../utils/confetti';
import CrescentMoon from '../CrescentMoon';
import { luxuryEase } from '../../utils/motionVariants';

export default function Scene5Letter({ config, onNext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const fullText = config.scene5.letterText
    .replace(/\[NAME\]/g, config.recipientName)
    .replace(/\[YOUR NAME\]/g, config.senderName);

  const handleOpenLetter = () => {
    setIsOpen(true);
    sounds.playChime();
    triggerStarConfetti();
  };

  useEffect(() => {
    if (!isOpen) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        if (currentIndex % 3 === 0) {
          sounds.playTypewriter();
        }
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(interval);
      }
    }, 22);

    return () => clearInterval(interval);
  }, [isOpen, fullText]);

  const handleSkipTyping = () => {
    setDisplayedText(fullText);
    setIsTypingComplete(true);
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 relative z-10 text-center">
      {/* Headings */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, ease: luxuryEase }}
        className="max-w-xl mx-auto mb-6"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#FFF8E7] font-serif-title mb-2">
          {config.scene5.heading}
        </h2>
        <p className="text-[#FFF8E7]/70 text-sm md:text-base font-serif">
          {config.scene5.subtitle}
        </p>
      </motion.div>

      {/* Interactive Envelope vs Open Letter */}
      <div className="max-w-xl w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Sealed Luxury Envelope Graphic with 3D Depth & Crescent Moon Wax Seal */
            <motion.div
              key="envelope"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: luxuryEase }}
              className="w-full max-w-sm flex flex-col items-center"
            >
              <motion.div
                whileHover={{ scale: 1.04, rotate: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleOpenLetter}
                className="relative w-72 h-48 sm:w-80 sm:h-52 rounded-2xl bg-gradient-to-br from-[#1E2D4A] via-[#172338] to-[#101827] p-1 shadow-2xl border-2 border-[#D6B56D]/60 flex items-center justify-center cursor-pointer group"
              >
                {/* Envelope Flap Graphics */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  <svg className="w-full h-full absolute inset-0" viewBox="0 0 320 208">
                    <polygon points="0,0 320,0 160,115" fill="#172554" opacity="0.85" />
                    <polyline points="0,0 160,115 320,0" stroke="#D6B56D" strokeWidth="2" fill="none" />
                    <line x1="0" y1="208" x2="160" y2="105" stroke="#D6B56D" strokeWidth="1.5" opacity="0.6" />
                    <line x1="320" y1="208" x2="160" y2="105" stroke="#D6B56D" strokeWidth="1.5" opacity="0.6" />
                  </svg>
                </div>

                {/* Golden Wax Seal in Center */}
                <motion.div
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#FFF8E7] via-[#D6B56D] to-[#8C6826] shadow-xl shadow-[#D6B56D]/50 border-2 border-[#FFF8E7] flex items-center justify-center text-[#101827] group-hover:scale-110 transition-transform"
                >
                  <span className="text-2xl drop-shadow-sm select-none">🌙</span>
                </motion.div>

                {/* Shimmer light sweep on hover */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  <div className="w-16 h-full bg-white/20 blur-sm skew-x-12 animate-light-sweep" />
                </div>
              </motion.div>

              {/* Open Button Prompt */}
              <motion.button
                onClick={handleOpenLetter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-7 py-3 rounded-full gold-gradient-btn text-[#101827] font-bold text-sm shadow-xl font-luxury flex items-center gap-2 cursor-pointer transition-transform"
              >
                <Mail className="w-4 h-4 text-[#101827]" />
                <span>{config.scene5.openButton}</span>
              </motion.button>
            </motion.div>
          ) : (
            /* Open Letter View with Smooth Unfolding Parchment */
            <motion.div
              key="letter-open"
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: luxuryEase }}
              className="w-full flex flex-col items-center"
            >
              <div className="w-full p-6 sm:p-10 rounded-3xl glass-panel relative border border-[#D6B56D]/50 shadow-2xl text-left overflow-hidden">
                {/* Header ribbon inside letter */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#D6B56D]/30">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D6B56D]" />
                    <span className="text-xs uppercase tracking-widest text-[#D6B56D] font-luxury font-semibold">
                      A Special Blessing for {config.recipientName}
                    </span>
                  </div>
                  {!isTypingComplete && (
                    <button
                      onClick={handleSkipTyping}
                      className="text-xs text-[#D6B56D] hover:text-[#FFF8E7] bg-[#1E2D4A] px-3 py-1 rounded-lg border border-[#D6B56D]/40 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" /> Read Instantly
                    </button>
                  )}
                </div>

                {/* Typewriter text content */}
                <div className="whitespace-pre-line text-[#FFF8E7] text-sm sm:text-base leading-relaxed sm:leading-loose font-serif min-h-[220px]">
                  {displayedText}
                  {!isTypingComplete && (
                    <span className="inline-block w-2 h-4 ml-1 bg-[#D6B56D] animate-pulse rounded-sm shadow-[0_0_8px_#D6B56D]" />
                  )}
                </div>

                {/* Letter Signature with Crescent Moon */}
                <div className="mt-8 pt-6 border-t border-[#D6B56D]/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CrescentMoon size={50} showStar={false} glow={false} />
                    <div className="text-xs text-[#D6B56D] font-serif italic">
                      Blessed to have you as my friend 🌙
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#FFF8E7]/60 block font-serif">Always your friend,</span>
                    <span className="font-handwriting text-2xl text-[#D6B56D] font-bold block">
                      {config.senderName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Continue to Next Step */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 flex flex-col items-center"
              >
                <button
                  onClick={() => {
                    sounds.playChime();
                    onNext();
                  }}
                  className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-base font-bold text-[#101827] gold-gradient-btn shadow-xl shadow-[#D6B56D]/30 hover:scale-105 active:scale-95 transition-all font-luxury cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-[#101827] animate-spin" style={{ animationDuration: '3s' }} />
                  <span>{config.scene5.continueButton || "Continue to Celebration 🎆"}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
