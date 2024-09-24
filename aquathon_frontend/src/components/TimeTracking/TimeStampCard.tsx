'use client';

import { Trash2 } from 'lucide-react';

import { TrackParticipant } from '@/services/timeTracking.service';
import { formatDuration } from '@/utils/clock';
interface TimeStampCardProps {
  stampTime: Date | null | undefined;
  participant: Partial<TrackParticipant>;
  startTime: Date;
}
const TimeStampCard: React.FC<TimeStampCardProps> = ({ stampTime, startTime, participant }) => {
  return (
    <div className='flex flex-col bg-white rounded-lg shadow-xl mb-4 overflow-hidden w-full relative justify-center '>
      <div className='flex items-center p-4'>
        <span className='text-lg font-bold'>
          {formatDuration(stampTime ? new Date(stampTime).getTime() - new Date(startTime).getTime() : 0)}
        </span>
        <div className='lg:w-1/5 sm:w-30 w-24'>
          <input type='text' placeholder='Assign Bib' className='ml-4 border rounded w-full px-4' />
        </div>
      </div>
      <button className='right-2  absolute'>
        <Trash2 className='text-red-500' />
      </button>
    </div>
  );
};

export default TimeStampCard;
