import { CalendarClock, Flag, RefreshCw, Timer, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface RaceCardProps {
  id: string;
  name: string;
  date: string;
  time: string;
  status: 'Finished' | 'Ongoing' | 'Pending';
  participants: number;
}

const RaceCard: React.FC<RaceCardProps> = ({ id, name, date, time, status, participants }) => {
  const statusIcon: Record<typeof status, React.ReactElement> = {
    Finished: <Flag className='h-8 w-8 text-green-500' fill='currentColor' />,
    Ongoing: <RefreshCw className='h-8 w-8 text-orange-500' />,
    Pending: <Timer className='h-8 w-8 text-gray-500' />,
  };

  // Split time into hours
  const [hours] = time.split(':');
  const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';

  return (
    <Link href={`/myrace/${id}`} className='block'>
      <div className='flex items-center justify-between p-4 bg-white drop-shadow-xl rounded-lg mb-4 hover:bg-gray-50 transition-colors duration-200'>
        <div className='flex items-center'>
          <div className='mr-4 flex flex-col items-center justify-center'>
            <div className='w-16 h-16 rounded-full border-2 border-gray-200 flex flex-col items-center justify-center'>
              <span className='text-md'>{time}</span>
              <span className='text-xs'>{ampm}</span>
            </div>
          </div>
          <div>
            <h3 className='text-lg font-semibold pb-2'>{name}</h3>
            <div className='flex items-center text-sm text-gray-500 space-x-4'>
              <div className='flex items-center'>
                <CalendarClock size={16} className='mr-1' />
                {date}
              </div>
              <div className='flex items-center'>
                <User size={16} className='mr-1' />
                {participants}
              </div>
            </div>
          </div>
        </div>
        <div>
          <span className='text-2xl'>{statusIcon[status]}</span>
        </div>
      </div>
    </Link>
  );
};

export default RaceCard;
