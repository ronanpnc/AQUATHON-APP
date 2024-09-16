'use client';

import { notFound } from 'next/navigation';
import { useEffect, useRef,useState } from 'react';

import { useRace } from '@/services/race.services';
import { socket } from '@/socket';

export default function RaceDetailClient({ raceId }: { raceId: string }) {
  const { data: race, isLoading, error } = useRace(raceId);
  const [, setTime] = useState<Date | null>(null);
  const socketRef = useRef(socket);

//  const startTime = () => {
//    socketRef.current.emit('startTime', raceId);
//  };
//
//  const resetTime = () => {
//    socketRef.current.emit('resetTime', raceId);
//  };
//
  useEffect(() => {
    if (race) {
      const startTime = race.startTime ? new Date(race.startTime) : null;
      setTime(startTime);
    }
  }, [race]);

  useEffect(() => {
    const currentSocket = socketRef.current;

    const handleConnect = () => {
      currentSocket.emit('subscribe', raceId);
    };

    const handleSubscribeAccepted = () => {
      currentSocket.on('poolChanged', handlePoolChanged);
    };

    const handlePoolChanged = (value: string | null) => {
      const startTime = value === null ? null : new Date(value);
      setTime(startTime);
    };

    currentSocket.on('connect', handleConnect);
    currentSocket.on('subscribeAccepted', handleSubscribeAccepted);

    return () => {
      currentSocket.off('connect', handleConnect);
      currentSocket.off('subscribeAccepted', handleSubscribeAccepted);
      currentSocket.off('poolChanged', handlePoolChanged);
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
    </div>
  );
}
