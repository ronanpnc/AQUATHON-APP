'use client';

import { LayoutDashboard, Timer } from 'lucide-react';
import Head from 'next/head';
import { useState } from 'react';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const tabs = [
    { id: 'TimeTracking', label: 'Time Tracking', Icon: <Timer /> },
    { id: 'Dashboard', label: 'Dashboard', Icon: <LayoutDashboard /> },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <>
      <Head>
        <title>Race 1</title>
      </Head>
      <div className='h-screen flex flex-col'>
        <header className='flex items-center p-4 border-b border-gray-300'>
          <button className='text-2xl'>
            <a href='/races'>←</a>
          </button>
          <h1 className='text-xl font-semibold pl-10'>Race 1</h1>
        </header>

        <div className='border-b border-gray-300 overflow-x-auto scrollbar-hide w-screen'>
          <div className='grid grid-cols-2'>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex-shrink-0 text-center py-3 ${
                  activeTab === tab.id ? 'text-blue-800 border-b-2 border-blue-600 bg-blue-200' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className='place-items-center grid grid-col-2 gap-1'>
                  {tab.Icon}
                  {tab.label}
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className='flex-grow p-4'>{children}</div>
      </div>
    </>
  );
}
