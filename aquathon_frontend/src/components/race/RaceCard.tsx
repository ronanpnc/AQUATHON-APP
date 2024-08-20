import { CalendarClock, User } from 'lucide-react';
import React from 'react';

interface RaceCardProps {
  name: string;
  date: string;
  status: 'Finished' | 'On going' | 'Not Started';
  participants: number;
}

const RaceCard: React.FC<RaceCardProps> = ({ name, date, status, participants }) => {
  const statusIcon: Record<typeof status, string> = {
    Finished: '🏁', // Replace with actual SVG icons if needed
    'On going': '🔄',
    'Not Started': '🏃',
  };

  return (
    <div className='flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-4'>
      <div>
        <h3 className='text-lg font-semibold pb-6'>{name}</h3>
        <div className='flex items-center text-sm text-gray-500'>
          <CalendarClock size={16} className='mr-1' />
          {date}
        </div>
      </div>
      <div className='flex flex-col items-end space-y-2'>
        <div className='flex items-center space-x-2'>
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