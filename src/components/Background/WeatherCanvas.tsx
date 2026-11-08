import React, { useEffect, useRef } from 'react';
import { WeatherTheme } from '../../types/weather';

interface WeatherCanvasProps {
  theme: WeatherTheme;
}

interface Particle {
  x: number;
  y: number;
  speedY: number;
  speedX: number;
  size: number;
  opacity: number;
  opacitySpeed?: number;
  phase?: number;
}

export const WeatherCanvas: React.FC<WeatherCanvasProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return;
    }

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    let lightningTimer = 0;
    let lightningActive = 0; // opacity of lightning flash (0 to 1)

    const initParticles = () => {
      particles.length = 0;

      if (theme === 'clear-night') {
        // Twinkling stars
        const count = Math.min(80, Math.floor(width / 15));
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * (height * 0.65), // mostly in upper sky
            speedX: 0,
            speedY: 0,
            size: Math.random() * 1.8 + 0.6,
            opacity: Math.random() * 0.8 + 0.2,
            opacitySpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
          });
        }
      } else if (theme === 'rain' || theme === 'thunderstorm') {
        // Rain streaks
        const count = Math.min(120, Math.floor(width / 7));
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            speedX: -1.5,
            speedY: Math.random() * 12 + 14,
            size: Math.random() * 15 + 10, // length of streak
            opacity: Math.random() * 0.35 + 0.15,
          });
        }
      } else if (theme === 'snow') {
        // Gentle snowflakes
        const count = Math.min(75, Math.floor(width / 12));
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            speedX: Math.random() * 0.6 - 0.3,
            speedY: Math.random() * 1.5 + 0.8,
            size: Math.random() * 2.8 + 1.2,
            opacity: Math.random() * 0.6 + 0.3,
            phase: Math.random() * Math.PI * 2,
          });
        }
      } else if (theme === 'cloudy' || theme === 'partly-cloudy-day' || theme === 'partly-cloudy-night') {
        // Soft drifting clouds
        const count = 5;
        for (let i = 0; i < count; i++) {
          particles.push({
            x: (i / count) * width + Math.random() * 100,
            y: Math.random() * (height * 0.45) + 30,
            speedX: Math.random() * 0.2 + 0.08,
            speedY: 0,
            size: Math.random() * 120 + 80,
            opacity: Math.random() * 0.12 + 0.06,
          });
        }
      } else if (theme === 'fog') {
        // Fog mist bands
        const count = 6;
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: (i / count) * height,
            speedX: Math.random() * 0.3 + 0.1,
            speedY: 0,
            size: Math.random() * 200 + 150,
            opacity: Math.random() * 0.14 + 0.05,
          });
        }
      }
    };

    initParticles();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (theme === 'clear-night') {
        ctx.fillStyle = '#ffffff';
        for (const p of particles) {
          p.opacity += p.opacitySpeed ?? 0.01;
          if (p.opacity > 1) {
            p.opacity = 1;
            p.opacitySpeed = -(p.opacitySpeed ?? 0.01);
          } else if (p.opacity < 0.1) {
            p.opacity = 0.1;
            p.opacitySpeed = Math.abs(p.opacitySpeed ?? 0.01);
          }
          ctx.globalAlpha = p.opacity;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (theme === 'rain' || theme === 'thunderstorm') {
        // Check thunderstorm lightning
        if (theme === 'thunderstorm') {
          lightningTimer++;
          if (lightningTimer > 240 && Math.random() < 0.015) {
            lightningActive = 0.65;
            lightningTimer = 0;
          }
          if (lightningActive > 0) {
            ctx.fillStyle = `rgba(235, 245, 255, ${lightningActive})`;
            ctx.fillRect(0, 0, width, height);
            lightningActive *= 0.82;
            if (lightningActive < 0.02) lightningActive = 0;
          }
        }

        ctx.strokeStyle = 'rgba(215, 235, 255, 0.6)';
        ctx.lineWidth = 1.2;
        for (const p of particles) {
          p.y += p.speedY;
          p.x += p.speedX;
          if (p.y > height) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          ctx.globalAlpha = p.opacity;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.speedX * 2, p.y + p.size);
          ctx.stroke();
        }
      } else if (theme === 'snow') {
        ctx.fillStyle = '#ffffff';
        for (const p of particles) {
          p.phase = (p.phase ?? 0) + 0.02;
          p.x += Math.sin(p.phase) * 0.7 + p.speedX;
          p.y += p.speedY;
          if (p.y > height) {
            p.y = -10;
            p.x = Math.random() * width;
          }
          ctx.globalAlpha = p.opacity;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (theme === 'cloudy' || theme === 'partly-cloudy-day' || theme === 'partly-cloudy-night') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        for (const p of particles) {
          p.x += p.speedX;
          if (p.x - p.size > width) {
            p.x = -p.size * 2;
          }
          ctx.globalAlpha = p.opacity;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.arc(p.x + p.size * 0.5, p.y - p.size * 0.2, p.size * 0.8, 0, Math.PI * 2);
          ctx.arc(p.x - p.size * 0.5, p.y + p.size * 0.1, p.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (theme === 'fog') {
        ctx.fillStyle = 'rgba(230, 240, 250, 0.4)';
        for (const p of particles) {
          p.x += p.speedX;
          if (p.x - p.size > width) {
            p.x = -p.size * 2;
          }
          ctx.globalAlpha = p.opacity;
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.size * 2, p.size * 0.6, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="weather-canvas"
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};
