'use client';

import { Check } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import Container from '@/components/Container';
import RaceTimer from '@/components/TimeTracking/RaceTimer';
import SegmentCard from '@/components/TimeTracking/SegmentCard';

import { ISegment } from '@/domains/race/interface';
import { socket } from '@/socket';

// Dummy data
const dummySegments: ISegment[] = [
  {
    type: 'swimming',
    mode: 'active',
    timeTrackId: ['swim1'],
  },
  {
    type: 'biking',
    mode: 'upcoming',
    timeTrackId: ['bike1'],
  },
  {
    type: 'running',
    mode: 'upcoming',
    timeTrackId: ['run1'],
  },
];

export default function RaceDetailPage() {
  const [time, setTime] = useState<Date | null>(null);
  const [segments, setSegments] = useState<ISegment[]>(dummySegments);
  const [copied, setCopied] = useState(false);
  const id = useParams().slug;
  const shareableLink = `${window.location.origin}/shared/${id}`;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startTime = () => {
    socket.emit('startTime', id);
  };
  const resetTime = () => {
    socket.emit('resetTime', id);
  };
  useEffect(() => {
    socket.emit('subscribe', id);
  }, [id]);

  useEffect(() => {
    const fetchRaceData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/races/${id}`);
        const data = await response.json();
        const startTime = data?.startTime === null ? null : new Date(data?.startTime);
        setTime(startTime);
        // Uncomment the next line when your API is ready to provide real segment data
        // setSegments(data?.segments || dummySegments);
      } catch (error) {
        console.error('Failed to fetch race data:', error);
        // Use dummy data in case of an error
        setSegments(dummySegments);
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
      {[...segments, ...segments, ...segments, ...segments, ...segments].map((segment, index) => (
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
          {copied ? 'Copied!' : 'Get Shareable Link'}
        </button>
      </CopyToClipboard>
    </Container>
  );
}
