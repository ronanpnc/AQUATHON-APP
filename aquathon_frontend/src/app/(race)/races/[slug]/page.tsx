'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import RaceTimer from '@/components/clock/RaceTimer';

import { useRace } from '@/services/race.services';
import { socket } from '@/socket';

export default function RaceDetailPage() {
  const { slug: id } = useParams();
  const { data: race, isLoading, error } = useRace(id as string);
  const [time, setTime] = useState<Date | null>(null);

  const startTime = () => {
    socket.emit('startTime', id);
  };

  const resetTime = () => {
    socket.emit('resetTime', id);
  };

  useEffect(() => {
    if (race) {
      const startTime = race.startTime ? new Date(race.startTime) : null;
      setTime(startTime);
    }
  }, [race]);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('subscribe', id);
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
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{race?.title}</h1>
      <p>Run Distance: {race?.runDistance} km</p>
      <p>Swim Distance: {race?.swimDistance} km</p>
      <p>Status: {race?.status}</p>
      <RaceTimer time={time} startTimer={startTime} resetTimer={resetTime} />
    </div>
  );
}
