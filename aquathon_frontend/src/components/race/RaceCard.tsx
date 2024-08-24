import { CalendarClock, User } from 'lucide-react';
import Link from 'next/link';

import { STATUS_COLORS, STATUS_ICONS } from '@/domains/race/constants';
import { Race } from '@/domains/race/interface';

const RaceCard: React.FC<{ race: Race }> = ({ race }) => {
  const { id, name, time, date, participants, status } = race;
  const [hours] = time.split(':');
  const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
  const StatusIcon = STATUS_ICONS[status];

  return (
    <Link href={`/races/${id}`} className='block'>
      <div className='flex items-center justify-between p-4 bg-white drop-shadow-xl rounded-lg mb-4 hover:bg-gray-50 transition-colors duration-200'>
        <div className='flex items-center'>
          <TimeDisplay time={time} ampm={ampm} />
          <RaceInfo name={name} date={date} participants={participants} />
        </div>
        <StatusDisplay status={status} StatusIcon={StatusIcon} />
      </div>
    </Link>
  );
};

const TimeDisplay: React.FC<{ time: string; ampm: string }> = ({ time, ampm }) => (
  <div className='mr-4 flex flex-col items-center justify-center'>
    <div className='w-16 h-16 rounded-full border-2 border-gray-200 flex flex-col items-center justify-center'>
      <span className='text-md'>{time}</span>
      <span className='text-xs'>{ampm}</span>
    </div>
  </div>
);

const RaceInfo: React.FC<{ name: string; date: string; participants: number }> = ({ name, date, participants }) => (
  <div>
    <h3 className='text-lg font-semibold pb-2'>{name}</h3>
    <div className='flex items-center text-sm text-gray-500 space-x-4'>
      <InfoItem icon={CalendarClock} text={date} />
      <InfoItem icon={User} text={participants.toString()} />
    </div>
  </div>
);

const InfoItem: React.FC<{ icon: React.ElementType; text: string }> = ({ icon: Icon, text }) => (
  <div className='flex items-center'>
    <Icon size={16} className='mr-1' />
    {text}
  </div>
);

const StatusDisplay: React.FC<{ status: keyof typeof STATUS_COLORS; StatusIcon: React.ElementType }> = ({
  status,
  StatusIcon,
}) => (
  <StatusIcon className={`h-8 w-8 ${STATUS_COLORS[status]}`} fill={status === 'Finished' ? 'currentColor' : 'none'} />
);

export default RaceCard;
