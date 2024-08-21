'use client';

import { LayoutDashboard, Timer } from 'lucide-react';
import { useState } from 'react';

export default function Race() {
  const tabs = [
    { id: 'TimeTracking', label: 'Time Tracking', Icon: <Timer /> },
    { id: 'Dashboard', label: 'Dashboard', Icon: <LayoutDashboard /> },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <>
     <div>
      hi
     </div>
    </>
  );
}
