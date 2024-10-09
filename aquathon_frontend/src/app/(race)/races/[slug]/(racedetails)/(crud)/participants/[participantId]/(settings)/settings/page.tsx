'use client';

import { Edit } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { DeleteParticipantButton } from '@/components/participant/DeleteParticipantButton';
import { Button } from '@/components/ui/button';

import { useRace } from '@/services/race.services';

export default function RaceSettingsPage({ params }: { params: { slug: string, participantId: string} }) {
  const { data: race, isLoading, error } = useRace(params.slug);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!race) return <div>Race not found</div>;

  return (
    <div className='max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold mb-4'>Race Settings</h1>
      <div className='mb-6'>
        <p className='mb-2'>
          <strong>Title:</strong> {race.title}
        </p>
        <p className='mb-2'>
          <strong>Date:</strong> {new Date(race.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Status:</strong> {race.status}
        </p>
      </div>
      <div className='flex justify-between'>
        <Link href={`/races/${params.slug}/settings/edit`} passHref>
          <Button variant='outline'>
            <Edit className='mr-2 h-4 w-4' />
            Edit Race
          </Button>
        </Link>
        <DeleteParticipantButton raceId={race._id as string} participantId={params.participantId}/>
      </div>
    </div>
  );
}
