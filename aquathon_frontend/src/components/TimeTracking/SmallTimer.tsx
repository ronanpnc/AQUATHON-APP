import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { formatDuration } from '@/utils/clock';

interface IRaceTimer {
  time: Date | null;
}
export default function SmallTimer({ time }: IRaceTimer) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: number;
    if (time !== null) {
      intervalId = window.setInterval(() => {
        setElapsedTime(Date.now() - time.getTime());
      }, 100);
      setIsRunning(true);
    } else {
      setIsRunning(false);
      setElapsedTime(0);
    }
    return () => clearInterval(intervalId);
  }, [time]);

  useEffect(() => {}, []);

  return <span>{formatDuration(elapsedTime)}</span>;
}
