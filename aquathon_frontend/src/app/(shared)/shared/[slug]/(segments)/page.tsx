'use client';

import { useParams } from 'next/navigation';

import Container from '@/components/Container';
import SegmentCard from '@/components/TimeTracking/SegmentCard';

import { useSegmentList } from '@/services/segment.services';

export default function TimeTrackerOnlyPage() {
  const { slug } = useParams();

  const { data: segments = [], isLoading } = useSegmentList(slug as string);

  if (isLoading) {
    return <div>Loading segments...</div>;
  }

  return (
    <Container>
      {segments.map((segment, index) => (
        <SegmentCard key={index} segment={segment} />
      ))}
    </Container>
  );
}
