'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Container from '@/components/Container';
import RaceTimer from '@/components/TimeTracking/RaceTimer';
import SegmentCard from '@/components/TimeTracking/SegmentCard';

import { socket } from '@/socket';

export default function RaceDetailPage() {
  const [time, setTime] = useState<Date | null>(null);
  const id = useParams().slug;

  const startTime = () => {
    socket.emit('startTime', id);
  };
  const resetTime = () => {
    socket.emit('resetTime', id);
  };
  useEffect(() => {
    socket.emit('subscribe', id);
  }, []);

  useEffect(() => {
    const fetchRaceData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/races/${id}`);
        const data = await response.json();
        const startTime = data?.startTime === null ? null : new Date(data?.startTime);
        setTime(startTime);
      } catch (error) {
        //console.error("Failed to fetch race data:", error);
      }
    };

    fetchRaceData();

    socket.emit('subscribe', id);

    socket.on('subscribeAccepted', () => {
      socket.on('poolChanged', (value) => {
        const startTime = value === null ? null : new Date(value);
        setTime(startTime);
      });
      return () => {
        socket.off('poolChanged');
        socket.off('subscribeAccepted');
        socket.off('connect');
      };
    });
  }, [id]);

  return (
    <Container>
      <SegmentCard name='Swim Segment' status='inProgress' completionPercentage={75} />
      <SegmentCard name='Swim Segment' status='inProgress' completionPercentage={75} />{' '}
      <SegmentCard name='Swim Segment' status='inProgress' completionPercentage={75} />{' '}
      <SegmentCard name='Swim Segment' status='inProgress' completionPercentage={75} />{' '}
      <SegmentCard name='Swim Segment' status='inProgress' completionPercentage={75} />{' '}
      <SegmentCard name='Swim Segment' status='inProgress' completionPercentage={75} />{' '}
      <RaceTimer time={time} startTimer={startTime} resetTimer={resetTime} />
    </Container>
  );
}
