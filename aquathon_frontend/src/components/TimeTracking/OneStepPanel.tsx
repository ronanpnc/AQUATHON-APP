import React from 'react';

import { TrackParticipant } from '@/services/timeTracking.service';

import TimeButton from './TimeButton';

export const OneStepPanel = ({
  participants,
  startTime,
  ...props
}: Pick<TimeButtonProps, 'disabled' | 'resetTrackTime' | 'trackTime'> & {
  participants: TrackParticipant[] | undefined;
  startTime: Date;
}) => {
  return (
    <div className='grid grid-cols-4 gap-2 w-full'>
      {participants?.map((participant) => (
        <TimeButton
          startTime={startTime}
          disabled={props.disabled}
          resetTrackTime={props.resetTrackTime}
          key={participant._id}
          participantId={participant._id}
          bibNumber={participant.bib.toString()}
          stampTime={participant?.stampTime}
          trackTime={props.trackTime}
          hasBeenTracked={participant.stampTime !== null && participant.stampTime !== undefined}
        />
      ))}
    </div>
  );
};
