'use client';

import { useState } from 'react';

import TrackingPage from '@/app/(race)/races/[slug]/(racedetails)/(crud)/time-tracking/[segmentId]/page';


export default function SharedTrackingPage() {
  const [activeTab, setActiveTab] = useState('1 Step');

  return (
    <div>
        <TrackingPage/>
    </div>
  );
}
