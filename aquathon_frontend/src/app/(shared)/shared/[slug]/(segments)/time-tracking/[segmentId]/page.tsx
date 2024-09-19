'use client';

import React from 'react';

import Container from '@/components/Container';
import TimeButton from '@/components/TimeTracking/TimeButton';

const dummyParticipants = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  bibNumber: (101 + index).toString().padStart(3, '0'),
}));

export default function SharedTrackingPage({ activeTab }: { activeTab: string }) {
  return (
    <Container>
      <h1 className='text-2xl font-bold mb-4'>Title Bar</h1>
      {activeTab === '1 Step' ? (
        <div className='grid grid-cols-4 gap-2'>
          {dummyParticipants.map((participant) => (
            <TimeButton key={participant.id} bibNumber={participant.bibNumber} />
          ))}
        </div>
      ) : (
        <div>Hello</div>
      )}
    </Container>
  );
}
