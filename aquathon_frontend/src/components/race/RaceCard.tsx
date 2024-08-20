import { CalendarClock, Flag, Play, RefreshCw, User } from 'lucide-react';
import React from 'react';

interface RaceCardProps {
  name: string;
  date: string;
  status: 'Finished' | 'Ongoing' | 'Pending';
  participants: number;
}

const RaceCard: React.FC<RaceCardProps> = ({ name, date, status, participants }) => {
  const statusIcon: Record<typeof status, React.ReactElement> = {
    Finished: <Flag className='h-6 w-6 text-green-500' />,
    Ongoing: <RefreshCw className='h-6 w-6 text-yellow-500' />,
    Pending: <Play className='h-6 w-6 text-gray-500' />,
  };

  return (
    <div className='flex items-center justify-between p-4 bg-white drop-shadow-xl rounded-lg mb-4'>
      <div>
        <h3 className='text-lg font-semibold pb-8'>{name}</h3>
        <div className='flex items-center text-sm text-gray-500'>
          <CalendarClock size={16} className='mr-1' />
          {date}
        </div>
      </div>
      <div className='flex flex-col items-end space-y-2'>
        <div className='flex flex-col items-center'>
          <span className='text-2xl'>{statusIcon[status]}</span>
          <span className='text-sm font-medium'>{status}</span>
        </div>
        <div className='flex items-center text-gray-500 text-sm'>
          <User size={16} className='mr-1' />
          {participants}
        </div>
      </div>
    </div>
  );
};

export default RaceCard;
