'use client';

import { useParams } from 'next/navigation';

import '@/styles/globals.css';

import { SharedSegmentNav } from '@/components/layouts/SharedSegmentNav';

import { useRace } from '@/services/race.services';

export default function SharedLayout({ children }: { children: React.ReactNode; params: { slug: string } }) {
  const { slug } = useParams();
  
  const race = useRace(slug as string);

  return (
    <div>
      <SharedSegmentNav title={race.data?.title as string} />
      <main className='pt-16'>{children}</main>
    </div>
  );
}
