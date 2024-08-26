"use client"
import RaceTimer from '@/components/clock/RaceTimer';
import { useEffect, useState } from 'react';
import { socket } from '@/socket';

export default function RaceDetailPage() {
const [time, setTime] = useState<Date | null>(null);
  const param = { id: "66bed77eeb7dcac26597be4e"}
  const [status, setStatus] = useState<"started" | "resetted">("resetted");
  const [connected, setConnected] = useState(false);

  const startTime = () => {
    socket.emit("startTime", param.id);
  };
  const resetTime = () => {
    socket.emit("resetTime", param.id);
  };

  useEffect(() => {
    const fetchRaceData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/races/${param.id}`);
        const data = await response.json();
        const startTime = data?.startTime === null ? null: new Date(data?.startTime);
        setTime(startTime);
        setStatus(startTime ? "started" : "resetted");
      } catch (error) {
        //console.error("Failed to fetch race data:", error);
      }
    };

    fetchRaceData();

    socket.on("connect", () => {
      setConnected(true);
      socket.emit("subscribe", param.id);
    });

    socket.on("subscribeAccepted", () => {
      socket.on("poolChanged", (value) => {
        const startTime =  value === null ? null: new Date(value);
        setTime(startTime);
        setStatus(value ? "started" : "resetted");
      });
      return () => {
        socket.off("poolChanged");
      }
    });

    return () => {
      socket.off("connect");
      socket.off("subscribeAccepted");
    };
  }, [param.id])

  return (
    <div>
      <RaceTimer time={time} startTimer={startTime} resetTimer={resetTime}/>
    </div>
  );
}
