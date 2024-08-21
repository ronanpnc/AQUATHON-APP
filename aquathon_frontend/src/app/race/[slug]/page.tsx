import Link from 'next/link';
import React from 'react';

export default function RacePage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>hello</h1>
      <Link href='/myrace' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Back to My Race
      </Link>
    </div>
  );
}
