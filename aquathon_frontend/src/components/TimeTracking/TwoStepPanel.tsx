import _, { extend } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

import { TrackParticipant } from '@/services/timeTracking.service';

import TimeStampCard from './TimeStampCard';

export interface TwoStepAction  {
  assignTime: ( bib: number, stampTime: Date, stampId:string) => void;
  deleteAssigned: (participantId: string, bib: number) => void;
  deleteUnassigned: (stampId: string) => void;
}
export interface TwoStepPanelProps {
  participants: TrackParticipant[] | undefined;
  unassignedStamp: Partial<TrackParticipant>[] | undefined;
  startTime: Date;
  twoStepAction: TwoStepAction;
}
export const TwoStepPanel = ({
  participants,
  startTime,
  unassignedStamp,
  twoStepAction,
}: TwoStepPanelProps) => {
  const [stampsState, setStampsState] = useState<Partial<TrackParticipant>[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (participants === undefined && unassignedStamp === unassignedStamp) return;
    const stampedParticipant = _.filter(
      participants,
      (item: TrackParticipant) => item.stampTime !== null && item.stampTime !== undefined,
    );

    const arr = _.orderBy([...stampedParticipant!, ...unassignedStamp!], (item: TrackParticipant) => item.stampTime, [
      'asc',
    ]);
    setStampsState(arr as Partial<TrackParticipant>[]);
  }, [participants, unassignedStamp]);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [stampsState]);
  const checkForConflict = (bib: number): { state: boolean; msg: string } => {
    if (isNaN(bib)) {
      return {
        state: false,
        msg: '',
      };
    }
    const stamped = participants?.find((item) => item.bib === bib);
    if (stamped === undefined) {
      return {
        state: true,
        msg: 'no existed bib',
      };
    }
    if (stamped.stampTime !== null && stamped.stampTime !== undefined) {
      return {
        state: true,
        msg: 'already existed',
      };
    }
    return {
      state: false,
      msg: '',
    };
  };

  return (
    <div ref={containerRef} className='block w-full px-5 overflow-y-auto h-96 pt-2'>
      {stampsState?.map((item) => (
        <TimeStampCard
          twoStepAction={twoStepAction}
          startTime={startTime}
          key={item._id}
          stamp={item}
          check={checkForConflict}
        />
      ))}
    </div>
  );
};
