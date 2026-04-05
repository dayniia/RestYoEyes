import React from 'react';

interface ControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ isRunning, onStart, onPause, onReset, onSkip }) => {
  const secondaryStyle: React.CSSProperties = {
    width: 42,
    height: 42,
    borderRadius: '50%',
    background: 'rgba(232, 226, 217, 0.04)',
    border: '1px solid var(--border-subtle)',
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '1rem',
  };

  const onSecondaryEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.color = 'var(--text-secondary)';
    e.currentTarget.style.borderColor = 'rgba(232, 226, 217, 0.14)';
  };
  const onSecondaryLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.color = 'var(--text-muted)';
    e.currentTarget.style.borderColor = 'var(--border-subtle)';
  };

  return (
    <div className="flex items-center gap-5 mt-8">
      <button onClick={onReset} title="Reset" style={secondaryStyle}
        onMouseEnter={onSecondaryEnter} onMouseLeave={onSecondaryLeave}>
        ↺
      </button>

      <button
        onClick={isRunning ? onPause : onStart}
        style={{
          width: 68,
          height: 68,
          borderRadius: '50%',
          background: 'var(--bg-raised)',
          border: '1px solid rgba(232, 226, 217, 0.1)',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '1.25rem',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.borderColor = 'rgba(232, 226, 217, 0.18)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.borderColor = 'rgba(232, 226, 217, 0.1)';
        }}
      >
        {isRunning ? '⏸' : '▶'}
      </button>

      <button onClick={onSkip} title="Skip" style={secondaryStyle}
        onMouseEnter={onSecondaryEnter} onMouseLeave={onSecondaryLeave}>
        ⏭
      </button>
    </div>
  );
};
