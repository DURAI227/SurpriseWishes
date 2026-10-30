/**
 * Ultra-Smooth Motion Variants and Spring Physics Presets
 * Inspired by Apple, Stripe, and luxury motion design principles.
 * GPU-accelerated with transforms, opacity, and filters.
 */

// Premium easing curves
export const luxuryEase = [0.16, 1, 0.3, 1]; // Exponential luxury ease out
export const bounceSpring = { type: 'spring', stiffness: 350, damping: 22 };
export const gentleSpring = { type: 'spring', stiffness: 180, damping: 20 };
export const floatSpring = { type: 'spring', stiffness: 100, damping: 15 };

// Directional 3D Page / Scene Transitions
export const sceneVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.94,
    filter: 'blur(8px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.65,
      ease: luxuryEase,
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.94,
    filter: 'blur(8px)',
    transition: {
      duration: 0.45,
      ease: luxuryEase,
    },
  }),
};

// Staggered Container
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

// Elements fading up with spring
export const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: luxuryEase,
    },
  },
};

// Scale in with spring
export const scalePop = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: bounceSpring,
  },
};

// Staggered Word / Letter Kinetic Reveal
export const wordReveal = {
  hidden: { opacity: 0, y: '60%', rotateX: -45, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: '0%',
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: luxuryEase,
    },
  },
};

// Micro-interaction presets
export const hoverScale = {
  scale: 1.05,
  y: -2,
  transition: { type: 'spring', stiffness: 400, damping: 15 },
};

export const tapScale = {
  scale: 0.95,
  y: 1,
  transition: { type: 'spring', stiffness: 500, damping: 20 },
};
