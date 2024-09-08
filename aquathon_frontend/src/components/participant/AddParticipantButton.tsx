import { Plus } from 'lucide-react';
import Link from 'next/link';

export function AddParticipantButton() {
  return (
    <div key='add-race-button'>
      <Link
        href='/participants/create'
        className='rounded-full h-16 w-16 flex items-center justify-center bg-[#7E83DE]'
      >
        <Plus className='size-7 text-white' />
      </Link>
    </div>
  );
}
