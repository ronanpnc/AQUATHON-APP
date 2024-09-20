'use client';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { DeleteParticipantButton } from '@/components/participant/DeleteParticipantButton';
import EditParticipantForm from '@/components/participant/EditParticipantForm';

export default function ParticipantDetailPage({ params }: { params: { slug: string; participantId: string } }) {
  const router = useRouter();
  return (
    <div className='bg-[#F3F6FB] h-full'>
      <nav className='flex items-center justify-between sticky top-0 bg-primary-purple text-white border-b p-4 border-gray-300 shadow-md mb-4'>
        <div className='flex items-center'>
          <button onClick={() => router.back()}>
            <X />
          </button>
          <h1 className='text-xl font-bold ml-4'>Edit Participant</h1>
        </div>
        <DeleteParticipantButton raceId={params.slug} participantId={params.participantId} />
      </nav>
      <div>
        <EditParticipantForm  />
      </div>
    </div>
  );
}
