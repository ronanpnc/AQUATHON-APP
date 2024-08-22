import { CalendarClock, User } from 'lucide-react';
import Link from 'next/link';

import { STATUS_COLORS, STATUS_ICONS } from '@/domains/race/constants';
import { Race } from '@/domains/race/interface';

const RaceCard: React.FC<{ race: Race }> = ({ race }) => {
  const [hours] = race.time.split(':');
  const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';

  const StatusIcon = STATUS_ICONS[race.status];

  return (
    <Link href={`/races/${race.id}`} className='block'>
      <div className='flex items-center justify-between p-4 bg-white drop-shadow-xl rounded-lg mb-4 hover:bg-gray-50 transition-colors duration-200'>
        <div className='flex items-center'>
          <div className='mr-4 flex flex-col items-center justify-center'>
            <div className='w-16 h-16 rounded-full border-2 border-gray-200 flex flex-col items-center justify-center'>
              <span className='text-md'>{race.time}</span>
              <span className='text-xs'>{ampm}</span>
            </div>
          </div>
          <div>
            <h3 className='text-lg font-semibold pb-2'>{race.name}</h3>
            <div className='flex items-center text-sm text-gray-500 space-x-4'>
              <div className='flex items-center'>
                <CalendarClock size={16} className='mr-1' />
                {race.date}
              </div>
              <div className='flex items-center'>
                <User size={16} className='mr-1' />
                {race.participants}
              </div>
            </div>
          </div>
        </div>
        <div>
          <StatusIcon
            className={`h-8 w-8 ${STATUS_COLORS[race.status]}`}
            fill={race.status === 'Finished' ? 'currentColor' : 'none'}
          />
        </div>
      </div>
    </Link>
  );
};

export default RaceCard;
