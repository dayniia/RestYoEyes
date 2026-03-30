import React from 'react';

interface StatusBarProps {
  mode: 'working' | 'resting';
  sessionCount: number;
  totalRests: number;
  notificationPermission: NotificationPermission | 'unsupported';
}

export const StatusBar: React.FC<StatusBarProps> = ({ mode, sessionCount, totalRests, notificationPermission }) => {
  const dotColor = mode === 'resting' ? 'var(--green-soft)' : 'var(--purple-glow)';

  return (
    <div
      className="flex items-center justify-between w-full px-6 py-3"
      style={{
        background: 'rgba(30, 24, 64, 0.6)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(124, 58, 237, 0.12)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-lg">👁️</span>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            color: 'var(--purple-light)',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
          }}
        >
          RestYoEyes
        </span>
      </div>

      {/* Center dot + mode */}
      <div className="flex items-center gap-2">
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: dotColor,
            display: 'inline-block',
            boxShadow: `0 0 8px ${dotColor}`,
            animation: 'pulseGlow 2s ease-in-out infinite',
          }}
        />
        <span
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {mode === 'resting' ? 'Resting' : 'Focusing'}
        </span>
      </div>

      {/* Session count + notification badge */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end">
          {sessionCount > 0 && (
            <span
              style={{
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
                opacity: 0.8,
              }}
            >
              Session: {sessionCount}
            </span>
          )}
          <span
            style={{
              fontSize: '0.72rem',
              color: 'var(--purple-light)',
              background: 'rgba(124, 58, 237, 0.1)',
              border: '1px solid rgba(124, 58, 237, 0.2)',
              borderRadius: '999px',
              padding: '1px 10px',
              whiteSpace: 'nowrap',
            }}
          >
            Total Rests: {totalRests}
          </span>
        </div>
        <span
          title={
            notificationPermission === 'granted'
              ? 'Notifications enabled'
              : notificationPermission === 'denied'
              ? 'Notifications blocked — please allow in browser settings'
              : notificationPermission === 'unsupported'
              ? 'Notifications not supported'
              : 'Notifications not yet granted'
          }
          style={{ fontSize: '0.9rem', cursor: 'default' }}
        >
          {notificationPermission === 'granted' ? '🔔' : '🔕'}
        </span>
      </div>
    </div>
  );
};
