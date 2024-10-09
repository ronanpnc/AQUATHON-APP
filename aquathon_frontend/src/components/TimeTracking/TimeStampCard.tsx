'use client';

import { Trash2 } from 'lucide-react';
import React, { useState } from 'react';

import { TrackParticipant } from '@/services/timeTracking.service';
import { formatDuration } from '@/utils/clock';

import { TwoStepAction } from './TwoStepPanel';
interface TimeStampCardProps extends React.HTMLProps<HTMLDivElement> {
  stamp: Partial<TrackParticipant>;
  startTime: Date;
  twoStepAction: TwoStepAction;
  check: (bib: number) => { state: boolean; msg: string };
}
const TimeStampCard: React.FC<TimeStampCardProps> = ({ startTime, stamp, check, twoStepAction, ...props }) => {
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<{ state: boolean; msg: string }>({ state: false, msg: '' });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value;
    setInput(value);
    const err = check(parseInt(value));
    setError(err);
  };

  const handleAssign = () => {
    if (stamp.stampTime !== null && stamp.stampTime !== undefined) {
      twoStepAction.assignTime(parseInt(input), stamp.stampTime, stamp.stampId as string);
    }
  };
  const handleDelete = () => {
    if (stamp.bib) {
      twoStepAction.deleteAssigned(stamp._id as string, stamp.bib as number);
    } else {
      if (stamp.stampTime !== null && stamp.stampTime !== undefined) {
        twoStepAction.deleteUnassigned(stamp.stampId as string);
      }
    }
  };
  return (
    <div
      key={props.key}
      className='flex flex-col bg-white rounded-lg shadow-xl mb-4 overflow-hidden w-full relative justify-center '
    >
      <div className='flex items-center p-2'>
        <span className='text-lg font-bold w-28 text-gray-400 pl-2'>
          {formatDuration(
            stamp.stampTime ? new Date(stamp.stampTime).getTime() - new Date(startTime).getTime() : 0,
            true,
          )}
        </span>
        {stamp.bib !== null && stamp.bib !== undefined ? (
          <div className='right-4 bg-primary-purple text-white rounded-sm p-2 ml-4'>
            {stamp.bib.toString().padStart(3, '0')}
          </div>
        ) : (
          <div className={`lg:w-1/5 sm:w-30 w-28 relative`}>
            <input
              value={input}
              onChange={handleOnChange}
              type='number'
              placeholder='Assign Bib'
              className={`ml-4 px-2 border rounded w-full sm:text-sm ${error.state ? 'focus:border-red-100 focus:outline-red-500' : ''}`}
            />
          </div>
        )}
      </div>
      {input === '' && (
        <button className='right-4  absolute' onClick={handleDelete}>
          <Trash2 className='text-red-500' />
        </button>
      )}
      {input !== '' && !error.state && (
        <button onClick={handleAssign} className='right-4  absolute bg-primary-purple text-white rounded-sm p-2'>
          OK
        </button>
      )}
    </div>
  );
};

export default TimeStampCard;
