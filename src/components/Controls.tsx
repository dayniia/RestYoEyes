import React from 'react';

interface ControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isRunning,
  onStart,
  onPause,
  onReset,
  onSkip,
}) => {
  return (
    <div className="flex items-center gap-4 mt-8">
      {/* Reset */}
      <button
        onClick={onReset}
        title="Reset"
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'rgba(124, 58, 237, 0.12)',
          border: '1px solid rgba(124, 58, 237, 0.25)',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontSize: '1rem',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(124, 58, 237, 0.5)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(124, 58, 237, 0.25)';
        }}
      >
        ↺
      </button>

      {/* Main Start/Pause */}
      <button
        onClick={isRunning ? onPause : onStart}
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
          border: 'none',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '1.5rem',
          boxShadow: '0 0 24px rgba(124, 58, 237, 0.45)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.07)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 36px rgba(124, 58, 237, 0.65)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 24px rgba(124, 58, 237, 0.45)';
        }}
      >
        {isRunning ? '⏸' : '▶'}
      </button>

      {/* Skip */}
      <button
        onClick={onSkip}
        title="Skip"
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'rgba(124, 58, 237, 0.12)',
          border: '1px solid rgba(124, 58, 237, 0.25)',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontSize: '1rem',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(124, 58, 237, 0.5)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(124, 58, 237, 0.25)';
        }}
      >
        ⏭
      </button>
    </div>
  );
};
