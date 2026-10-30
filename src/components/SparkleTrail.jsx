import React, { useEffect, useRef } from 'react';

/**
 * Interactive Stardust & Golden Sparkle Particle Trail
 * GPU-accelerated Canvas with sparkling gold/ivory star particles following cursor/touch.
 * Auto-throttled and completely passive for ultra-high 60+ FPS performance.
 */
export default function SparkleTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle colors: Champagne Gold, Starlight Ivory, Warm Amber
    const colors = ['#E5C07B', '#FFF8E7', '#FDE68A', '#D6B56D', '#B8934A'];

    const createSparkle = (x, y) => {
      if (Math.random() > 0.5) return; // 50% lighter trail
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.2 + 0.2;
      particles.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.2,
        size: Math.random() * 2.0 + 1.0,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.85,
        decay: Math.random() * 0.03 + 0.03,
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.1,
        isStar: Math.random() > 0.6,
      });
    };

    let lastX = null;
    let lastY = null;
    const handlePointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);
      if (clientX == null || clientY == null) return;

      if (lastX !== null && lastY !== null) {
        const dist = Math.hypot(clientX - lastX, clientY - lastY);
        // Only spawn when moving enough
        if (dist > 14) {
          createSparkle(clientX, clientY);
          lastX = clientX;
          lastY = clientY;
        }
      } else {
        lastX = clientX;
        lastY = clientY;
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Draw 4-pointed sparkle star
    const drawStar = (cx, cy, spikes, outerRadius, innerRadius, rotation) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.beginPath();
      let rot = (Math.PI / 2) * 3;
      let x = 0;
      let y = 0;
      const step = Math.PI / spikes;

      for (let i = 0; i < spikes; i++) {
        x = Math.cos(rot) * outerRadius;
        y = Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = Math.cos(rot) * innerRadius;
        y = Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(0, -outerRadius);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.spin;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;

        if (p.isStar) {
          drawStar(p.x, p.y, 4, p.size * 2, p.size * 0.6, p.rotation);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
    />
  );
}
