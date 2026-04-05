import React from 'react';

interface StatusBarProps {
  mode: 'working' | 'resting';
  totalRests: number;
}


export const StatusBar: React.FC<StatusBarProps> = ({ mode, totalRests }) => {
  const dotColor = mode === 'resting' ? 'var(--accent-sand)' : 'var(--accent-sage)';

  return (
    <div
      className="flex items-center justify-between w-full px-6 py-3"
      style={{
        background: 'rgba(37, 42, 43, 0.7)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ opacity: 0.88 }}>
        <img src="/logo.png" alt="RestYoEyes" style={{ width: 32, height: 32, objectFit: 'contain' }} />
      </div>

      <div className="flex items-center gap-2">
        <span
          className="ambient-breathe"
          style={{ width: 6, height: 6, borderRadius: '50%', background: dotColor, display: 'inline-block' }}
        />
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.06em', fontWeight: 400 }}>
          {mode === 'resting' ? 'resting' : 'focusing'}
        </span>
      </div>

      <div className="flex flex-col items-end">
        <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.04em', fontWeight: 300 }}>
          total rests today
        </span>
        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600, lineHeight: 1.2 }}>
          {totalRests}
        </span>
      </div>
    </div>
  );
};
