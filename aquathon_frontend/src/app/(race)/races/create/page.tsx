import { X } from 'lucide-react';
import Link from 'next/link';

import Container from '@/components/Container';
import CreateRaceForm from '@/components/race/CreateRaceForm';

export default function CreateRacePage() {
  return (
    <Container>
      <nav className='w-full bg-primary-purple shadow-md fixed top-0 left-0 right-0 z-10'>
        <div className='flex items-center h-16 px-6 text-xl font-bold'>
          <Link href='/races'>
            <X strokeWidth={3} className='text-white' />
          </Link>
          <span className='ml-4 text-white'>Create New Race</span>
        </div>
      </nav>
      <div className='mt-16'>
        <CreateRaceForm />
      </div>
    </Container>
  );
}
