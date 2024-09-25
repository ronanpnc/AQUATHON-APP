"use client"
import { useParams } from 'next/navigation';
import { Suspense } from 'react';

import { useDashboard } from '@/services/participant.services';



export default function RaceDetailPage() {
  const id = useParams().slug;
  const dashboard = useDashboard(id as string);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='min-h-screen flex flex-col pb-24'>{JSON.stringify(dashboard.data)}</div>
    </Suspense>
  );
}
