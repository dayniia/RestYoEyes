import { useState, useEffect } from 'react';
import { useTimer } from './hooks/useTimer';
import { RingTimer } from './components/RingTimer';
import { Controls } from './components/Controls';
import { StatusBar } from './components/StatusBar';
import { RestOverlay } from './components/RestOverlay';

type NotifPermission = NotificationPermission | 'unsupported';

function App() {
  const timer = useTimer();
  const [notifPermission, setNotifPermission] = useState<NotifPermission>('default');

  useEffect(() => {
    if (!('Notification' in window)) {
      setNotifPermission('unsupported');
    } else {
      setNotifPermission(Notification.permission);
    }
  }, []);

  const handleStart = async () => {
    await timer.start();
    if ('Notification' in window) {
      setNotifPermission(Notification.permission);
    }
  };

  const modeLabel = timer.mode === 'resting' ? 'Rest Your Eyes' : 'Stay Focused';

  return (
    <div
      className="relative flex flex-col h-screen w-screen overflow-hidden"
      style={{ background: 'var(--purple-deepest)' }}
    >
      {/* Background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* Top bar */}
      <StatusBar
        mode={timer.mode}
        sessionCount={timer.sessionCount}
        totalRests={timer.totalRests}
        notificationPermission={notifPermission}
      />

      {/* Main content */}
      <main className="flex flex-1 flex-col items-center justify-center fade-in">
        {/* Mode text */}
        <div className="text-center mb-8">
          <h1
            style={{
              fontSize: '1.7rem',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: timer.mode === 'resting' ? 'var(--green-soft)' : 'var(--text-primary)',
              transition: 'color 0.5s ease',
              marginBottom: '0.3rem',
            }}
          >
            {modeLabel}
          </h1>
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.05em',
            }}
          >
            {timer.mode === 'resting' ? 'Guided Eye Exercise' : 'Next break in'}
          </p>
        </div>

        {/* Ring Timer */}
        <RingTimer
          progress={timer.progress}
          mode={timer.mode}
          secondsLeft={timer.secondsLeft}
        />

        {/* Controls */}
        <Controls
          isRunning={timer.isRunning}
          onStart={handleStart}
          onPause={timer.pause}
          onReset={timer.reset}
          onSkip={timer.skip}
        />

        {/* Tip card */}
        <div
          className="mt-10 mx-auto fade-in"
          style={{
            maxWidth: 340,
            background: 'rgba(30, 24, 64, 0.5)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(124, 58, 237, 0.15)',
            borderRadius: '16px',
            padding: '1rem 1.25rem',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            {timer.mode === 'resting'
              ? `✨ Exercise: ${timer.currentExercise}`
              : '💡 Every 20 min, look 20 feet away for 20 seconds to reduce eye strain.'}
          </p>
        </div>

        {/* Notification denied warning */}
        {notifPermission === 'denied' && (
          <p
            className="mt-4 text-xs text-center"
            style={{ color: '#f87171', opacity: 0.7, maxWidth: 300 }}
          >
            ⚠️ Notifications blocked. Allow them in your browser settings to get reminders.
          </p>
        )}
      </main>

      {/* Rest overlay */}
      <RestOverlay 
        secondsLeft={timer.secondsLeft} 
        mode={timer.mode} 
        currentExercise={timer.currentExercise} 
      />
    </div>
  );
}

export default App;
