import React from 'react';
import type { TimerMode } from '../hooks/useTimer';

interface RestOverlayProps {
  secondsLeft: number;
  mode: TimerMode;
  currentExercise: string;
}

export const RestOverlay: React.FC<RestOverlayProps> = ({ secondsLeft, mode, currentExercise }) => {
  if (mode !== 'resting') return null;

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50 fade-in"
      style={{
        background: 'rgba(13, 11, 26, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      {/* Lofi kitten */}
      <div
        style={{
          width: 140,
          height: 140,
          marginBottom: '1.5rem',
          animation: 'pulseGlow 2s ease-in-out infinite',
          filter: 'drop-shadow(0 0 20px rgba(110, 231, 183, 0.45))',
        }}
      >
        <img
          src="/lofi_kitten.png"
          alt="lofi kitten"
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 15px rgba(124, 58, 237, 0.3))'
          }}
        />
      </div>

      {/* Heading */}
      <h2
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '2rem',
          fontWeight: 600,
          color: 'var(--green-soft)',
          letterSpacing: '-0.02em',
          marginBottom: '0.5rem',
          textShadow: '0 0 20px rgba(110, 231, 183, 0.35)',
        }}
      >
        Rest Your Eyes
      </h2>

      {/* Instruction */}
      <p
        style={{
          fontSize: '1.25rem',
          color: 'var(--text-primary)',
          marginBottom: '2rem',
          maxWidth: 400,
          textAlign: 'center',
          lineHeight: 1.5,
          fontWeight: 500,
        }}
      >
        {currentExercise}
      </p>

      {/* Big countdown */}
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '5rem',
          fontWeight: 700,
          color: 'var(--green-soft)',
          lineHeight: 1,
          textShadow: '0 0 30px rgba(110, 231, 183, 0.6)',
          letterSpacing: '-0.04em',
        }}
      >
        {secondsLeft}
      </span>

      <p
        style={{
          marginTop: '0.5rem',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        seconds remaining
      </p>
    </div>
  );
};
