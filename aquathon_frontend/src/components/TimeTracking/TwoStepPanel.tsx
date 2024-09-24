import React from 'react';

import { TrackParticipant } from '@/services/timeTracking.service';

import TimeStampCard from './TimeStampCard';

export const TwoStepPanel = ({
  participants,
  startTime,
  ...props
}:{
  participants: Partial<TrackParticipant>[] | undefined, startTime: Date
}) => {
  return (
    <div className='block w-full px-5 overflow-y-auto h-60 bg-red-50'>
      {participants?.map((participant) => (
        <TimeStampCard
          startTime={startTime}
          key={participant._id}
          stampTime={participant?.stampTime}
          participant={participant}
        />
      ))}
    </div>
  );
};


