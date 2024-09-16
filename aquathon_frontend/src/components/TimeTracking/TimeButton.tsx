'use client';

import { RotateCw } from 'lucide-react';
import React, { useState } from 'react';

interface TimeButtonProps {
  bibNumber: string;
}

const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

const TimeButton: React.FC<TimeButtonProps> = ({ bibNumber }) => {
  const [isTracked, setIsTracked] = useState(false);
  const [time, setTime] = useState<string | null>(null);

  const handleClick = () => {
    if (!isTracked) {
      const now = new Date();
      setTime(formatTime(now));
      setIsTracked(true);
    }
  };

  const handleRedo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTracked(false);
    setTime(null);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex flex-col items-center justify-between p-4 rounded-xl transition-colors h-24 w-full ${
        isTracked
          ? 'bg-white text-primary-purple border border-primary-purple'
          : 'bg-primary-purple text-white hover:bg-primary-purple/90'
      }`}
    >
      <span className='text-2xl font-bold'>{bibNumber}</span>
      <div className='flex items-center justify-center h-8'>
        {isTracked ? (
          <div className='flex items-center'>
            <span className='text-sm mr-2'>{time}</span>
            <button onClick={handleRedo} className='text-red-500 hover:text-red-600' title='Redo'>
              <RotateCw width={12} height={12} />
            </button>
          </div>
        ) : (
          <span className='text-sm'>Track Time</span>
        )}
      </div>
    </button>
  );
};

export default TimeButton;
