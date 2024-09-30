import Link from 'next/link';

import { Participant } from '@/domains/participant/interface';

const calculateAge = (dob: string) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const ParticipantCard: React.FC<{ participant: Participant; raceId: string }> = ({ participant }) => {
  const { _id, firstName, lastName, bib, colour, gender, dateOfBirth } = participant;
  const age = calculateAge(dateOfBirth);

  return (
    <Link href={`participants/${_id}/`} className='flex px-5'>
      <div className='w-full h-20 px-5 py-4 bg-white rounded-2xl mb-5 hover:bg-gray-50 transition-colors duration-200'>
        <div className='items-center'>
          <ParticipantInfo
            firstname={firstName}
            lastname={lastName}
            number={bib}
            colour={colour}
            gender={gender}
            age={age}
          />
        </div>
      </div>
    </Link>
  );
};

const ParticipantInfo: React.FC<{
  firstname: string;
  lastname: string;
  number: number;
  gender: string;
  colour: string;
  age: number;
}> = ({ firstname, lastname, number, colour, gender, age }) => {
  const genderDisplay = gender === 'male' ? 'M' : 'F';
  const genderColor = gender === 'male' ? 'bg-blue-400' : 'bg-pink-400';

  return (
    <div className='flex gap-8 items-center'>
      <h1 className='text-lg font-semibold' style={{ color: colour }}>
        {String(number).padStart(3, '0')}
      </h1>
      <div className='grid grid-rows-2 flex-grow space-y-1'>
        <div className='inline-flex space-x-2 text-xl font-semibold'>
          <span>{firstname}</span>
          <span>{lastname}</span>
        </div>
        <div className='flex space-x-4'>
          <h1 className='text-sm'>Age: {age}</h1>
          <div className={`rounded-full w-5 h-5 justify-center items-center flex text-white ${genderColor}`}>
            <h1 className='text-xs font-semibold'>{genderDisplay}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantCard;
