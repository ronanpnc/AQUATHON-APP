'use client';

import { useFetchRace as useFetchRaces } from '@/hooks/useFetch';

import { AddRaceButton } from '@/components/race/AddRaceButton';
import RaceCard from '@/components/race/RaceCard';

export default function MyRacePage() {
  const { data } = useFetchRaces();

  return (
    <div>
      <div className='p-2'>{data?.map((race) => <RaceCard key={race._id} race={race} />)}</div>
      <div className='fixed bottom-4 right-4'>
        <AddRaceButton />
      </div>
    </div>
  );
}
