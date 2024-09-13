import { Timer, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { formatDuration } from '@/utils/clock';

interface IRaceTimer {
  time: Date | null;
  startTimer: () => void;
  resetTimer: () => void;
}
export default function RaceTimer({ time, startTimer, resetTimer }: IRaceTimer) {
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

  const startRace = () => {
    startTimer();
  };

  const resetRace = () => {
    resetTimer();
  };

  return (
    <div className='fixed bottom-0 left-0 right-0'>
      <div className='relative'>
        <button
          onClick={isRunning ? resetRace : startRace}
          className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center text-white font-semibold text-lg border-4 ${
            isRunning
              ? 'bg-red-500 hover:bg-red-600 border-red-400'
              : 'bg-green-500 hover:bg-green-600 border-green-400'
          }`}
          style={{
            borderColor: isRunning ? 'rgb(248 113 113)' : 'rgb(74 222 128)',
          }}
        >
          {isRunning ? 'Reset' : 'Start'}
        </button>
      </div>
      <div className='bg-primary-purple text-white px-2 py-1 pt-4'>
        <div className='flex justify-between items-center mb-2'>
          <div className='text-md flex items-center'>
            <Timer className='mr-1' size={16} />
            {formatDuration(elapsedTime)}
          </div>
          <div className='text-md flex items-center'>
            <Users className='mr-1' size={16} />
            Participants: 999 {/* Add participant count here */}
          </div>
        </div>
        <div className='text-center text-xs font-semibold'>
          {isRunning ? 'Race in progress' : 'Tap to start the Race'}
        </div>
      </div>
    </div>
  );
}
