import React from 'react';

interface RingTimerProps {
  progress: number; // 0 to 1
  mode: 'working' | 'resting';
  secondsLeft: number;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

const RADIUS = 110;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export const RingTimer: React.FC<RingTimerProps> = ({ progress, mode, secondsLeft }) => {
  const offset = CIRCUMFERENCE * (1 - progress);
  const isResting = mode === 'resting';

  return (
    <div className={`relative flex items-center justify-center ${isResting ? 'glow-pulse' : ''}`}
         style={{ width: 280, height: 280 }}>
      {/* Background ring */}
      <svg
        width="280"
        height="280"
        style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}
      >
        {/* Track */}
        <circle
          cx="140"
          cy="140"
          r={RADIUS}
          fill="none"
          stroke="rgba(124, 58, 237, 0.15)"
          strokeWidth="10"
        />
        {/* Progress */}
        <circle
          cx="140"
          cy="140"
          r={RADIUS}
          fill="none"
          stroke={isResting ? '#6ee7b7' : '#9f77f5'}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="ring-progress"
          style={{
            filter: isResting
              ? 'drop-shadow(0 0 8px rgba(110, 231, 183, 0.7))'
              : 'drop-shadow(0 0 6px rgba(159, 119, 245, 0.6))',
          }}
        />
      </svg>

      {/* Center content */}
      <div className="flex flex-col items-center justify-center z-10 text-center">
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '3.2rem',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: isResting ? 'var(--green-soft)' : 'var(--text-primary)',
            lineHeight: 1,
            textShadow: isResting
              ? '0 0 20px rgba(110, 231, 183, 0.5)'
              : '0 0 15px rgba(159, 119, 245, 0.4)',
          }}
        >
          {formatTime(secondsLeft)}
        </span>
        <span
          className="mt-2 uppercase tracking-widest text-xs font-medium"
          style={{
            color: isResting ? 'var(--green-soft)' : 'var(--text-secondary)',
            opacity: 0.8,
          }}
        >
          {isResting ? 'Rest' : 'Focus'}
        </span>
      </div>
    </div>
  );
};
