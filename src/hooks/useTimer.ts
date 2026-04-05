import { useState, useEffect, useRef, useCallback } from 'react';

/** Send a notification through the registered service worker so we can attach action buttons. */
async function showSwNotification(title: string, body: string, tag: string, actions: { action: string; title: string }[]) {
  if (!('serviceWorker' in navigator)) return;
  const reg = await navigator.serviceWorker.ready;
  reg.active?.postMessage({ type: 'SHOW_NOTIFICATION', title, body, tag, actions });
}

export type TimerMode = 'working' | 'resting';

const WORK_DURATION = 20 * 60; // 20 minutes in seconds
const REST_DURATION = 20;      // 20 seconds

const EYE_EXERCISES = [
  "Look at the top-left corner of the room...",
  "Look at the top-right corner of the room...",
  "Look at the bottom-left corner of the room...",
  "Look at the bottom-right corner of the room...",
  "Close your eyes for 3 seconds...",
  "Blink slowly and deeply...",
  "Look out a window at a distant tree or building...",
  "Trace an imaginary figure-eight with your eyes..."
];

export interface TimerState {
  mode: TimerMode;
  secondsLeft: number;
  isRunning: boolean;
  sessionCount: number;
  totalRests: number;
  currentExercise: string;
  totalDuration: number;
  progress: number; // 0 to 1
  start: () => void;
  pause: () => void;
  reset: () => void;
  skip: () => void;
  restartRest: () => void;
}

export function useTimer(): TimerState {
  const [mode, setMode] = useState<TimerMode>('working');
  const [secondsLeft, setSecondsLeft] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [totalRests, setTotalRests] = useState(() => {
    const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
    const saved = localStorage.getItem('restyoeyes_rests_data');
    if (saved) {
      const { date, count } = JSON.parse(saved);
      if (date === today) return count as number;
    }
    return 0; // new day — start fresh
  });
  const [currentExercise, setCurrentExercise] = useState("");
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalDuration = mode === 'working' ? WORK_DURATION : REST_DURATION;
  const progress = secondsLeft / totalDuration;

  // Persist today's rest count alongside today's date so it resets each day
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem('restyoeyes_rests_data', JSON.stringify({ date: today, count: totalRests }));
  }, [totalRests]);

  const switchToRest = useCallback(() => {
    setMode('resting');
    setSecondsLeft(REST_DURATION);
    setIsRunning(true);

    // Pick a random exercise (different from current if possible)
    const filteredExercises = EYE_EXERCISES.filter(ex => ex !== currentExercise);
    const nextExercise = filteredExercises[Math.floor(Math.random() * filteredExercises.length)];
    setCurrentExercise(nextExercise);

    // Fire notification via service worker (enables action buttons)
    if ('Notification' in window && Notification.permission === 'granted') {
      showSwNotification(
        'Rest a moment.',
        nextExercise,
        'restyoeyes-break',
        [
          { action: 'start_break', title: '✓ Starting break' },
          { action: 'skip', title: 'Skip this one' },
        ]
      );
    }
  }, [currentExercise]);

  const switchToWork = useCallback(() => {
    setMode('working');
    setSecondsLeft(WORK_DURATION);
    setIsRunning(true);
    setSessionCount(prev => prev + 1);
    setTotalRests(prev => prev + 1);
  }, []);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          if (mode === 'working') {
            switchToRest();
          } else {
            switchToWork();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, mode, switchToRest, switchToWork]);

  const start = useCallback(async () => {
    // Request notification permission on first start
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setMode('working');
    setSecondsLeft(WORK_DURATION);
    setSessionCount(0);
  }, []);

  const restartRest = useCallback(() => {
    // Called from notification "Starting break" — resets the 20s countdown
    setSecondsLeft(REST_DURATION);
    setIsRunning(true);
  }, []);

  const skip = useCallback(() => {
    if (mode === 'working') {
      switchToRest();
    } else {
      switchToWork();
    }
  }, [mode, switchToRest, switchToWork]);

  return {
    mode,
    secondsLeft,
    isRunning,
    sessionCount,
    totalRests,
    currentExercise,
    totalDuration,
    progress,
    start,
    pause,
    reset,
    skip,
    restartRest,
  };
}

