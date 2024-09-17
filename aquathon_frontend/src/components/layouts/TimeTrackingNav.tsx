'use client';

import { MapPin } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

type Tab = {
  id: string;
  label: string;
  path?: string;
  Icon: React.ReactNode;
};

const tabs: Tab[] = [
  { id: '1 Step', label: '1 Step', Icon: <MapPin /> },
  { id: '2 Step', label: '2 Step', Icon: <MapPin /> },
];
export function TimeTrackingNav() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <>
      <div className='flex flex-col sticky top-0'>
        <TabNavigation tabs={tabs.slice(0, 3)} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </>
  );
}

function TabNavigation({ tabs, activeTab, setActiveTab }: TabNavigationProps) {
  const handleTabClick = (id: string, path?: string) => {
    setActiveTab(id);
  };
  return (
    <div className='scrollbar-hide bg-secondary-purple'>
      <div className='grid grid-cols-2'>
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

type TabNavigationProps = {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
};

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
