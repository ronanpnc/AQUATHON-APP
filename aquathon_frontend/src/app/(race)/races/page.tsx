"use client"
import { useFetchRace as useFetchRaces } from '@/hooks/useFetch';

import RaceCard from '@/components/race/RaceCard';

import { Race, RaceStatus } from '@/domains/race/interface';

export default function MyRace() {
  const {data,loading,error} = useFetchRaces();


  return (
    <div className='p-2'>
      {data?.map((race) => (
        <RaceCard key={race._id} race={race} />
      ))}
    </div>
  );
}
