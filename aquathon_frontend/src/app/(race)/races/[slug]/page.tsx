import { Suspense } from 'react';

import RaceDetailClient from '@/components/clock/RaceDetailClient';

export default function RaceDetailPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RaceDetailClient raceId={params.slug} />
      </Suspense>
  );
}
