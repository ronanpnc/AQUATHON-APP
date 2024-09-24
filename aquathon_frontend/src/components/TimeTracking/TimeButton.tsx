'use client';

import { RotateCw } from 'lucide-react';

interface TimeButtonProps {
  bibNumber: string;
  participantId: string;
  trackTime: (id: string, bib: number) => void;
  resetTrackTime: (id: string, bib: number) => void;
  stampTime: Date;
  hasBeenTracked: boolean,
  disabled: boolean,
}

const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};
const TimeButton: React.FC<TimeButtonProps> = ({ bibNumber, participantId, trackTime, stampTime, resetTrackTime , hasBeenTracked, disabled}) => {
  const handleClick = () => {
    if (hasBeenTracked) return;
    trackTime(participantId, parseInt(bibNumber));
  };

  const handleRedo = () => {
    resetTrackTime(participantId, parseInt(bibNumber));
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`flex flex-col items-center justify-between p-1 rounded-xl transition-colors h-20 w-full ${
        hasBeenTracked
          ? 'bg-white text-primary-purple border border-primary-purple'
          : 'bg-primary-purple text-white hover:bg-primary-purple/90'
      }`}
    >
      <span className='text-2xl font-bold'>{bibNumber.toString().padStart(3,'0')}</span>
      <div className='flex items-center justify-center h-8'>
        {hasBeenTracked ? (
          <div className='flex items-center'>
            <span className='text-sm mr-2'>{formatTime(new Date(stampTime))}</span>
            <button onClick={() => handleRedo()} className='text-red-500 hover:text-red-600' title='Redo'>
              <RotateCw width={12} height={12} />
            </button>
          </div>
        ) : (
          <span className='text-xs'>Track Time</span>
        )}
      </div>
    </button>
  );
};

export default TimeButton;
