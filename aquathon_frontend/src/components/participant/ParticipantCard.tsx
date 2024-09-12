import Link from 'next/link';

import { Participant } from '@/domains/participant/interface';

const ParticipantCard: React.FC<{ participant: Participant , raceId:string}> = ({ participant, raceId }) => {
  const { _id, firstName, lastName, bib ,colour} = participant;

  return (
    <Link href={`participants/${_id}/`} className='block px-5'>
      <div className='flex items-center justify-between p-4 bg-white rounded-lg mb-4 hover:bg-gray-50 transition-colors duration-200'>
        <div className='flex items-center'>
          <ParticipantInfo firstname={firstName} lastname={lastName} number={bib}  colour={colour}/>
        </div>
      </div>
    </Link>
  );
};

const ParticipantInfo: React.FC<{ firstname: string; lastname:string; number: number, colour:string }> = ({ firstname, lastname, number, colour }) => (
  <div className='flex gap-2 items-center'>
    <h1 className='text-lg font-semibold pr-2' style={{color: colour}}>{String(number).padStart(3, '0')}</h1>
    <h3 className='text-lg font-semibold'>{firstname}</h3>
    <h3 className='text-lg font-semibold'>{lastname}</h3>
    {/*
    <div className='flex items-center text-sm text-gray-500 space-x-4'>
      <InfoItem icon={CalendarClock} number={number} />
    </div>
   */}
  </div>
);

const InfoItem: React.FC<{ icon: React.ElementType; number: number }> = ({ icon: Icon, number }) => (
  <div className='flex items-center'>
    <Icon size={16} className='mr-1' />
    {number}
  </div>
);

export default ParticipantCard;
