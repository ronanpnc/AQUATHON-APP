'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className='min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 text-white pt-6'>
      <div className='container mx-auto px-4 py-12'>
        <header className='text-center mb-12'>
          <h1 className='text-5xl font-bold mb-4'>Welcome to Aquathon</h1>
          <p className='text-xl'>Dive into the world of competitive swimming</p>
        </header>

        <div className='grid md:grid-cols-2 gap-8 items-center'>
          <div className='space-y-6'>
            <h2 className='text-3xl font-semibold'>Upcoming Events</h2>
            <ul className='space-y-4'>
              {['Summer Splash', 'Ocean Challenge', 'Lake Marathon'].map((event, index) => (
                <li key={index} className='bg-blue-500 bg-opacity-50 p-4 rounded-lg hover:bg-opacity-70 transition'>
                  {event}
                </li>
              ))}
            </ul>
            <button
              onClick={() => router.push('/races')}
              className='bg-white text-blue-600 font-semibold py-3 px-8 rounded-full 
                         hover:bg-blue-100 transition duration-300 ease-in-out 
                         transform hover:scale-105 shadow-lg'
            >
              View All Races
            </button>
          </div>
        </div>

        <section className='mt-16 text-center'>
          <h2 className='text-3xl font-semibold mb-6'>Why Choose Aquathon?</h2>
          <div className='grid md:grid-cols-3 gap-8'>
            {[
              { title: 'Professional Timing', description: 'State-of-the-art timing systems for accurate results' },
              { title: 'Beautiful Venues', description: 'Compete in stunning locations around the world' },
              { title: 'Community', description: 'Join a global network of swimming enthusiasts' },
            ].map((feature, index) => (
              <div key={index} className='bg-blue-500 bg-opacity-50 p-6 rounded-lg hover:bg-opacity-70 transition'>
                <h3 className='text-xl font-semibold mb-2'>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
