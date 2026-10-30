import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Midnight Navy + Champagne Gold Luxury Background
 * - Periodic Shooting Stars (Meteors) with luminous golden trails
 * - Twinkling golden stars and glints with gentle breathing
 * - Drifting champagne gold & ivory petals tumbling in 3D
 * - Fluttering golden butterflies with fluid wing kinematics
 * - Soft celestial navy and gold ambient lighting
 * STRICT COMPLIANCE: ZERO heart shapes/symbols used.
 */
export default function BackgroundElements() {
  const stars = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      x: Math.random() * 94 + 3,
      y: Math.random() * 94 + 3,
      size: Math.random() * 4 + 3,
      duration: Math.random() * 3 + 3,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.35 + 0.15,
    }));
  }, []);

  const shootingStars = useMemo(() => {
    return [
      { id: 'm1', top: '12%', left: '65%', delay: 2, duration: 2.2, repeatDelay: 12 },
      { id: 'm2', top: '24%', left: '35%', delay: 8, duration: 2.0, repeatDelay: 15 },
    ];
  }, []);

  const petals = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 14 + 10,
      duration: Math.random() * 9 + 8,
      delay: Math.random() * 5,
      initialRotation: Math.random() * 360,
    }));
  }, []);

  const butterflies = useMemo(() => {
    return [
      { id: 1, top: '15%', left: '8%', delay: 0, duration: 8, scale: 0.9 },
      { id: 2, top: '62%', left: '86%', delay: 2, duration: 10, scale: 0.8 },
      { id: 3, top: '35%', left: '88%', delay: 4, duration: 9, scale: 0.85 },
      { id: 4, top: '78%', left: '12%', delay: 1.5, duration: 11, scale: 0.75 },
    ];
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Cinematic Ambient Glow Orbs with Gentle Pulsing */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-32 w-96 h-96 bg-[#172554]/45 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.28, 0.15],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/4 -right-32 w-96 h-96 bg-[#D6B56D]/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute -bottom-32 left-1/3 w-96 h-96 bg-[#1e1b4b]/35 rounded-full blur-3xl"
      />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#D6B56D]/12 rounded-full blur-3xl" />

      {/* Golden Shooting Stars (Meteors) */}
      {shootingStars.map((meteor) => (
        <motion.div
          key={meteor.id}
          className="absolute"
          style={{ top: meteor.top, left: meteor.left }}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [-60, -280],
            y: [30, 140],
            scale: [0.3, 1, 0.8, 0],
          }}
          transition={{
            duration: meteor.duration,
            repeat: Infinity,
            delay: meteor.delay,
            repeatDelay: meteor.repeatDelay,
            ease: 'easeOut',
          }}
        >
          <div className="relative w-32 h-0.5 bg-gradient-to-l from-transparent via-[#FFF8E7] to-[#E5C07B] -rotate-[24deg] shadow-[0_0_12px_#E5C07B]">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#FFF8E7]" />
          </div>
        </motion.div>
      ))}

      {/* Twinkling Golden Celestial Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute text-[#D6B56D]"
          style={{
            top: `${star.y}%`,
            left: `${star.x}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            scale: [0.65, 1.25, 0.65],
            opacity: [star.opacity * 0.35, star.opacity, star.opacity * 0.35],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_0_8px_rgba(214,181,109,0.85)]">
            <path d="M12 2L14.4 8.6L21.5 9.2L16.2 13.8L17.8 20.8L12 17.2L6.2 20.8L7.8 13.8L2.5 9.2L9.6 8.6L12 2Z" />
          </svg>
        </motion.div>
      ))}

      {/* Floating Champagne Gold & Ivory Petals with 3D Tumbling */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            width: petal.size,
            height: petal.size * 1.35,
            perspective: 800,
          }}
          initial={{ top: '-10%', opacity: 0 }}
          animate={{
            top: '110%',
            opacity: [0, 0.85, 0.85, 0],
            x: [0, 30, -25, 20, 0],
            rotateZ: [petal.initialRotation, petal.initialRotation + 360],
            rotateX: [0, 180, 360],
            rotateY: [0, 180, 360],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: 'linear',
          }}
        >
          {/* Elegant rose / sakura petal shape (oval drop, strictly NOT a heart) */}
          <div
            className="w-full h-full rounded-[60%_40%_70%_30%/70%_30%_70%_30%] bg-gradient-to-br from-[#FFF8E7]/80 via-[#D6B56D]/65 to-[#B8934A]/45 shadow-sm border border-[#D6B56D]/35"
          />
        </motion.div>
      ))}

      {/* Fluttering Golden Butterflies */}
      {butterflies.map((b) => (
        <motion.div
          key={b.id}
          className="absolute"
          style={{ top: b.top, left: b.left }}
          animate={{
            y: [-14, 14, -14],
            x: [-12, 16, -12],
            rotate: [-10, 10, -10],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: 'easeInOut',
          }}
        >
          <div
            className="animate-butterfly"
            style={{ transform: `scale(${b.scale})` }}
          >
            <svg width="34" height="28" viewBox="0 0 34 28" fill="none" className="drop-shadow-[0_2px_12px_rgba(214,181,109,0.55)]">
              {/* Left wings */}
              <ellipse cx="10" cy="9" rx="8" ry="6" transform="rotate(-25 10 9)" fill="url(#goldWingLeft)" opacity="0.9" />
              <ellipse cx="9" cy="19" rx="6" ry="5" transform="rotate(20 9 19)" fill="url(#goldWingLeft)" opacity="0.8" />
              {/* Right wings */}
              <ellipse cx="24" cy="9" rx="8" ry="6" transform="rotate(25 24 9)" fill="url(#goldWingRight)" opacity="0.9" />
              <ellipse cx="25" cy="19" rx="6" ry="5" transform="rotate(-20 25 19)" fill="url(#goldWingRight)" opacity="0.8" />
              {/* Butterfly body */}
              <line x1="17" y1="6" x2="17" y2="22" stroke="#FFF8E7" strokeWidth="1.8" strokeLinecap="round" />
              {/* Antennae */}
              <path d="M17 6Q14 2 12 3" stroke="#D6B56D" strokeWidth="1" strokeLinecap="round" />
              <path d="M17 6Q20 2 22 3" stroke="#D6B56D" strokeWidth="1" strokeLinecap="round" />
              {/* Wing Gradients */}
              <defs>
                <linearGradient id="goldWingLeft" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFF8E7" />
                  <stop offset="60%" stopColor="#D6B56D" />
                  <stop offset="100%" stopColor="#8C6826" />
                </linearGradient>
                <linearGradient id="goldWingRight" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFF8E7" />
                  <stop offset="60%" stopColor="#D6B56D" />
                  <stop offset="100%" stopColor="#8C6826" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
