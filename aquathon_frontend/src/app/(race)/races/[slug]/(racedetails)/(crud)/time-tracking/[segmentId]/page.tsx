'use client';

import _ from 'lodash';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect, useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { useStore } from 'zustand';

import Container from '@/components/Container';
import { SharedTimeTrackingNav } from '@/components/layouts/SharedTimeTrackingNav';
import { OneStepPanel } from '@/components/TimeTracking/OneStepPanel';
import RaceTimerWithProgress from '@/components/TimeTracking/RaceTimerProgress';
import { TwoStepPanel } from '@/components/TimeTracking/TwoStepPanel';

import { ITimeTrackingSocket } from '@/domains/race/interface';
import { useRace } from '@/services/race.services';
import { RaceRealTimeContext } from '@/services/sockets/race/store';
import { SegmentTrackParticipant, useParticipantTrack } from '@/services/timeTracking.service';
import { queryClient } from '@/utils/providers/ReactQueryProvider';

export default function TrackingPage() {
  const { slug, segmentId } = useParams();
  const race = useRace(slug as string);
  const querySegment = useParticipantTrack(slug as string, segmentId as string);
  const [activeTab, setActiveTab] = useState('1 Step');
  const raceStore = useContext(RaceRealTimeContext);
  const raceSocket = useStore(raceStore!, (state) => state);

  useEffect(() => {
    raceStore?.getState().socketClient.on('poolChanged', (data) => {
      updater(data);
    });

    raceStore?.getState().socketClient.on('stampPoolChanged', (data) => {
      unassignedUpdater(data);
    });

    return () => {
      raceStore?.getState().socketClient.off('poolChanged');
      raceStore?.getState().socketClient.off('stampPoolChanged');
    };
    //eslint-disable-next-line
  }, [raceSocket]);

  const updater = (nextData?: ITimeTrackingSocket) => {
    queryClient.setQueryData(['segments', segmentId], (oldData?: SegmentTrackParticipant | undefined) => {
      const arr = [...(oldData?.participants || [])];
      const unassignedTimearr = [...(oldData?.participants || [])];
      const index = _.findIndex(arr, { _id: nextData?.participantId });

      if (nextData?.status === 'reset') {
        // Create a new array with the updated participant
        const updatedArr = arr.map((item, idx) => (idx === index ? { ...item, stampTime: null } : item));
        return { ...oldData, participants: [...updatedArr] };
      }
      if (index !== -1 && nextData?.stampTime !== undefined) {
        // Create a new array with the updated participant
        const updatedArr = arr.map((item, idx) => (idx === index ? { ...item, stampTime: nextData.stampTime } : item));
        const updatedArrUnassinged  = unassignedTimearr.filter((item) => item.stampId !== nextData.stampId);
        return { ...oldData, participants: [...updatedArr],unassignedTime: [...updatedArrUnassinged]  };
      }
      return oldData; // Return the old array if no update occurs
    });
  };

  const unassignedUpdater = (nextData?: ITimeTrackingSocket) => {
    queryClient.setQueryData(['segments', segmentId], (oldData?: SegmentTrackParticipant | undefined) => {
      const arr = [...(oldData?.unassignedTime || [])];
      if (nextData?.status === 'delete') {
        const updatedArr = arr.filter((item) => item.stampId !== nextData.stampId);
        console.log(updatedArr);
        return { ...oldData, unassignedTime: [...updatedArr] };
      }
      if (nextData?.stampTime !== undefined) {
        // Create a new array with the updated participant
        return {
          ...oldData,
          unassignedTime: [
            ...(oldData?.unassignedTime || []),
            {
              stampTime: nextData.stampTime,
              stampId: nextData._id,
            },
          ],
        };
      }
      return oldData; // Return the old array if no update occurs
    });
  };
  const createUnassinedTime = () => {
    raceSocket.unassignedStamp({
      raceId: slug as string,
      segmentId: segmentId as string,
    });
  };
  const onTrackTime = (participantId: string, bib: number) => {
    raceSocket.trackTime({
      raceId: slug as string,
      segmentId: segmentId as string,
      participantId: participantId,
      bib: bib,
    });
  };

  const assignTime = (bib: number, stampTime: Date, stampId: string) => {
    raceSocket.assignStamp({
      raceId: slug as string,
      segmentId: segmentId as string,
      participantId: querySegment.data?.participants.find((item) => item.bib === bib)?._id,
      stampTime: stampTime,
      stampId: stampId,
      bib: bib,
    });
  };
  const deleteUnassignedTime = (stampId: string) => {
    raceSocket.unassignedStamp({
      stampId: stampId,
      raceId: slug as string,
      segmentId: segmentId as string,
      status: 'delete',
    });
  };

  const onResetTrackTime = (participantId: string, bib: number) => {
    raceSocket.resetTrackTime({
      raceId: slug as string,
      segmentId: segmentId as string,
      participantId: participantId,
      bib: bib,
    });
  };

  if (raceSocket.roomId == null || race.data?.startTime == null) {
    redirect('../time-tracking');
  }
  if (querySegment.isLoading) return null;
  return (
    <section>
      <nav className='flex items-center justify-between sticky top-0 bg-primary-purple text-white border-b p-4 border-gray-300 shadow-md'>
        <div className='flex items-center'>
          <Link href='../time-tracking'>
            <ChevronLeft strokeWidth={3} />
          </Link>
          <h1 className='text-xl font-bold ml-4'>Type</h1>
        </div>
      </nav>
      <div>
        <SharedTimeTrackingNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <Container className='p-4'>
          {activeTab === '1 Step' ? (
            <OneStepPanel
              startTime={race.data.startTime}
              participants={querySegment.data?.participants}
              disabled={raceSocket.roomId == null || raceSocket.roomId == undefined}
              resetTrackTime={onResetTrackTime}
              trackTime={onTrackTime}
            />
          ) : (
            <TwoStepPanel
              twoStepAction={{
                deleteUnassigned: deleteUnassignedTime,
                deleteAssigned: onResetTrackTime,
                assignTime: assignTime,
              }}
              participants={querySegment.data?.participants}
              unassignedStamp={querySegment.data?.unassignedTime}
              startTime={race.data.startTime}
            />
          )}
        </Container>
        <RaceTimerWithProgress
          disable={activeTab === '1 Step'}
          time={new Date(race.data.startTime)}
          completed={
            querySegment.data?.participants.filter((item) => item.stampTime !== null && item.stampTime !== undefined)
              .length as number | 0
          }
          stampTime={createUnassinedTime}
          type={querySegment.data?.segment.type as string}
          participant={race.data.totalParticipants}
        />
      </div>
    </section>
  );
}
