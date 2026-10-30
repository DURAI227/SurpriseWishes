import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, ArrowRight, X } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import { triggerConfetti, triggerCannons } from '../../utils/confetti';
import { bounceSpring, luxuryEase } from '../../utils/motionVariants';

export default function Scene3Balloons({ config, onNext }) {
  const [poppedIds, setPoppedIds] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);
  const [poppingId, setPoppingId] = useState(null);

  const balloons = config.scene3.balloons;
  const allPopped = poppedIds.length === balloons.length;

  const handlePop = (balloon, e) => {
    if (poppedIds.includes(balloon.id) || poppingId === balloon.id) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    setPoppingId(balloon.id);
    sounds.playPop();
    triggerConfetti({ x, y });

    // Brief burst frame before marking as popped
    setTimeout(() => {
      const updated = [...poppedIds, balloon.id];
      setPoppedIds(updated);
      setPoppingId(null);
      setActiveMessage(balloon);

      if (updated.length === balloons.length) {
        setTimeout(() => {
          sounds.playFanfare();
          triggerCannons();
        }, 600);
      }
    }, 250);
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 relative z-10 text-center">
      {/* Scene Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: luxuryEase }}
        className="max-w-xl mx-auto mb-6"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#FFF8E7] font-serif-title mb-2">
          {config.scene3.heading}
        </h2>
        <p className="text-[#FFF8E7]/70 text-sm md:text-base font-serif">
          {config.scene3.subheading}
        </p>

        {/* Counter Badge with Animated Progress */}
        <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E2D4A] border border-[#D6B56D]/35 text-[#D6B56D] text-xs font-medium shadow-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{poppedIds.length} of {balloons.length} balloons popped</span>
          <div className="w-16 h-1.5 bg-[#101827] rounded-full overflow-hidden ml-1">
            <motion.div
              className="h-full bg-gradient-to-r from-[#D6B56D] to-[#FFF8E7]"
              initial={{ width: 0 }}
              animate={{ width: `${(poppedIds.length / balloons.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Balloons Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl w-full my-6 px-2">
        {balloons.map((b, index) => {
          const isPopped = poppedIds.includes(b.id);
          const isPopping = poppingId === b.id;
          const delays = [0, 0.4, 0.8, 1.2];

          return (
            <div key={b.id} className="flex flex-col items-center justify-center min-h-[180px]">
              {/* Unpopped Floating Balloon */}
              {!isPopped && (
                <motion.div
                  className="relative"
                  animate={
                    isPopping
                      ? { scale: [1, 1.4, 0], opacity: [1, 1, 0] }
                      : {
                          y: [-12, 12, -12],
                          rotate: [-3.5, 3.5, -3.5],
                        }
                  }
                  transition={
                    isPopping
                      ? { duration: 0.25, ease: 'easeOut' }
                      : {
                          duration: 3.5 + index * 0.4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: delays[index],
                        }
                  }
                >
                  {/* Expanding Shockwave on Burst */}
                  {isPopping && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 1 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 rounded-full border-2 border-white pointer-events-none"
                    />
                  )}

                  <motion.button
                    onClick={(e) => handlePop(b, e)}
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.92 }}
                    className="cursor-pointer relative group focus:outline-none flex flex-col items-center py-2"
                  >
                    {/* Balloon Body */}
                    <div
                      className={`w-24 h-32 sm:w-28 sm:h-36 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-tr ${b.color} relative shadow-2xl transition-all group-hover:shadow-[0_20px_40px_rgba(214,181,109,0.45)] flex items-center justify-center border border-[#D6B56D]/35`}
                      style={{ boxShadow: `0 15px 30px -5px ${b.shadowColor}` }}
                    >
                      {/* Glossy reflection highlight */}
                      <div className="absolute top-4 left-4 w-5 h-8 bg-white/40 rounded-[50%] rotate-[-25deg] blur-[0.5px]" />
                      <div className="text-2xl select-none drop-shadow-md group-hover:scale-115 transition-transform">
                        {b.icon}
                      </div>

                      {/* Balloon knot */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3.5 h-2 rounded-t-sm bg-[#B8934A]" />
                    </div>

                    {/* Balloon string with sinusoidal wave */}
                    <svg width="20" height="42" className="mt-[-2px] overflow-visible">
                      <path
                        d="M 10 0 Q 6 12 10 20 T 10 40"
                        fill="none"
                        stroke="#D6B56D"
                        strokeWidth="1.6"
                        strokeDasharray="2 2"
                        opacity="0.8"
                      />
                    </svg>

                    {/* Pop hint on hover */}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-[#D6B56D] font-luxury uppercase tracking-wider mt-1 bg-[#101827]/80 px-2 py-0.5 rounded-full border border-[#D6B56D]/30">
                      Tap to Pop ✨
                    </span>
                  </motion.button>
                </motion.div>
              )}

              {/* Popped State Placeholder: Glowing Wish Unlocked Pedestal */}
              {isPopped && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={bounceSpring}
                  onClick={() => setActiveMessage(b)}
                  className="p-4 rounded-2xl bg-[#172338]/60 border border-[#D6B56D]/40 flex flex-col items-center justify-center cursor-pointer hover:bg-[#1E2D4A]/80 transition-colors shadow-lg group w-24 sm:w-28 h-32 sm:h-36"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D6B56D] to-[#FFF8E7] flex items-center justify-center text-[#101827] mb-2 shadow-md group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-6 h-6 text-[#101827]" />
                  </div>
                  <span className="text-[11px] font-bold text-[#D6B56D] font-luxury">
                    Wish {b.id}
                  </span>
                  <span className="text-[9px] text-[#FFF8E7]/60 italic font-serif mt-0.5">
                    Tap to view
                  </span>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating Active Wish Message Modal with Spring Entry */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveMessage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={bounceSpring}
              onClick={(e) => e.stopPropagation()}
              className="p-8 rounded-3xl glass-panel-darker max-w-sm w-full text-center relative border border-[#D6B56D]/60 shadow-2xl"
            >
              <button
                onClick={() => setActiveMessage(null)}
                className="absolute top-4 right-4 text-[#FFF8E7]/60 hover:text-[#FFF8E7] p-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-4xl mb-4 select-none">{activeMessage.icon}</div>
              <h3 className="text-lg font-bold text-[#D6B56D] font-luxury uppercase tracking-wider mb-2">
                A Sweet Wish for You
              </h3>
              <p className="text-[#FFF8E7] text-base leading-relaxed font-serif italic mb-6">
                "{activeMessage.message}"
              </p>

              <button
                onClick={() => setActiveMessage(null)}
                className="px-6 py-2 rounded-full gold-gradient-btn text-[#101827] font-bold text-xs uppercase tracking-wider font-luxury shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                Cherish Wish ✨
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All Popped Next Step CTA */}
      <AnimatePresence>
        {allPopped && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={bounceSpring}
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
              <span>{config.scene3.completedButton}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
