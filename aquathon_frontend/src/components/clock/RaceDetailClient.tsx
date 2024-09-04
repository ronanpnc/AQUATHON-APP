'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

import RaceTimer from '@/components/clock/RaceTimer';

import { useRace } from '@/services/race.services';
import { socket } from '@/socket';

export default function RaceDetailClient({ raceId }: { raceId: string }) {
  const { data: race, isLoading, error } = useRace(raceId);
  const [time, setTime] = useState<Date | null>(null);

  const startTime = () => {
    console.log("start-time");
    socket.emit('startTime', raceId);
  };

  const resetTime = () => {
    console.log("reset-time");
    socket.emit('resetTime', raceId);
  };

  useEffect(() => {
    if (race) {
      const startTime = race.startTime ? new Date(race.startTime) : null;
      setTime(startTime);
    }
  }, [race]);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('subscribe', raceId);
    });

    socket.on('subscribeAccepted', () => {
      socket.on('poolChanged', (value) => {
        const startTime = value === null ? null : new Date(value);
        setTime(startTime);
      });
    });

    return () => {
      socket.off('poolChanged');
    };
  }, [raceId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!race) return notFound();

  return (
    <div>
      <h1>{race.title}</h1>
      <p>Date: {new Date(race.date).toLocaleDateString()}</p>
      <p>Run Distance: {race.runDistance} km</p>
      <p>Swim Distance: {race.swimDistance} km</p>
      <p>Status: {race.status}</p>
      <RaceTimer time={time} startTimer={startTime} resetTimer={resetTime} />
    </div>
  );
}
