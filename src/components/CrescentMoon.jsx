import React from 'react';
import { motion } from 'framer-motion';

/**
 * 4K Photorealistic Three-Day Crescent Moon (Hilal)
 * Features seamless radial starlight blending (zero box edges),
 * golden corona stardust glow, and an orbiting celestial morning star.
 */
export default function CrescentMoon({
  size = 140,
  className = '',
  showStar = true,
  glow = true,
}) {
  return (
    <motion.div
      style={{ width: size, height: size }}
      animate={{
        y: [-6, 6, -6],
        scale: [1, 1.025, 1],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
    >
      {/* Outer Golden Corona Glow Layer */}
      {glow && (
        <>
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#E5C07B]/25 via-[#FFF8E7]/15 to-[#D6B56D]/30 blur-2xl pointer-events-none scale-125"
            style={{
              boxShadow: '0 0 60px rgba(229, 192, 123, 0.45), 0 0 100px rgba(214, 181, 109, 0.25)',
            }}
          />
          {/* Subtle Rotating Starlight Halo Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-2 rounded-full border border-dashed border-[#E5C07B]/25 pointer-events-none"
          />
        </>
      )}

      {/* Photorealistic Moon with Seamless Feathered Radial Vignette */}
      <div
        className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center mix-blend-screen"
        style={{
          maskImage: 'radial-gradient(circle at center, black 45%, rgba(0,0,0,0.8) 65%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 45%, rgba(0,0,0,0.8) 65%, transparent 78%)',
        }}
      >
        <img
          src="/crescent_moon_4k.jpg"
          alt="4K Crescent Moon"
          className="w-full h-full object-cover mix-blend-screen filter drop-shadow-[0_0_25px_rgba(245,225,170,0.85)]"
        />
      </div>

      {/* Orbiting Morning Star */}
      {showStar && (
        <motion.div
          animate={{
            x: [0, 8, 0, -8, 0],
            y: [0, -6, 0, 6, 0],
            scale: [0.85, 1.25, 0.85],
            opacity: [0.7, 1, 0.7],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-1 -right-1 text-[#FFF8E7] pointer-events-none drop-shadow-[0_0_12px_#E5C07B]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
}
