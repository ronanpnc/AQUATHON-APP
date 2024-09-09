'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useContext } from 'react';

import RaceTimer from '@/components/clock/RaceTimer';

import { RaceContext } from '../layout';



export default function MyParticipantPage() {
  const param = useParams()
  const race = useContext(RaceContext)


  return (
    <div>
      <div>
      </div>
    </div>
  );
}


const EmptyDataDisplay = () => {
    return (
        <div className='flex-grow flex items-center justify-center'>
          <div className='flex flex-col items-center'>
            <Image
              src='/assets/icons/ic_cross_race.svg'
              alt='Logo'
              width={250}
              height={250}
              className='cursor-pointer'
            />
            <span className='text-xl font-medium italic mt-4'>"No participant! Create First"</span>
          </div>
        </div>

    );
}
