'use client';

import { useParams } from 'next/navigation';

import '@/styles/globals.css';

import { RaceDetailsNav } from '@/components/layouts/RaceDetailsNav';

import { useRace } from '@/services/race.services';

export default function RaceDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const { slug } = useParams();
  const race = useRace(slug as string);
  return (
    <div>
      <RaceDetailsNav raceId={params.slug} title={race.data?.title as string} />
      <main>{children}</main>
    </div>
  );
}
