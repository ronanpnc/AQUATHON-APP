'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import { AddParticipantButton } from '@/components/participant/AddParticipantButton';
import ParticipantCard from '@/components/participant/ParticipantCard';

import { useParticipantList } from '@/services/participant.services';

export default function MyParticipantPage() {
  const param = useParams()
  const { isLoading, isError, data, error } = useParticipantList(param.slug as string);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className=''>
      <div className='pt-6'>{data?.map((participant) => <ParticipantCard key={participant._id} participant={participant} raceId={param.slug as string}  />)}</div>
      <div>
        {data?.length == 0 ?
            <EmptyDataDisplay/>:

            <div></div>
        }
      </div>
      <div className='fixed bottom-4 right-4'>
        <AddParticipantButton />
      </div>
    </div>
  );
}


const EmptyDataDisplay = () => {
    return (
        <div className='flex items-center justify-center fixed inset-36'>
          <div className='flex flex-col items-center'>
            <Image
              src='/assets/icons/ic_cross_race.svg'
              alt='Logo'
              width={250}
              height={250}
              className='cursor-pointer'
            />
            <span className='text-xl font-medium italic mt-4'>No participant! Create First</span>
          </div>
        </div>

    );
}
