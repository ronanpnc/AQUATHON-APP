"use client"
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import EditParticipantForm from '@/components/participant/EditParticipantForm';
import { DeleteParticipantButton } from '@/components/participant/DeleteParticipantButton';

export default function ParticipantDetailPage({ params }: { params: { slug: string, participantId:string } }) {
  const router = useRouter();
  return (
    <div className='bg-[#F3F6FB] h-full'>
      <nav className='flex items-center justify-between sticky top-0 bg-[#7E83DE] text-white border-b p-4 border-gray-300 shadow-md mb-4'>
        <div className='flex items-center'>
          <button onClick={() => router.back()}>
            <X />
          </button>
          <h1 className='text-xl font-bold ml-4'>Edit Participant</h1>
        </div>
          <DeleteParticipantButton raceId={params.slug} participantId={params.participantId}/>

      </nav>
      <div>
        <EditParticipantForm raceId="" />
      </div>
    </div>
  );
}
