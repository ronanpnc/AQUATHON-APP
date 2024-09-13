import { Suspense } from 'react';

import { AddParticipantButton } from '@/components/participant/AddParticipantButton';


export default function RaceDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='min-h-screen flex flex-col pb-24'>
        <div className='fixed bottom-4 right-4'>
          <AddParticipantButton />
        </div>
      </div>
    </Suspense>
  );
}
