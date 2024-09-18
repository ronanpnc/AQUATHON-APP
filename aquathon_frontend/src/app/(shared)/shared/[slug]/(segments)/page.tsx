'use client';

import { useState } from 'react';

import Container from '@/components/Container';
import SegmentCard from '@/components/TimeTracking/SegmentCard';

import { ISegment } from '@/domains/race/interface';

// Dummy data
const dummySegments: ISegment[] = [
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
  const [segments] = useState<ISegment[]>(dummySegments);

  return (
    <Container>
      {[...segments, ...segments, ...segments, ...segments, ...segments].map((segment, index) => (
        <SegmentCard key={index} segment={segment} />
      ))}
    </Container>
  );
}
