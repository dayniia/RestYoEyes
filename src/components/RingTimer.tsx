import React from 'react';

interface RingTimerProps {
  progress: number;
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
  const accentColor = isResting ? 'var(--accent-sand)' : 'var(--accent-sage)';

  return (
    <div className="relative flex items-center justify-center" style={{ width: 280, height: 280 }}>
      <svg width="280" height="280" style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
        <circle cx="140" cy="140" r={RADIUS} fill="none" stroke="rgba(232, 226, 217, 0.06)" strokeWidth="8" />
        <circle
          cx="140" cy="140" r={RADIUS}
          fill="none"
          stroke={accentColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="ring-progress"
          style={{ opacity: 0.72 }}
        />
      </svg>

      <div className="flex flex-col items-center justify-center z-10 text-center">
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '3rem',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            lineHeight: 1,
          }}
        >
          {formatTime(secondsLeft)}
        </span>
        <span
          style={{
            marginTop: '0.5rem',
            fontSize: '0.68rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 400,
          }}
        >
          {isResting ? 'rest' : 'focus'}
        </span>
      </div>
    </div>
  );
};
