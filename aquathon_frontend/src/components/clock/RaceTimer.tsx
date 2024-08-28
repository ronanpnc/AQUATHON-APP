import React, { useEffect, useState } from 'react';
interface IRaceTimer {
    time: Date|null;
    startTimer:() => void;
    resetTimer:() => void;
}
export default function RaceTimer({time, startTimer, resetTimer}:IRaceTimer) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setElapsedTime(0);
    let intervalId: number;
    if (time !== null) {
      intervalId = window.setInterval(() => {
          setIsRunning(true)
          setElapsedTime(Date.now() - time.getTime());
      }, 10);
      return () => clearInterval(intervalId);
    }
    setIsRunning(false)
    return () => clearInterval(intervalId);
  }, [time]);

  const startRace = () => {
    setElapsedTime(0);
    startTimer();
  };

  const resetRace = () => {
    setElapsedTime(0);
    resetTimer();
  };


  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };
  return (
    <div className='p-8 rounded-lg shadow-lg text-center'>
      <h2 className='text-3xl font-bold mb-6 text-white'>Race Timer</h2>
      <div className='text-5xl font-mono mb-8 text-green-400'>{formatTime(elapsedTime)}</div>
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
        <div>
            {time?.toString()}
        </div>
      </div>
    </div>
  );
}
