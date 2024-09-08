import { format } from 'date-fns';
import { CalendarClock } from 'lucide-react';
import Link from 'next/link';

import { Participant } from '@/domains/participant/interface';

const ParticipantCard: React.FC<{ participant: Participant }> = ({ participant }) => {
  const { _id, firstname, lastname, bib } = participant;

  return (
    <Link href={`/participants/${_id}/`} className='block'>
      <div className='flex items-center justify-between p-4 bg-white drop-shadow-xl rounded-lg mb-4 hover:bg-gray-50 transition-colors duration-200'>
        <div className='flex items-center'>
          <ParticipantInfo firstname={firstname} lastname={lastname} number={bib}  />
        </div>
      </div>
    </Link>
  );
};

const ParticipantInfo: React.FC<{ firstname: string; lastname:string; number: number }> = ({ firstname, lastname, number }) => (
  <div>
    <h3 className='text-lg font-semibold pb-2'>{firstname}</h3>
    <h3 className='text-lg font-semibold pb-2'>{lastname}</h3>
    <div className='flex items-center text-sm text-gray-500 space-x-4'>
      <InfoItem icon={CalendarClock} number={number} />
    </div>
  </div>
);

const InfoItem: React.FC<{ icon: React.ElementType; number: number }> = ({ icon: Icon, number }) => (
  <div className='flex items-center'>
    <Icon size={16} className='mr-1' />
    {number}
  </div>
);

export default ParticipantCard;
