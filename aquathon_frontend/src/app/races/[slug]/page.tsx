"use client";

import { useState } from "react";
import Head from "next/head";
import {
  LayoutDashboard,
  PersonStandingIcon,
  ReceiptPoundSterlingIcon,
  Settings,
  Timer,
} from "lucide-react";

export default function Race() {
  const tabs = [
    { id: "TimeTracking", label: "Time Tracking", Icon: <Timer /> },
    { id: "Dashboard", label: "Dashboard", Icon: <LayoutDashboard /> },
    // { id: "Reports", label: "Reports", Icon: <ReceiptPoundSterlingIcon /> },
    // { id: "Settings", label: "Settings", Icon: <Settings /> },
    // { id: "Profile", label: "Profile", Icon: <PersonStandingIcon /> },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <>
      <Head>
        <title>Race 1</title>
      </Head>
      <div className="h-screen flex flex-col">
        <header className="flex items-center p-4 border-b border-gray-300">
          <button className="text-2xl"> <a href="/races">←</a></button>
          <h1 className="text-xl font-semibold pl-10">Race 1</h1>
        </header>

        <div className="flex border-b border-gray-300 overflow-x-auto scrollbar-hide">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex-shrink-0 text-center py-3 w-[195px] ${
                  activeTab === tab.id
                    ? "text-blue-800 border-b-2 border-blue-600 bg-blue-200"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="place-items-center grid grid-col-2 gap-1">
                  {tab.Icon}
                  {tab.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-grow p-4">
          {activeTab === "TimeTracking" && (
            <div>
              <h2 className="text-xl font-semibold">Time Tracking Content</h2>
              <p>This is where the time tracking details will be displayed.</p>
            </div>
          )}
          {activeTab === "Dashboard" && (
            <div>
              <h2 className="text-xl font-semibold">Dashboard Content</h2>
              <p>This is where the dashboard details will be displayed.</p>
            </div>
          )}
          {activeTab === "Reports" && (
            <div>
              <h2 className="text-xl font-semibold">Reports Content</h2>
              <p>This is where the reports details will be displayed.</p>
            </div>
          )}
          {activeTab === "Settings" && (
            <div>
              <h2 className="text-xl font-semibold">Settings Content</h2>
              <p>This is where the settings details will be displayed.</p>
            </div>
          )}
          {activeTab === "Profile" && (
            <div>
              <h2 className="text-xl font-semibold">Profile Content</h2>
              <p>This is where the profile details will be displayed.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
