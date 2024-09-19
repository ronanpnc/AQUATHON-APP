'use client';

import { useState } from 'react';

import Container from '@/components/Container';
import { SharedTimeTrackingNav } from '@/components/layouts/SharedTimeTrackingNav';
import TimeButton from '@/components/TimeTracking/TimeButton';

const dummyParticipants = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  bibNumber: (101 + index).toString().padStart(3, '0'),
}));

export default function SharedTrackingPage() {
  const [activeTab, setActiveTab] = useState('1 Step');

  return (
    <div>
      <SharedTimeTrackingNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <Container className='p-4'>
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
    </div>
  );
}
