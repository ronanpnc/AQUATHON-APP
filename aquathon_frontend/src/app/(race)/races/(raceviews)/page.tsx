'use client';

import Image from 'next/image';

import { AddParticipantButton } from '@/components/race/AddRaceButton';
import RaceCard from '@/components/race/RaceCard';
import SectionTitle from '@/components/SectionTitle';

import { useRaceList } from '@/services/race.services';

export default function MyRacePage() {
  const { isLoading, isError, data, error } = useRaceList();

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <svg width='86' height='86' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <style>{`.spinner_d9Sa{transform-origin:center}.spinner_qQQY{animation:spinner_ZpfF 9s linear infinite}.spinner_pote{animation:spinner_ZpfF .75s linear infinite}@keyframes spinner_ZpfF{100%{transform:rotate(360deg)}}`}</style>
          <path
            d='M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z'
            fill='primary-purple'
          />
          <rect className='spinner_d9Sa spinner_qQQY' x='11' y='6' rx='1' width='2' height='7' fill='priamary-purple' />
          <rect
            className='spinner_d9Sa spinner_pote'
            x='11'
            y='11'
            rx='1'
            width='2'
            height='9'
            fill='secondary-purple'
          />
        </svg>
      </div>
    );
  }

  if (isError) {
    return <span className='text-xl font-medium text-red-500'>Error: {error.message}</span>;
  }

  return (
    <div className='min-h-screen flex flex-col pb-24'>
      {data?.length ? (
        <div>
          <SectionTitle>Today</SectionTitle>
          <div className='flex-grow'>
            {data.map((race) => (
              <RaceCard key={race._id} race={race} />
            ))}
          </div>
        </div>
      ) : (
        <div className='flex-grow flex items-center justify-center'>
          <div className='flex flex-col items-center'>
            <Image
              src='/assets/icons/ic_cross_race.svg'
              alt='Logo'
              width={250}
              height={250}
              className='cursor-pointer'
            />
            <span className='text-xl font-medium italic mt-4'>"Start By Creating a Race"</span>
          </div>
        </div>
      )}
      <div className='fixed bottom-4 right-4'>
        <AddParticipantButton />
      </div>
    </div>
  );
}
