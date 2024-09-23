'use client';

import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { useStore } from 'zustand';

import Container from '@/components/Container';
import { SharedTimeTrackingNav } from '@/components/layouts/SharedTimeTrackingNav';
import TimeButton from '@/components/TimeTracking/TimeButton';

import { RaceRealTimeContext } from '@/services/sockets/race/store';
import { useParticipantTrack } from '@/services/timeTracking.service';
export default function TrackingPage() {
  const { slug, segmentId } = useParams();
  const participants = useParticipantTrack(slug as string, segmentId as string);
  const [activeTab, setActiveTab] = useState('1 Step');
  const raceStore = useContext(RaceRealTimeContext);
  const raceSocket = useStore(raceStore!, (state) => state);

  useEffect(() => {
    raceStore?.getState().socketClient.on('poolChanged', (data) => {
      participants.refetch();
    });
  }, [raceStore, participants]);

  const onTrackTime = (participantId: string, bib: number) => {
    raceSocket.trackTime({
      raceId: slug as string,
      segmentId: segmentId as string,
      participantId: participantId,
      bib: bib,
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

  if (participants.isLoading) return null;
  return (
    <div>
      <SharedTimeTrackingNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <Container className='p-4'>
        {raceSocket.roomId}
        {activeTab === '1 Step' ? (
          <div className='grid grid-cols-4 gap-2'>
            {participants?.data?.map((participant) => (
              <TimeButton
                disabled={false}
                resetTrackTime={onResetTrackTime}
                key={participant._id}
                participantId={participant._id}
                bibNumber={participant.bib.toString()}
                stampTime={participant?.stampTime}
                trackTime={onTrackTime}
                hasBeenTracked={participant.stampTime !== null && participant.stampTime !== undefined}
              />
            ))}
          </div>
        ) : (
          <div>Hello</div>
        )}
      </Container>
    </div>
  );
}
