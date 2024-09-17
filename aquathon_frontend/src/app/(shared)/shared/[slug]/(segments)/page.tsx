'use client';

import { useState } from 'react';

import Container from '@/components/Container';
import SegmentCard from '@/components/TimeTracking/SegmentCard';

import { ITimeRaceConfig } from '@/domains/race/interface';

// Dummy data
const dummySegments: ITimeRaceConfig[] = [
  {
    type: 'swimming',
    mode: 'active',
    timeTrackId: ['swim1'],
  },
  {
    type: 'biking',
    mode: 'upcoming',
    timeTrackId: ['bike1'],
  },
  {
    type: 'running',
    mode: 'upcoming',
    timeTrackId: ['run1'],
  },
];

export default function TimeTrackerOnlyPage() {
  const [segments] = useState<ITimeRaceConfig[]>(dummySegments);

  return (
    <Container>
      {[...segments, ...segments, ...segments, ...segments, ...segments].map((segment, index) => (
        <SegmentCard key={index} segment={segment} />
      ))}
    </Container>
  );
}
