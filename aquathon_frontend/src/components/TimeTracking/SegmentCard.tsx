import clsx from 'clsx';
import Image from 'next/image'; // Added missing import

import { STATUS_COLORS } from '@/domains/race/constants';

interface SegmentCardProps {
  name: string;
  status: keyof typeof STATUS_COLORS;
  completionPercentage: number;
}

const SegmentCard: React.FC<SegmentCardProps> = ({ name, status, completionPercentage }) => {
  return (
    <div className='flex flex-col bg-white rounded-lg shadow-xl mb-4 overflow-hidden'>
      <CardHeader name={name} status={status} />
      <CardBody completionPercentage={completionPercentage} />
    </div>
  );
};

const CardHeader: React.FC<{ name: string; status: keyof typeof STATUS_COLORS }> = ({ name, status }) => (
  <div className='flex items-center p-4'>
    <StatusIcon status={status} />
    <h3 className='text-lg font-bold flex-grow'>{name}</h3>
    <Image src='/assets/icons/ic_clock.svg' alt='Clock icon' width={24} height={24} />
  </div>
);

const StatusIcon: React.FC<{ status: keyof typeof STATUS_COLORS }> = ({ status }) => (
  <div
    className={clsx('w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4', STATUS_COLORS[status])}
  >
    <Image src='/assets/icons/ic_running.svg' alt='Clock icon' width={32} height={32} />
  </div>
);

const CardBody: React.FC<{ completionPercentage: number }> = ({ completionPercentage }) => (
  <div className='px-4 pb-4'>
    <ProgressBar progress={completionPercentage} />
  </div>
);

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className='relative w-full h-2 bg-gray-200 rounded-full'>
    <div className='absolute top-0 left-0 h-full bg-blue-500 rounded-full' style={{ width: `${progress}%` }} />
  </div>
);

export default SegmentCard;
