import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Sparkles, KeyRound } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import { triggerCannons, triggerStarConfetti } from '../../utils/confetti';
import { bounceSpring, luxuryEase } from '../../utils/motionVariants';

export default function Scene1Password({ config, onUnlock }) {
  const pinLength = (config.secretPin && config.secretPin.length) || 6;
  const [pin, setPin] = useState(Array(pinLength).fill(''));
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInput = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);
    setError(false);
    sounds.playTypewriter();

    if (value && index < pinLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const completeCode = newPin.join('');
    if (completeCode.length === pinLength) {
      verifyCode(completeCode);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, pinLength);
    if (!pasted) return;

    const newPin = Array(pinLength).fill('');
    for (let i = 0; i < pasted.length; i++) {
      newPin[i] = pasted[i];
    }
    setPin(newPin);
    setError(false);
    sounds.playTypewriter();

    const targetIdx = Math.min(pasted.length, pinLength - 1);
    inputRefs.current[targetIdx]?.focus();

    if (pasted.length === pinLength) {
      verifyCode(pasted);
    }
  };

  const verifyCode = (code) => {
    if (code === config.secretPin) {
      setUnlocked(true);
      sounds.playUnlock();
      triggerCannons();
      triggerStarConfetti();

      setTimeout(() => {
        onUnlock();
      }, 1600);
    } else {
      setError(true);
      sounds.playPop();
      setTimeout(() => {
        setPin(Array(pinLength).fill(''));
        inputRefs.current[0]?.focus();
      }, 750);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 relative z-10">
      {/* Main Glass Card with 3D Depth */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, ease: luxuryEase }}
        className="w-full max-w-lg md:max-w-xl px-5 py-8 sm:px-8 sm:py-10 rounded-3xl glass-panel text-center relative overflow-hidden"
      >
        {/* Gold Accent Top Line with Traveling Light Sweep */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#D6B56D] to-transparent rounded-full shadow-[0_0_15px_#D6B56D]">
          <div className="w-12 h-full bg-white/70 blur-sm animate-light-sweep" />
        </div>

        {/* Lock Animation with Shockwave Expansion on Unlock */}
        <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center">
          {/* Expanding Shockwave Ring on Unlock */}
          {unlocked && (
            <motion.div
              initial={{ scale: 0.8, opacity: 1 }}
              animate={{ scale: 2.8, opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border-2 border-[#D6B56D] pointer-events-none"
            />
          )}

          <motion.div
            animate={
              error
                ? { x: [-14, 14, -10, 10, -5, 5, 0] }
                : unlocked
                ? { scale: [1, 1.25, 1.15], rotate: [0, -12, 12, 0] }
                : { y: [0, -6, 0] }
            }
            transition={{
              duration: error ? 0.45 : unlocked ? 0.6 : 3.5,
              repeat: unlocked || error ? 0 : Infinity,
              ease: 'easeInOut',
            }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#D6B56D] via-[#FFF8E7] to-[#B8934A] p-0.5 shadow-xl shadow-[#D6B56D]/25 flex items-center justify-center"
          >
            <div className="w-full h-full bg-[#101827] rounded-[14px] flex items-center justify-center text-[#D6B56D] relative overflow-hidden">
              {unlocked ? (
                <motion.div
                  initial={{ rotate: -25, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={bounceSpring}
                >
                  <Unlock className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
                </motion.div>
              ) : (
                <Lock className="w-10 h-10 text-[#D6B56D] drop-shadow-[0_0_8px_rgba(214,181,109,0.5)]" />
              )}
            </div>
          </motion.div>
        </div>

        {/* Headings */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#FFF8E7] mb-2 font-serif-title tracking-tight">
          {config.scene1.heading}
        </h1>
        <p className="text-[#FFF8E7]/70 text-sm md:text-base mb-7 max-w-sm mx-auto font-serif leading-relaxed">
          {config.scene1.subtitle}
        </p>

        {/* Interactive PIN Inputs with Spring Reactions & Proper Spacing */}
        <div className="flex justify-center items-center gap-2.5 sm:gap-3.5 md:gap-4 my-7 px-1">
          {pin.map((digit, idx) => (
            <motion.input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInput(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onPaste={handlePaste}
              disabled={unlocked}
              whileFocus={{ scale: 1.05 }}
              animate={digit !== '' ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.2 }}
              className={`w-11 h-14 sm:w-13 sm:h-16 md:w-14 md:h-16 text-center text-xl sm:text-2xl font-bold rounded-2xl border-2 transition-all duration-200 outline-none select-none cursor-pointer shrink-0 ${
                error
                  ? 'border-rose-500 bg-rose-950/40 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                  : unlocked
                  ? 'border-emerald-400 bg-emerald-950/40 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.4)]'
                  : digit !== ''
                  ? 'border-[#D6B56D] bg-[#1E2D4A] text-[#FFF8E7] shadow-[0_0_15px_rgba(214,181,109,0.45)]'
                  : 'border-[#D6B56D]/30 bg-[#172338]/70 text-[#FFF8E7] focus:border-[#D6B56D] focus:ring-4 focus:ring-[#D6B56D]/20'
              }`}
            />
          ))}
        </div>

        {/* Status Messages */}
        <div className="h-7 mb-5 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {error && (
              <motion.span
                key="err"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-xs sm:text-sm font-semibold text-rose-400 flex items-center gap-1.5"
              >
                Incorrect code. Try again! ✨
              </motion.span>
            )}
            {unlocked && (
              <motion.span
                key="succ"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs sm:text-sm font-bold text-emerald-300 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D6B56D]" />
                {config.scene1.unlockSuccessText}
              </motion.span>
            )}
            {!error && !unlocked && (
              <motion.span
                key="def"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs sm:text-sm text-[#FFF8E7]/60 font-serif"
              >
                Enter your secret {pinLength}-digit code to reveal
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Hint toggle */}
        <div className="pt-4 border-t border-[#D6B56D]/20 flex items-center justify-center">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-[#D6B56D]/80 hover:text-[#FFF8E7] font-medium flex items-center gap-1.5 transition-colors focus:outline-none"
          >
            <KeyRound className="w-3.5 h-3.5" />
            {showHint ? 'Hide hint' : 'Need a hint?'}
          </button>
        </div>

        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 text-xs bg-[#172338] text-[#FFF8E7] p-2.5 rounded-xl border border-[#D6B56D]/40"
          >
            {config.pinHint}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
