'use client';
import { Check } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useStore } from 'zustand';

import Container from '@/components/Container';
import RaceTimer from '@/components/TimeTracking/RaceTimer';
import SegmentCard from '@/components/TimeTracking/SegmentCard';

import { useSegmentList } from '@/services/segment.services';
import { RaceRealTimeContext } from '@/services/sockets/race/store';

export default function RaceDetailPage() {
  const [time, setTime] = useState<Date | null>(null);
  const [copied, setCopied] = useState(false);
  const id = useParams().slug;
  const socketContext = useContext(RaceRealTimeContext);
  const raceSocket = useStore(socketContext!, (state) => state);
  const shareableLink = `${window.location.origin}/shared/${id}`;
  const { data: segments = [], isLoading } = useSegmentList(id as string);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const startTime = () => {
    raceSocket.startTime(id as string);
  };
  const resetTime = () => {
    raceSocket.resetTime(id as string);
  };
  useEffect(() => {
    raceSocket.subscribe(id as string);
    raceSocket.socketClient.on('startTimeChanged', (time) => {
      if (time) {
        setTime(new Date(time));
        return;
      }
        setTime(null);
    });
  }, [raceSocket.roomId, id]);

  return (
    <Container>
      {segments.map((segment, index) => (
        <SegmentCard key={index} segment={segment} />
      ))}
      <RaceTimer time={time} startTimer={startTime} resetTimer={resetTime} />
      <CopyToClipboard text={shareableLink} onCopy={handleCopy}>
        <button
          className='bg-white text-purple-600 font-semibold py-3 px-8 rounded-full
                   hover:bg-purple-100 transition duration-300 ease-in-out
                   transform hover:scale-105 shadow-lg'
        >
          {copied ? <Check className='mr-2' /> : null}
          {copied ? 'Copied!' : `${raceSocket.roomId}`}
        </button>
      </CopyToClipboard>
    </Container>
  );
}
