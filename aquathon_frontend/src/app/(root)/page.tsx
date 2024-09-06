'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function HomePage() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/races');
  };
  console.log(process.env.NEXT_PUBLIC_API_BASE_URL);

  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white'>
      <button onClick={handleClick}>View Races{process.env.NEXT_PUBLIC_API_BASE_URL}</button>
    </main>
  );
}
