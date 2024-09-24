import { Timer, Users } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { SEGMENT_COLORS } from '@/domains/race/constants';
import { formatDuration } from '@/utils/clock';

interface IRaceTimer {
  time: Date | null;
  completed: number;
  stampTime: () => void;
  participant: number;
  disable: boolean;
  type: string;
}
export default function RaceTimerWithProgress({
  time,
  stampTime,
  participant,
  completed,
  type,
  disable,
}: IRaceTimer) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const id = useParams().id;
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

  const handleClick = () => {
    stampTime();
  };


  return (
    <div className='fixed bottom-0 left-0 right-0'>
      <div className='relative'>
        {!disable ? (
          <button
            onClick={handleClick}
            className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center text-white font-semibold text-lg border-4 ${
              SEGMENT_COLORS[type].bg
            }`}
          >
            Track
          </button>
        ) : null}
      </div>
      <div className='bg-primary-purple text-white px-2 py-1 pt-4'>
        <div className='flex justify-between items-center mb-2'>
          <div className='text-md flex items-center'>
            <Timer className='mr-1' size={16} />
            {formatDuration(elapsedTime)}
          </div>
          <div className='text-md flex items-center'>
            <Users className='mr-1' size={16} />
            {` ${completed?.toString().padStart(2, '0') || 0}/${participant?.toString().padStart(2, '0') || 0}`}
          </div>
        </div>
        <ProgressBar progress={(completed / participant) * 100} type={type} />
      </div>
    </div>
  );
}

const ProgressBar: React.FC<{ progress: number; type: string }> = ({ progress, type }) => (
  <div className='w-full h-4 mx-2 mb-2 bg-gray-200 rounded-full relative'>
    <div
      className={`absolute top-0 left-0 h-full rounded-full ${SEGMENT_COLORS[type].bg}`}
      style={{ width: `${progress}%` }}
    />
  </div>
);
