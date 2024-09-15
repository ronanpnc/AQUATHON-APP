'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { ChevronLeft, EllipsisVertical, LayoutDashboard, Settings, Timer, Trophy, UsersRound } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React, { useState } from 'react';

// Define tab type
type Tab = {
  id: string;
  label: string;
  path?: string;
  Icon: React.ReactNode;
};

const tabs: Tab[] = [
  { id: 'Participants', label: 'Participants', Icon: <UsersRound />, path: '/participants' },
  { id: 'TimeTracking', label: 'Time Tracking', Icon: <Timer />, path: '/time-tracking' },
  { id: 'Dashboard', label: 'Dashboard', Icon: <LayoutDashboard />, path: '/dashboard' },
  { id: 'Settings', label: 'Settings', Icon: <Settings /> },
  { id: 'Results', label: 'Results', Icon: <Trophy /> },
];

export function RaceDetailsNav({ raceId, title }: { raceId: string; title: string }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <>
      <div className='flex flex-col sticky top-0'>
        <Header raceId={raceId} title={title} />
        <TabNavigation tabs={tabs.slice(0, 3)} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </>
  );
}

function Header({ raceId, title }: { raceId: string; title: string }) {
  return (
    <nav className='flex items-center justify-between p-4  bg-primary-purple text-white'>
      <div className='flex items-center'>
        <BackButton />
        <h1 className='text-xl font-semibold ml-4'>{title}</h1>
      </div>
      <MoreButton raceId={raceId} />
    </nav>
  );
}

function BackButton() {
  return (
    <button className='text-2xl'>
      <Link href='/races'>
        <ChevronLeft strokeWidth={3} />
      </Link>
    </button>
  );
}

function MoreButton({ raceId }: { raceId: string }) {
  const pathname = usePathname();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className='p-2'>
          <EllipsisVertical className='h-6 w-6' />
        </button>
      </PopoverTrigger>
      <PopoverContent className='border border-gray-300 bg-white rounded-md -translate-x-5'>
        <div className=' w-40'>
          {tabs.slice(-2).map((tab) => (
            <Link key={tab.id} href={`/races/${raceId}/${tab.id.toLowerCase()}`} className='block'>
              <div
                className={`flex items-center text-black hover:bg-gray-100 w-full px-3 py-2 rounded ${pathname.includes(tab.id.toLowerCase()) ? 'bg-gray-100' : ''}`}
              >
                {tab.Icon}
                <p className='ml-5'>{tab.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

type TabNavigationProps = {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
};

function TabNavigation({ tabs, activeTab, setActiveTab }: TabNavigationProps) {
  const handleTabClick = (id: string, path?: string) => {
    setActiveTab(id);
  };
  return (
    <div className='overflow-x-auto scrollbar-hide w-screen bg-secondary-purple'>
      <div className='grid grid-cols-3'>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            onClick={() => {
              handleTabClick(tab.id, tab?.path);
            }}
          />
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
  const param = useParams();
  return (
    <Link
      href={`/races/${param?.slug}/${tab.path}`}
      className={`flex-shrink-0 text-center py-3 ${
        isActive ? 'text-white border-b-4 border-primary-purple' : 'text-gray-300'
      }`}
      onClick={onClick}
    >
      <div className='place-items-center grid grid-col-2 gap-1'>
        {tab.Icon}
        {tab.label}
      </div>
    </Link>
  );
}
