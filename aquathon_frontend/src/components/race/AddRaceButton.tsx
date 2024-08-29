import { Plus } from 'lucide-react';
import Link from 'next/link';

export function AddRaceButton() {
  return (
    <div key='add-race-button'>
      <Link
        href='/races/create'
        className='rounded-full h-12 w-12 border-2 border-gray-300 flex items-center justify-center shadow-md'
      >
        <Plus className='h-8 w-8' />
      </Link>
    </div>
  );
}
