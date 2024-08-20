'use client';

import React, { useEffect, useState } from 'react';

export default function RaceTimer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      intervalId = window.setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startRace = () => setIsRunning(true);
  const resetRace = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 100);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms}`;
  };

  return (
    <div className='bg-gray-800 p-8 rounded-lg shadow-lg text-center'>
      <h2 className='text-3xl font-bold mb-6 text-white'>Race Timer</h2>
      <div className='text-5xl font-mono mb-8 text-green-400'>{formatTime(time)}</div>
      <div className='space-x-4'>
        <button
          onClick={startRace}
          disabled={isRunning}
          className={`px-6 py-2 rounded-full text-white font-semibold ${
            isRunning ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          Start Race
        </button>
        <button
          onClick={resetRace}
          className='px-6 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600'
        >
          Reset Race
        </button>
      </div>
    </div>
  );
}
