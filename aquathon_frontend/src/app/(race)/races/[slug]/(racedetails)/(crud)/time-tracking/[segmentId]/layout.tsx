import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
export default function TimeTrackingLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <nav className='flex items-center justify-between sticky top-0 bg-primary-purple text-white border-b p-4 border-gray-300 shadow-md'>
        <div className='flex items-center'>
          <Link href='../time-tracking'>
            <ChevronLeft strokeWidth={3} />
          </Link>
          <h1 className='text-xl font-bold ml-4'>Tracking</h1>
        </div>
      </nav>
      {children}
    </section>
  );
}
