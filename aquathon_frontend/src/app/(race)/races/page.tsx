"use client"
import { useFetchRace as useFetchRaces } from '@/hooks/useFetch';

import RaceCard from '@/components/race/RaceCard';


export default function MyRace() {
  const {data} = useFetchRaces();


  return (
    <div className='p-2'>
      {data?.map((race) => (
        <RaceCard key={race._id} race={race} />
      ))}
    </div>
  );
}
