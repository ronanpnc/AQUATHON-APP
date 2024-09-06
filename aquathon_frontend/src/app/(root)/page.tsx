'use client';

import Image from 'next/image';
import React from 'react';

import { TopNav } from '@/components/layouts/TopNav';
import { AddRaceButton } from '@/components/race/AddRaceButton';

export default function HomePage() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <TopNav />
      <div className='items-center flex-col flex'>
        <Image src='/assets/icons/ic_cross_race.svg' alt='Logo' width={250} height={250} className='cursor-pointer' />
        <span className='text-xl font-medium italic'>“Start By Creating a Race”</span>
      </div>
      <div className='fixed bottom-4 right-4'>
        <AddRaceButton />
      </div>
    </main>
  );
}
