import React from 'react';
import type { TimerMode } from '../hooks/useTimer';

interface RestOverlayProps {
  secondsLeft: number;
  mode: TimerMode;
  currentExercise: string;
}

const MoonCloudIcon = () => (
  <svg width="100" height="84" viewBox="0 0 100 84" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Crescent moon */}
    <path
      d="M65 10C65 10 54 15 54 24C54 33 65 38 65 38C55 38 46 32 46 24C46 16 55 10 65 10Z"
      stroke="var(--accent-sage)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Stars */}
    <circle cx="76" cy="13" r="1.5" fill="var(--accent-sage)" opacity="0.35" />
    <circle cx="70" cy="5" r="1" fill="var(--accent-sand)" opacity="0.3" />
    <circle cx="80" cy="24" r="1" fill="var(--accent-sage)" opacity="0.25" />
    {/* Cloud */}
    <path
      d="M14 74H72C76.4 74 80 70.4 80 66C80 62.1 77.2 58.8 73.4 58.1C72.6 54.2 69.1 51.4 65 51.4C62.9 51.4 60.9 52.2 59.4 53.5C57.9 51 55.2 49.4 52.1 49.4C47.8 49.4 44.2 52.5 43.5 56.6C42.5 56.1 41.4 55.8 40.2 55.8C36.8 55.8 33.8 58 32.6 61.1C31.6 60.5 30.4 60.2 29.2 60.2C25.1 60.2 21.8 63.5 21.8 67.6C21.8 67.9 21.8 68.1 21.85 68.4C20.1 69.2 18.8 71 18.8 73"
      stroke="var(--accent-sand)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const RestOverlay: React.FC<RestOverlayProps> = ({ secondsLeft, mode, currentExercise }) => {
  if (mode !== 'resting') return null;

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50 fade-in"
      style={{
        background: 'rgba(26, 28, 29, 0.93)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Moon + cloud icon */}
      <div className="ambient-breathe" style={{ marginBottom: '1.75rem' }}>
        <MoonCloudIcon />
      </div>

      {/* Heading */}
      <h2
        style={{
          fontFamily: "'Nunito Sans', sans-serif",
          fontSize: '1.75rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          letterSpacing: '-0.01em',
          marginBottom: '0.5rem',
        }}
      >
        Rest a moment.
      </h2>

      {/* Exercise instruction */}
      <p
        style={{
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          marginBottom: '2.5rem',
          maxWidth: 360,
          textAlign: 'center',
          lineHeight: 1.65,
          fontWeight: 300,
        }}
      >
        {currentExercise}
      </p>

      {/* Countdown */}
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '4.5rem',
          fontWeight: 400,
          color: 'var(--accent-sand)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
        }}
      >
        {secondsLeft}
      </span>

      <p
        style={{
          marginTop: '0.6rem',
          fontSize: '0.68rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: 300,
        }}
      >
        seconds remaining
      </p>
    </div>
  );
};
