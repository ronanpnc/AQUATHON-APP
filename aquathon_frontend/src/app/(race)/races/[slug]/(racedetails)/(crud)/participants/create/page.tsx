"use client"
import { X } from 'lucide-react';
//import Link from 'next/link';
import { useRouter } from 'next/navigation';

import CreateParticipantForm from '@/components/participant/CreateParticipantForm';

export default function CreateParticipant() {
  const router = useRouter();
  return (
    <div className='bg-[#F3F6FB] h-full'>
      <nav className='flex items-center justify-between sticky top-0 bg-[#7E83DE] text-white border-b p-4 border-gray-300 shadow-md mb-4'>
        <div className='flex items-center'>
          <button onClick={() => router.back()}>
            <X />
          </button>
          <h1 className='text-xl font-bold ml-4'>Create New Participant</h1>
        </div>
      </nav>
      <div>
        <CreateParticipantForm raceId="" />
      </div>
    </div>
  );
}
