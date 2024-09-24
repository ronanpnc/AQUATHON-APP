'use client';

import { Trash2 } from 'lucide-react';

const TimeStampCard: React.FC = () => {
  return (
    <div className='flex flex-col bg-white rounded-lg shadow-xl mb-4 overflow-hidden'>
      <div className='flex items-center p-4'>
        <span className='text-lg font-bold'>00:00:00</span>
        <input type='text' placeholder='Assign Bib' className='ml-4 border rounded' />
        <Trash2 className='text-red-500' />
      </div>
    </div>
  );
};

export default TimeStampCard;
