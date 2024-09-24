'use client'
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export function AddParticipantButton() {
  const {slug}  = useParams();
  return (
    <div key='add-race-button' className='z-50'>
      <Link
        href={`/races/${slug}/participants/create`}
        className='rounded-full h-16 w-16 flex items-center justify-center bg-[#7E83DE]'
      >
        <Plus className='size-7 text-white' />
      </Link>
    </div>
  );
}
