import { useEffect, useRef, useState } from 'react';
const TimeDisplay: React.FC = () => {
  const [localTime, setLocalTime] = useState<string | null>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(new URL('./timeWorker.js', import.meta.url));

    workerRef.current.onmessage = (event) => {
      if (event.data.type === 'timeUpdate') {
        const time = new Date(event.data.time);
        setLocalTime(formatLocalTime(time));
      }
    };

    workerRef.current.postMessage({ command: 'start' });

    return () => {
      if (workerRef.current) {
        workerRef.current.postMessage({ command: 'stop' });
        workerRef.current.terminate();
      }
    };
  }, []);

  function formatLocalTime(date: Date): string {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  }

  return <div>{localTime ? <p>Current local time: {localTime}</p> : <p>Loading time...</p>}</div>;
};

export default TimeDisplay;
