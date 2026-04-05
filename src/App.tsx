import { useState, useEffect, useRef } from 'react';
import { useTimer } from './hooks/useTimer';
import { RingTimer } from './components/RingTimer';
import { Controls } from './components/Controls';
import { StatusBar } from './components/StatusBar';
import { RestOverlay } from './components/RestOverlay';

type NotifPermission = NotificationPermission | 'unsupported';

function App() {
  const timer = useTimer();
  const [notifPermission, setNotifPermission] = useState<NotifPermission>('default');

  // Keep a ref to the latest action callbacks so the SW listener (registered once) never goes stale
  const timerActionsRef = useRef({ skip: timer.skip, restartRest: timer.restartRest });
  useEffect(() => {
    timerActionsRef.current = { skip: timer.skip, restartRest: timer.restartRest };
  }, [timer.skip, timer.restartRest]);

  // Register service worker once
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
  }, []);

  // Listen for notification action button clicks — registered once, uses ref for fresh callbacks
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    const handler = (event: MessageEvent) => {
      if (event.data?.type !== 'NOTIFICATION_ACTION') return;
      const { action } = event.data;
      if (action === 'skip') timerActionsRef.current.skip();
      if (action === 'start_break') timerActionsRef.current.restartRest();
    };
    navigator.serviceWorker.addEventListener('message', handler);
    return () => navigator.serviceWorker.removeEventListener('message', handler);
  }, []); // only once — ref keeps callbacks fresh

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

  const modeLabel = timer.mode === 'resting' ? 'Rest a moment.' : 'Stay with it.';

  return (
    <div
      className="relative flex flex-col h-screen w-screen overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* Warm mist layers */}
      <div className="mist mist-1" />
      <div className="mist mist-2" />

      <StatusBar
        mode={timer.mode}
        totalRests={timer.totalRests}
      />

      <main className="flex flex-1 flex-col items-center justify-center fade-in">
        <div className="text-center mb-8">
          <h1
            style={{
              fontSize: '1.55rem',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              color: timer.mode === 'resting' ? 'var(--accent-sand)' : 'var(--text-primary)',
              transition: 'color 0.6s ease',
              marginBottom: '0.25rem',
            }}
          >
            {modeLabel}
          </h1>
          <p
            style={{
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.04em',
              fontWeight: 300,
            }}
          >
            {timer.mode === 'resting' ? 'guided eye exercise' : 'next rest in'}
          </p>
        </div>

        <RingTimer progress={timer.progress} mode={timer.mode} secondsLeft={timer.secondsLeft} />

        <Controls
          isRunning={timer.isRunning}
          onStart={handleStart}
          onPause={timer.pause}
          onReset={timer.reset}
          onSkip={timer.skip}
        />

        <div
          className="mt-10 mx-auto"
          style={{
            maxWidth: 320,
            background: 'rgba(37, 42, 43, 0.5)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--border-faint)',
            borderRadius: '14px',
            padding: '0.9rem 1.1rem',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 300 }}>
            {timer.mode === 'resting'
              ? timer.currentExercise
              : 'Every 20 min, look far away for 20 seconds. Small habit, big relief.'}
          </p>
        </div>

        {notifPermission === 'denied' && (
          <p className="mt-4 text-xs text-center" style={{ color: 'var(--text-muted)', opacity: 0.55, maxWidth: 280 }}>
            — Notifications are blocked. Allow them in browser settings to get reminders.
          </p>
        )}
      </main>

      <RestOverlay secondsLeft={timer.secondsLeft} mode={timer.mode} currentExercise={timer.currentExercise} />
    </div>
  );
}

export default App;
