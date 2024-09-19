'use client';

import React, { useState } from 'react';

import { SharedTimeTrackingNav } from '@/components/layouts/SharedTimeTrackingNav';

import SharedTrackingPage from './page';

export default function Layout() {
  const [activeTab, setActiveTab] = useState('1 Step');

  return (
    <div>
      <SharedTimeTrackingNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <SharedTrackingPage activeTab={activeTab} /> 
    </div>
  );
}
