import { format } from 'date-fns';
import { Clock, LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { STATUS_COLORS, STATUS_ICONS } from '@/domains/race/constants';
import { Race } from '@/domains/race/interface';
const calculateTotalDistance = (race: Race): number => {
  return (race.swimDistance ?? 0) + (race.runDistance ?? 0);
};

const RaceCard: React.FC<{ race: Race }> = ({ race }) => {
  const { _id, title, date, status } = race;
  const StatusIcon = STATUS_ICONS[status];
  const formattedTime = format(new Date(date), 'hh:mm a');
  const totalDistance = calculateTotalDistance(race);

  return (
    <Link href={`/races/${_id}/`} className='block'>
      <div className='flex items-center bg-white rounded-lg shadow-xl mb-4'>
        <div className='flex-grow p-4'>
          <TimeDisplay time={formattedTime} />
          <RaceDetails title={title} distance={totalDistance.toString()} />
          <ProgressBar progress={0} />
        </div>
        <StatusDisplay status={status} StatusIcon={StatusIcon} />
      </div>
    </Link>
  );
};

const TimeDisplay: React.FC<{ time: string }> = ({ time }) => (
  <span className='text-xs text-gray-500 font-medium'>{time}</span>
);

const RaceDetails: React.FC<{ title: string; distance: string }> = ({ title, distance }) => (
  <div>
    <div className='flex items-center justify-between'>
      <h3 className='text-lg font-bold truncate max-w-[70%]'>{title}</h3>
      <span className='text-sm font-medium text-gray-700 ml-auto mr-4'>{distance} KM</span>
    </div>
    <div className='text-xs text-gray-600 flex items-center space-x-1 mt-1 mb-2'>
      <Clock size={12} />
      <span>00:00:00</span>
    </div>
  </div>
);

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className='relative w-full h-2 bg-gray-200 rounded-full mt-2'>
    <div className='absolute top-0 left-0 h-full bg-blue-500 rounded-full' style={{ width: `${progress}%` }} />
  </div>
);

const StatusDisplay: React.FC<{ status: keyof typeof STATUS_COLORS; StatusIcon: LucideIcon }> = ({
  status,
  StatusIcon,
}) => {
  const colorClass = STATUS_COLORS[status];
  const bgColorClass = colorClass.replace('text-', 'bg-').replace('-500', '-100');

  return (
    <div className='flex flex-col items-center'>
      <div
        className={`flex items-center justify-center w-16 h-16 rounded-full ${bgColorClass}`}
        style={{ minWidth: '4rem', minHeight: '4rem' }}
      >
        <StatusIcon className={`w-8 h- ${colorClass}`} />
      </div>
      <span className={`text-xs mt-1 font-medium ${colorClass}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </div>
  );
};

export default RaceCard;
