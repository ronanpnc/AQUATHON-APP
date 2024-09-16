'use client';

import { UseQueryResult } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { createContext } from 'react';

import '@/styles/globals.css';

import { RaceDetailsNav } from '@/components/layouts/RaceDetailsNav';

import { Race } from '@/domains/race/interface';
import { useRace } from '@/services/race.services';


export const RaceContext = createContext<UseQueryResult<Race, Error>>();

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
