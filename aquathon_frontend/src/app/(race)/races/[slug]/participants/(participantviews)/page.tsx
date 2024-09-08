'use client';

import { AddParticipantButton } from '@/components/participant/AddParticipantButton';
import ParticipantCard from '@/components/participant/ParticipantCard';

import { useParticipantList } from '@/services/participant.services';

export default function MyParticipantPage() {
  const { isLoading, isError, data, error } = useParticipantList();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <div className='p-2'>{data?.map((race) => <ParticipantCard key={race._id} participant={race} />)}</div>
      <div className='fixed bottom-4 right-4'>
        <AddParticipantButton />
      </div>
    </div>
  );
}
