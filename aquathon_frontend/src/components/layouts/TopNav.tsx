'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export function TopNav() {
  return (
    <nav className='w-full bg-white shadow-md fixed top-0 left-0 right-0 z-10'>
      <div className='flex items-center h-20 px-6'>
        <Link href='/' passHref>
          <Image
            src='/assets/icons/ic_logo.svg'
            alt='Logo'
            width={180}
            height={50}
            className='cursor-pointer'
          />
        </Link>
      </div>
    </nav>
  );
}