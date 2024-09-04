'use client';

import { AddRaceButton } from '@/components/race/AddRaceButton';
import RaceCard from '@/components/race/RaceCard';

import { useRaceList } from '@/services/race.services';

export default function MyRacePage() {
  const { isLoading, isError, data, error } = useRaceList();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <div className='p-2'>{data?.map((race) => <RaceCard key={race._id} race={race} />)}</div>
      <div className='fixed bottom-4 right-4'>
        <AddRaceButton />
      </div>
    </div>
  );
}
