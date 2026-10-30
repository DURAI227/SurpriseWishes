import confetti from 'canvas-confetti';

// Palette of luxury Champagne Gold (#D6B56D), Warm Cream (#FFF8E7), Deep Midnight, and Sparkling Ivory
const LUXURY_GOLD_PALETTE = ['#D6B56D', '#FFF8E7', '#F5E6CA', '#B8934A', '#E8D5A3', '#FFFFFF', '#1E2D4A'];
const GOLDEN_STARS_PALETTE = ['#D6B56D', '#FFF8E7', '#F3E8C8', '#B8934A', '#FFFFFF'];

/**
 * Standard celebratory confetti burst
 */
export const triggerConfetti = (origin = { x: 0.5, y: 0.6 }) => {
  confetti({
    particleCount: 85,
    spread: 75,
    origin,
    colors: LUXURY_GOLD_PALETTE,
    shapes: ['circle', 'square'],
    scalar: 1.15,
    ticks: 220,
    gravity: 0.85,
    disableForReducedMotion: true,
  });
};

/**
 * Star sparkle confetti shower - delicate, tasteful amount
 */
export const triggerStarConfetti = (origin = { x: 0.5, y: 0.5 }) => {
  confetti({
    particleCount: 16,
    spread: 60,
    origin,
    colors: GOLDEN_STARS_PALETTE,
    shapes: ['star'],
    scalar: 0.85,
    ticks: 160,
    gravity: 0.75,
  });
};

/**
 * Multi-cannon burst for grand moments (Scene 2, Cake blowout, Final celebration)
 */
export const triggerCannons = () => {
  const count = 75;
  const defaults = {
    origin: { y: 0.7 },
    colors: LUXURY_GOLD_PALETTE,
    shapes: ['circle', 'square'],
    ticks: 180,
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 28,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 1.15,
  });
  fire(0.1, {
    spread: 125,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.25,
  });
  fire(0.1, {
    spread: 125,
    startVelocity: 45,
  });
};

/**
 * Fireworks animation loop in Champagne Gold and Midnight Starlight
 */
export const triggerFireworks = (durationMs = 4500) => {
  const animationEnd = Date.now() + durationMs;
  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = Math.max(8, 22 * (timeLeft / durationMs));

    confetti({
      particleCount,
      angle: 60,
      spread: 50,
      origin: { x: 0.05, y: 0.7 },
      colors: LUXURY_GOLD_PALETTE,
      shapes: ['circle', 'square'],
      scalar: 0.85,
    });
    confetti({
      particleCount,
      angle: 120,
      spread: 50,
      origin: { x: 0.95, y: 0.7 },
      colors: LUXURY_GOLD_PALETTE,
      shapes: ['circle', 'square'],
      scalar: 0.85,
    });
  }, 500);
};
