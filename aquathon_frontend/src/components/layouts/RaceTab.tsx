'use client';

import { ChevronLeft, EllipsisVertical, LayoutDashboard, Timer } from 'lucide-react';
import Head from 'next/head';
import React, { useState } from 'react';

// Define tab type
type Tab = {
  id: string;
  label: string;
  Icon: React.ReactNode;
};

// Define tabs outside the component
const tabs: Tab[] = [
  { id: 'TimeTracking', label: 'Time Tracking', Icon: <Timer /> },
  { id: 'Dashboard', label: 'Dashboard', Icon: <LayoutDashboard /> },
];

export function RaceTab() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <>
      <Head>
        <title>Race</title>
      </Head>
      <div className='flex flex-col'>
        <Header />
        <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </>
  );
}

function Header() {
  return (
    <nav className='flex items-center justify-between p-4 border-b border-gray-300'>
      <div className='flex items-center'>
        <BackButton />
        <h1 className='text-xl font-semibold ml-4'>Race</h1>
      </div>
      <MoreButton />
    </nav>
  );
}

function BackButton() {
  return (
    <button className='text-2xl'>
      <a href='/races'>
        <ChevronLeft />
      </a>
    </button>
  );
}

function MoreButton() {
  return (
    <button className='text-2xl'>
      <a href='/races'>
        <EllipsisVertical />
      </a>
    </button>
  );
}

type TabNavigationProps = {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
};

function TabNavigation({ tabs, activeTab, setActiveTab }: TabNavigationProps) {
  return (
    <div className='border-b border-gray-300 overflow-x-auto scrollbar-hide w-screen'>
      <div className='grid grid-cols-2'>
        {tabs.map((tab) => (
          <TabButton key={tab.id} tab={tab} isActive={activeTab === tab.id} onClick={() => setActiveTab(tab.id)} />
        ))}
      </div>
    </div>
  );
}

type TabButtonProps = {
  tab: Tab;
  isActive: boolean;
  onClick: () => void;
};

function TabButton({ tab, isActive, onClick }: TabButtonProps) {
  return (
    <button
      className={`flex-shrink-0 text-center py-3 ${
        isActive ? 'text-blue-800 border-b-2 border-blue-600 bg-blue-200' : 'text-gray-500'
      }`}
      onClick={onClick}
    >
      <div className='place-items-center grid grid-col-2 gap-1'>
        {tab.Icon}
        {tab.label}
      </div>
    </button>
  );
}
