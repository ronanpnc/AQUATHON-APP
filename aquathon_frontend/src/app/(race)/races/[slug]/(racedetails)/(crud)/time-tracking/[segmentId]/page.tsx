'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

import Container from '@/components/Container';
import { SharedTimeTrackingNav } from '@/components/layouts/SharedTimeTrackingNav';
import TimeButton from '@/components/TimeTracking/TimeButton';

import { useParticipantTrack } from '@/services/timeTracking.service';
export default function TrackingPage() {
  const {slug, segmentId} = useParams() ;
  const participants = useParticipantTrack(slug as string, segmentId as string);
  const [activeTab, setActiveTab] = useState('1 Step');

  const onStampTime = (id:string) => {

  };


  if(participants.isLoading) return null;
  return (
    <div>
      <SharedTimeTrackingNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <Container className='p-4'>
        {activeTab === '1 Step' ? (
          <div className='grid grid-cols-4 gap-2'>
            {participants?.data?.map((participant) => (
              <TimeButton key={participant._id} bibNumber={participant.bib.toString()} />
            ))}
          </div>
        ) : (
          <div>Hello</div>
        )}
      </Container>
    </div>
  );
}
