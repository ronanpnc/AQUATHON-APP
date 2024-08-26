"use client"
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import RaceTimer from '@/components/clock/RaceTimer';

import { socket } from '@/socket';

export default function RaceDetailPage() {
const [time, setTime] = useState<Date | null>(null);
  const id = useParams().slug;

  const startTime = () => {
    socket.emit("startTime", id);
  };
  const resetTime = () => {
    socket.emit("resetTime", id);
  };

  useEffect(() => {
    const fetchRaceData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/races/${id}`);
        const data = await response.json();
        const startTime = data?.startTime === null ? null: new Date(data?.startTime);
        setTime(startTime);
      } catch (error) {
        //console.error("Failed to fetch race data:", error);
      }
    };

    fetchRaceData();

    socket.on("connect", () => {
      socket.emit("subscribe", id);
    });

    socket.on("subscribeAccepted", () => {
      socket.on("poolChanged", (value) => {
        const startTime =  value === null ? null: new Date(value);
        setTime(startTime);
      });
      return () => {
        socket.off("poolChanged");
      }
    });
  }, [id])

  return (
    <div>
      <RaceTimer time={time} startTimer={startTime} resetTimer={resetTime}/>
    </div>
  );
}
