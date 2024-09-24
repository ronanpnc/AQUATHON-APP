'use client';

import { X } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import Container from '@/components/Container';
import { DeleteRaceButton } from '@/components/race/DeleteRaceButton';
import EditRaceForm from '@/components/race/EditRaceForm';

import { useRace } from '@/services/race.services';

export default function EditRacePage() {
  const params = useParams();
  const raceId = params.slug as string;
  const { data: race, isLoading, error } = useRace(raceId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!race) return <div>Race not found</div>;

  return (
    <Container>
      <nav className='w-full bg-primary-purple shadow-md fixed top-0 left-0 right-0 z-10'>
        <div className='flex items-center justify-between h-16 px-6 text-xl font-bold'>
          <div className='flex items-center'>
            <Link href={`/races/${raceId}/`}>
              <X strokeWidth={3} className='text-white' />
            </Link>
            <span className='ml-4 text-white'>Edit Race</span>
          </div>
        </div>
      </nav>
      <div className='mt-16'>
        <EditRaceForm race={race} />
      </div>
    </Container>
  );
}
