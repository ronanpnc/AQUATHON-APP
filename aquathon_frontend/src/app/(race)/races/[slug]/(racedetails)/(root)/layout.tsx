'use client';

import { useParams } from 'next/navigation';
import { createContext } from 'react';

import '@/styles/globals.css';

import { RaceDetailsNav } from '@/components/layouts/RaceDetailsNav';

import { useRace } from '@/services/race.services';

// note : not sure yet
export const RaceContext = createContext({});
export default function RaceDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const  {slug} = useParams()
  const race = useRace(slug as string);
  return (
    <div>
      <RaceContext.Provider value={race}>
        <RaceDetailsNav raceId={params.slug} title={race.data?.title as string} />
        <main>{children}</main>
      </RaceContext.Provider>
    </div>
  );
}
