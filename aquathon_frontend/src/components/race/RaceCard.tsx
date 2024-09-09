import clsx from 'clsx';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { STATUS_COLORS, STATUS_ICONS } from '@/domains/race/constants';
import { Race } from '@/domains/race/interface';

const calculateTotalDistance = (race: Race): number => {
  return (race.swimDistance ?? 0) + (race.runDistance ?? 0);
};

const RaceCard: React.FC<{ race: Race }> = ({ race }) => {
  const { _id, title, date, status } = race;
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
        <StatusDisplay status={status} />
      </div>
    </Link>
  );
};

const TimeDisplay: React.FC<{ time: string }> = ({ time }) => (
  <span className='text-xs text-gray-500 font-medium'>{time}</span>
);

const RaceDetails: React.FC<{ title: string; distance: string }> = ({ title, distance }) => (
  <div>
    <div className='grid grid-cols-4 items-center justify-between'>
      <h3 className='text-lg font-bold truncate col-span-3'>{title}</h3>
      <span className='text-sm font-bold text-gray-700 ml-auto'>{distance} KM</span>
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

const StatusDisplay: React.FC<{ status: keyof typeof STATUS_COLORS }> = ({ status }) => {
  const StatusIcon = STATUS_ICONS[status];
  const { bg: bgColorClass, text: textColorClass } = STATUS_COLORS[status]; 

  return (
    <div className='flex flex-col items-center p-4'>
      <div className={clsx('w-16 h-16 rounded-full flex items-center justify-center mb-1', bgColorClass)}>
        <Image src={StatusIcon.icon} alt={StatusIcon.text} className='w-12 h-12' width={24} height={24} />
      </div>
      <span className={clsx('text-xs font-medium', textColorClass)}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
    </div>
  );
};

export default RaceCard;
