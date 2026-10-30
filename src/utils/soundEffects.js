/**
 * Web Audio API Sound Synthesizer & Effects
 * Provides reliable, zero-asset sound effects and music synthesizer.
 */

class SoundController {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.synthInterval = null;
  }

  getAudioContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play a balloon pop sound (burst of noise + low sine pop)
  playPop() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;

      // Pitch-dropped sine pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.12);

      gain.gain.setValueAtTime(0.5, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.13);

      // Noise burst for the pop snap
      const bufferSize = ctx.sampleRate * 0.05;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 1000;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start(t);
    } catch {
      // Audio context might be restricted
    }
  }

  // Play a magical crystalline chime sequence
  playChime() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.07);

        gain.gain.setValueAtTime(0, t + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.2, t + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.07 + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t + idx * 0.07);
        osc.stop(t + idx * 0.07 + 0.85);
      });
    } catch {
      // Ignore audio failure
    }
  }

  // Play a gentle blowing out sound (soft breath / white noise filter)
  playBlow() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;

      const bufferSize = ctx.sampleRate * 0.6;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.7;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, t);
      filter.frequency.exponentialRampToValueAtTime(300, t + 0.55);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.35, t + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.58);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(t);
    } catch {
      // Ignore audio failure
    }
  }

  // Play typewriter key click
  playTypewriter() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(600 + Math.random() * 200, t);

      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.035);
    } catch {
      // Ignore
    }
  }

  // Play unlocking melody
  playUnlock() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + idx * 0.09);

        gain.gain.setValueAtTime(0, t + idx * 0.09);
        gain.gain.linearRampToValueAtTime(0.25, t + idx * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.09 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t + idx * 0.09);
        osc.stop(t + idx * 0.09 + 0.65);
      });
    } catch {
      // Ignore
    }
  }

  // Play celebratory firework/fanfare sparkle
  playFanfare() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;
      // Happy birthday melody segment (G4, G4, A4, G4, C5, B4)
      const melody = [
        { f: 392, d: 0.18, pause: 0.22 },
        { f: 392, d: 0.14, pause: 0.18 },
        { f: 440, d: 0.35, pause: 0.40 },
        { f: 392, d: 0.35, pause: 0.40 },
        { f: 523.25, d: 0.35, pause: 0.40 },
        { f: 493.88, d: 0.6, pause: 0.65 },
      ];

      let accumulated = 0;
      melody.forEach(note => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.f, t + accumulated);

        gain.gain.setValueAtTime(0, t + accumulated);
        gain.gain.linearRampToValueAtTime(0.2, t + accumulated + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, t + accumulated + note.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t + accumulated);
        osc.stop(t + accumulated + note.d + 0.05);

        accumulated += note.pause;
      });
    } catch {
      // Ignore
    }
  }

  // Synthesized celestial music generator (dreamy music box arpeggios)
  startCelestialMusic() {
    if (this.synthInterval) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
      let step = 0;

      this.synthInterval = setInterval(() => {
        if (this.isMuted) return;
        try {
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          // Pick harmonic notes
          const noteIndex = [0, 2, 4, 7, 5, 4, 2, 0][step % 8];
          const freq = scale[noteIndex];

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.07, now + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 1.25);

          step++;
        } catch {
          // Ignore loop errors
        }
      }, 550);
    } catch {
      // Ignore
    }
  }

  stopCelestialMusic() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }
}

export const sounds = new SoundController();
