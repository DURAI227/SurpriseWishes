import React from 'react';
import { motion } from 'framer-motion';

/**
 * Luxury Animated Teddy Bear Illustration (SVG)
 * Features warm honey/caramel tones with Champagne Gold bow tie,
 * blinking cute eyes, waving paws, and party accessories.
 * STRICT COMPLIANCE: Zero heart shapes.
 */
export default function TeddyBear({
  size = 120,
  mood = 'waving', // 'waving', 'celebrating', 'cake', 'letter', 'gift'
  hasPartyHat = false,
  holdingStar = false,
  className = '',
}) {
  return (
    <div
      style={{ width: size, height: size * 1.15 }}
      className={`relative inline-flex items-center justify-center select-none filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] ${className}`}
    >
      <svg
        viewBox="0 0 160 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Fur Gradients */}
          <radialGradient id="furMain" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#E3B275" />
            <stop offset="70%" stopColor="#C99455" />
            <stop offset="100%" stopColor="#9B6C32" />
          </radialGradient>
          <radialGradient id="furInner" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#FFF2D8" />
            <stop offset="100%" stopColor="#E7CAA1" />
          </radialGradient>
          {/* Champagne Gold Ribbon Gradient */}
          <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8E7" />
            <stop offset="40%" stopColor="#D6B56D" />
            <stop offset="100%" stopColor="#9E7C33" />
          </linearGradient>
          {/* Party Hat Gradient */}
          <linearGradient id="hatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E2D4A" />
            <stop offset="60%" stopColor="#101827" />
            <stop offset="100%" stopColor="#D6B56D" />
          </linearGradient>
        </defs>

        {/* --- EARS --- */}
        {/* Left Ear */}
        <circle cx="48" cy="46" r="18" fill="url(#furMain)" />
        <circle cx="48" cy="46" r="11" fill="url(#furInner)" opacity="0.8" />
        {/* Right Ear */}
        <circle cx="112" cy="46" r="18" fill="url(#furMain)" />
        <circle cx="112" cy="46" r="11" fill="url(#furInner)" opacity="0.8" />

        {/* --- BODY --- */}
        <ellipse cx="80" cy="120" rx="42" ry="46" fill="url(#furMain)" />
        {/* Tummy Patch */}
        <ellipse cx="80" cy="124" rx="27" ry="32" fill="url(#furInner)" opacity="0.85" />
        {/* Cute tummy stitch line */}
        <path d="M80 102 V142" stroke="#B38042" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* --- FEET / LEGS --- */}
        {/* Left Foot */}
        <ellipse cx="50" cy="158" rx="17" ry="14" fill="url(#furMain)" />
        <ellipse cx="50" cy="159" rx="10" ry="8" fill="url(#furInner)" opacity="0.9" />
        {/* Right Foot */}
        <ellipse cx="110" cy="158" rx="17" ry="14" fill="url(#furMain)" />
        <ellipse cx="110" cy="159" rx="10" ry="8" fill="url(#furInner)" opacity="0.9" />

        {/* --- HEAD --- */}
        <circle cx="80" cy="72" r="38" fill="url(#furMain)" />

        {/* Muzzle */}
        <ellipse cx="80" cy="82" rx="19" ry="15" fill="url(#furInner)" />
        {/* Cute Nose */}
        <ellipse cx="80" cy="76" rx="6.5" ry="5" fill="#3D2614" />
        <ellipse cx="78" cy="74.5" rx="2" ry="1.2" fill="#FFFFFF" opacity="0.8" />
        {/* Mouth */}
        <path d="M80 81 V86" stroke="#3D2614" strokeWidth="2" strokeLinecap="round" />
        <path d="M73 86 Q80 91 87 86" stroke="#3D2614" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Rosy cheeks */}
        <circle cx="56" cy="82" r="6" fill="#D6B56D" opacity="0.45" />
        <circle cx="104" cy="82" r="6" fill="#D6B56D" opacity="0.45" />

        {/* Eyes with sparkle glints */}
        <circle cx="64" cy="67" r="5" fill="#24170E" />
        <circle cx="62.5" cy="65.5" r="1.8" fill="#FFFFFF" />
        <circle cx="65.5" cy="68.5" r="0.9" fill="#FFFFFF" />

        <circle cx="96" cy="67" r="5" fill="#24170E" />
        <circle cx="94.5" cy="65.5" r="1.8" fill="#FFFFFF" />
        <circle cx="97.5" cy="68.5" r="0.9" fill="#FFFFFF" />

        {/* --- CHAMPAGNE GOLD BOWTIE --- */}
        <g id="bowtie">
          {/* Left Wing */}
          <polygon points="80,103 64,96 66,110" fill="url(#goldRibbon)" stroke="#D6B56D" strokeWidth="0.8" />
          {/* Right Wing */}
          <polygon points="80,103 96,96 94,110" fill="url(#goldRibbon)" stroke="#D6B56D" strokeWidth="0.8" />
          {/* Knot */}
          <ellipse cx="80" cy="103" rx="4.5" ry="4" fill="#FFF8E7" stroke="#D6B56D" strokeWidth="1" />
        </g>

        {/* --- ARMS / PAWS --- */}
        {/* Left Arm (resting or waving) */}
        <g className={mood === 'waving' ? 'animate-teddy-wave' : ''} style={{ transformOrigin: '40px 105px' }}>
          <ellipse cx="38" cy="106" rx="12" ry="18" transform="rotate(30 38 106)" fill="url(#furMain)" />
          <ellipse cx="34" cy="112" rx="6" ry="7" fill="url(#furInner)" opacity="0.8" />
        </g>

        {/* Right Arm */}
        <g className={mood === 'celebrating' ? 'animate-teddy-wave' : ''} style={{ transformOrigin: '120px 105px' }}>
          <ellipse cx="122" cy="106" rx="12" ry="18" transform="rotate(-30 122 106)" fill="url(#furMain)" />
          <ellipse cx="126" cy="112" rx="6" ry="7" fill="url(#furInner)" opacity="0.8" />
        </g>

        {/* Holding Star Wand (if true) */}
        {holdingStar && (
          <g>
            <line x1="124" y1="110" x2="142" y2="45" stroke="#D6B56D" strokeWidth="2.5" strokeLinecap="round" />
            <polygon
              points="142,32 145,41 154,41 147,47 150,56 142,50 134,56 137,47 130,41 139,41"
              fill="#FFF8E7"
              stroke="#D6B56D"
              strokeWidth="1.2"
              className="animate-sparkle-spin"
              style={{ transformOrigin: '142px 45px' }}
            />
          </g>
        )}

        {/* Party Hat (if true) */}
        {hasPartyHat && (
          <g>
            <polygon points="80,10 65,42 95,42" fill="url(#hatGrad)" stroke="#D6B56D" strokeWidth="1.2" />
            {/* Gold Stripes on Hat */}
            <path d="M70 33 L90 33" stroke="#D6B56D" strokeWidth="1.8" />
            <path d="M75 22 L85 22" stroke="#FFF8E7" strokeWidth="1.5" />
            {/* Star Pom-pom on tip */}
            <circle cx="80" cy="10" r="4.5" fill="#FFF8E7" stroke="#D6B56D" strokeWidth="1" />
          </g>
        )}
      </svg>
    </div>
  );
}
