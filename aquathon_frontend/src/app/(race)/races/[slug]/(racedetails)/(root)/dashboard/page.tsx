import { Suspense } from 'react';

import { metadata } from './layout';

//import RaceDetailClient from '@/components/clock/RaceDetailClient';

export default function RaceDetailPage({ params }: { params: { slug: string } }) {
  metadata.title = 'testing';
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='min-h-screen flex flex-col pb-24'>
        <div className='fixed bottom-4 right-4'></div>
      </div>
    </Suspense>
  );
}
