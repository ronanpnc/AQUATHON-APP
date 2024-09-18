import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { SEGMENT_COLORS, SEGMENT_TYPES } from '@/domains/race/constants';
import { ISegment } from '@/domains/race/interface';

const SegmentCard: React.FC<{ segment: ISegment }> = ({ segment }) => {
  const { type } = segment;
  const completedParticipants = 45;
  const totalParticipants = 89;

  const basePath = window.location.pathname.includes('/shared') ? '/shared' : '/races';
  const { slug, _id } = useParams();

  return (
    <Link href={`${basePath}/${slug}/time-tracking/`} className='block'>
      <div className='flex flex-col bg-white rounded-lg shadow-xl mb-4 overflow-hidden'>
        <CardHeader type={type} />
        <CardBody
          completionPercentage={0}
          completedParticipants={completedParticipants}
          totalParticipants={totalParticipants}
        />
      </div>
    </Link>
  );
};

const CardHeader: React.FC<{ type: ISegment['type'] }> = ({ type }) => (
  <div className='flex items-center p-4 pb-0'>
    <StatusIcon type={type} />
    <h3 className='text-lg font-bold flex-grow'>{SEGMENT_TYPES[type].text}</h3>
    <Image src='/assets/icons/ic_clock.svg' alt='Clock icon' width={24} height={24} />
  </div>
);

const StatusIcon: React.FC<{ type: ISegment['type'] }> = ({ type }) => (
  <div className={clsx('w-12 h-12 rounded-full flex items-center justify-center mr-4', SEGMENT_COLORS[type].bg)}>
    <Image src={SEGMENT_TYPES[type].icon} alt={`${type} icon`} width={32} height={32} />
  </div>
);

const CardBody: React.FC<{
  completionPercentage: number;
  completedParticipants: number;
  totalParticipants: number;
}> = ({ completionPercentage, completedParticipants, totalParticipants }) => (
  <div className='px-4 pb-4'>
    <div className='text-center mb-2 text-sm font-medium'>
      {completedParticipants.toString().padStart(2, '0')}/{totalParticipants}
    </div>
    <ProgressBar progress={completionPercentage} />
  </div>
);

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className='w-full h-2 bg-gray-200 rounded-full'>
    <div className='absolute top-0 left-0 h-full bg-blue-500 rounded-full' style={{ width: `${progress}%` }} />
  </div>
);

export default SegmentCard;
