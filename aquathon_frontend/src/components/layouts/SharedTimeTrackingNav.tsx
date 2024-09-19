'use client';

import { MapPin } from 'lucide-react';
import React from 'react';

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

type TabNavigationProps = {
  activeTab: string;
  setActiveTab: (id: string) => void;
};

export function SharedTimeTrackingNav({ activeTab, setActiveTab }: TabNavigationProps) {
  return (
    <div className='flex flex-col sticky top-0'>
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  return (
    <div className='scrollbar-hide bg-secondary-purple'>
      <div className='grid grid-cols-2'>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
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
  return (
    <div
      className={`flex-shrink-0 text-center py-3 ${
        isActive ? 'text-white border-b-4 border-primary-purple' : 'text-gray-300'
      }`}
      onClick={onClick}
    >
      <div className='place-items-center grid grid-col-2 gap-1'>
        {tab.Icon}
        {tab.label}
      </div>
    </div>
  );
}
